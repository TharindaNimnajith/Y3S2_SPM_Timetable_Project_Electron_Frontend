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
import styles from './programs.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setPrograms} from './programsSlice';
import {proxy} from '../../conf'

let errors_: string = ''

// noinspection DuplicatedCode
const ProgramsAdd: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();


  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)

  const [name, setName] = useState<string>('');
  const [programToken, setProgramToken] = useState<string>('');

  const [programsObject, setProgramsObject] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${proxy}/programs/getPrograms`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseData = await response.json();
        setProgramsObject(responseData.programs);
        dispatch(setPrograms(responseData.programs));
        console.log(responseData.programs);

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
    if (name.trim() === '' && programToken.trim() === '') {
      errors_ = 'Please enter a value for the programme name and  token.'
      setError(true)
      setLoading(false)

    } else {
      if (name.trim() === '') {
        errors_ = 'Please enter a value for the programme  name.'
        setError(true)
        setLoading(false)

      } else if (programToken.trim() === '') {
        errors_ = 'Please enter a value for the programme  token.'
        setError(true)
        setLoading(false)

      }
    }


    const finalObject = {
      name,
      programToken
    };

    console.log('22222222222222222222222222222222222');
    console.log(finalObject);

    if (name.trim() !== '' && programToken.trim() !== '') {
      setError(false)
      try {
        const response = await fetch(
          `${proxy}/programs/create`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalObject)
          }
        );

        const responseData = await response.json();
        console.log(`HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII+${responseData}`)
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
      return <Redirect to={routes.PROGRAMS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setName(e.target.value);
  };

  const handleChangeProgramToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setProgramToken(e.target.value);

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
          <h3>Add Programme</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.programsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >


        <div>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Programme Name</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={name}
                    onChange={handleChangeName}
                    placeholder="ex:-Software Engineering"
                  />


                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Short Name for Programme</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">


                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={programToken}
                    onChange={handleChangeProgramToken}
                    placeholder="ex:-SE"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}></Col>
          </Row>

          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={1}/>
            <Col xs={3} md={10}>
              <Button
                style={{width: '180px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
                Add Programme
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

export default ProgramsAdd;
