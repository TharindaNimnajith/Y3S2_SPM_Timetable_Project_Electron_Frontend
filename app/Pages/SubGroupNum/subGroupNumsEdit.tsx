import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import styles from './subGroupNums.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setEditingSubGroupNum, setEditingSubGroupNumId, setEditSubGroupNum} from './subGroupNumsSlice';
import {proxy} from '../../conf'

let errors_: string = ''

const SubGroupNumsEdit: React.FC = () => {
  const dispatch = useDispatch();

  const editingSubGroupNumId = useSelector(
    (state: {
      subGroupNums: any
      editingSubGroupNumId: string
    }) => state.subGroupNums.editingSubGroupNumId
  );

  const editingSubGroupNum = useSelector(
    (state: {
      subGroupNums: any
      editingSubGroupNumId: any
    }) => state.subGroupNums.editingSubGroupNum
  );

  const [subGroupNum, setSubGroupNum] = useState<{
    subGroupNum: number,

  }>({
    subGroupNum: editingSubGroupNum.subGroupNum

  });
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [id, setId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);


  useEffect(() => {
    setId(editingSubGroupNumId);
  }, []);

  const handleSubmit = async () => {
    console.log(id);

    const finalObjectWithID = {
      subGroupNums: subGroupNum,
      id: id
    };

    console.log(finalObjectWithID);
    if (isNaN(Number(subGroupNum.subGroupNum.trim()))) {
      errors_ = 'Please enter a numerical value for the sub group number.'
      setError(true)
      setLoading(false)
    }
    if (!isNaN(Number(subGroupNum.subGroupNum.trim()))) {
      setError(false)

      try {
        const response = await fetch(
          `${proxy}/subGroupNums/editSubGroupNums`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalObjectWithID)
          }
        );
        const responseData = await response.json();
        setRenderRedirectTo(true);
        dispatch(setEditSubGroupNum(false));
        dispatch(setEditingSubGroupNumId(''));
        dispatch(setEditingSubGroupNum(null));
        if (!responseData) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.SUBGROUPNUMS_LIST_VIEW}/>;
    }
    return null;
  };

  const handleChangeSubGroupNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setSubGroupNum({...subGroupNum, subGroupNum: e.target.value});
  };


  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '100vh'
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
          <h3>Edit Sub Group Number</h3>
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
                    value={subGroupNum.subGroupNum}
                    onChange={handleChangeSubGroupNum}
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
                style={{width: '250px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
                Edit Sub Group Number
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

export default SubGroupNumsEdit;
