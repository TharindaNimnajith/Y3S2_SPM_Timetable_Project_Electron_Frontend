/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//import CheckboxGroup from 'react-checkbox-group';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './groupNums.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setGroupNums} from './groupNumsSlice';
import {proxy} from '../../conf'

let errors_: string = ''
// noinspection DuplicatedCode
const GroupNumsAdd: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();


  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);

  const [groupNum, setGroupNum] = useState<string>('');


  const [groupNumsObject, setGroupNumsObject] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${proxy}/groupNums/getGroupNums`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseData = await response.json();
        setGroupNumsObject(responseData.groupNums);
        dispatch(setGroupNums(responseData.groupNums));
        console.log(responseData.groupNums);

        if (!responseData) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    // noinspection JSIgnoredPromiseFromCall
    fetchData();
  }, []);


  // const renderRedirectToView = () => {

  //   if (tagsObject != null) {
  //     return <Redirect to={routes.TAGS_LIST_VIEW}/>;
  //     //   props.history.push(loginState.redirectTo);s
  //   }
  //   return null;
  // };


  const handleSubmit = async () => {
    // console.log("1111111111111111111111111111");
    // console.log(name);
    // console.log(tagToken);


    const finalObject = {
      groupNum
    };

    console.log('22222222222222222222222222222222222');
    console.log(groupNum);


    if (isNaN(Number(finalObject.groupNum.trim()))) {
      errors_ = 'Please enter a numerical value for the group number.'
      setError(true)
      setLoading(false)
    }
    if (!isNaN(Number(finalObject.groupNum.trim()))) {
      setError(false)
      try {

        const response = await fetch(
          `${proxy}/groupNums/create`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalObject)
          }
        );

        const responseData = await response.json();
        setRenderRedirectTo(true);
        // console.log(responseData.userDetails);

        if (!responseData) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err.message);
      }

    }

  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.GROUPNUMS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleChangeGroupNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setGroupNum(e.target.value);
  };


  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '100vh',
      }}
    >

      {renderRedirect()}
      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Add Group Number</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.groupNumsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >


        <div>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Group Number</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={groupNum}
                    onChange={handleChangeGroupNum}
                    placeholder="ex:- 1"
                  />


                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>

          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={1}/>
            <Col xs={3} md={10}>
              <Button
                style={{width: '220px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
                Add Group Number
              </Button>
            </Col>
            <Col xs={12} md={1}/>
          </Row>

          {
            error && (
              <div style={{
                color: 'red',
                fontSize: '18px',
                marginTop: '7px',
                textAlign: 'center'
              }}>
                {errors_}
              </div>
            )
          }
        </div>

      </Container>
    </div>
  );
};

export default GroupNumsAdd;
