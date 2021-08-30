/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Modal, Row, Spinner} from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//import CheckboxGroup from 'react-checkbox-group';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './consecutiveSessions.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setConsecutiveSessions} from './consecutiveSessionsSlice';
import {proxy} from '../../conf';
import CheckboxGroup from 'react-checkbox-group';
import { session } from 'electron';

let errors_: string = ''



var exist = 0;
// noinspection DuplicatedCode
const ConsecutiveSessionsAdd: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();
  var s1;
  var s2;

  const [session1List, setSession1List] = useState<any>([]);
  const [session2List, setSession2List] = useState<any>([]);


  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [renderRedirectTo1, setRenderRedirectTo1] = useState<boolean | null>(false);
  const [renderRedirectToGro, setRenderRedirectToGro] = useState<boolean | null>(false);

  const [isConsecutive, setIsConsecutive] = useState<boolean | null>(false);
  const [consecutiveId1, setConsecutiveId1] = useState<boolean | null>(false);
  const [consecutiveId2, setConsecutiveId2] = useState<boolean | null>(false);
  const [isSameRoom, setIsSameRoom] = useState<boolean | null>(false);
  const [isSameRoomTrue, setIsSameRoomTrue] = useState<string>('');
  const [con, setCon] = useState<boolean | null>(false);
  const [id1, setId1] = useState<string>('');

  const [id2, setId2] = useState<string>('');

  const [sessionId1,setSessionId1] = useState<number | null>(null);
  const [sessionId2,setSessionId2] = useState<number | null>(null);

  const [subjectCodeRef1,setSubjectCodeRef1] = useState<number | null>(null);
  const [subjectCodeRef2,setSubjectCodeRef2] = useState<number | null>(null);

  const [groupRef1,setGroupRef1] = useState<number | null>(null);
  const [groupRef2,setGroupRef2] = useState<number | null>(null);




  const [sessionsObject, setSessionsObject] = useState<any>(null);

  useEffect(() => {
    getSessions1();

    if(s1 && s2){
      getSessions2();
    }
    else{
      getSessions3();
    }

  },[]);

  // useEffect(() => {
  //  // fetchData();
  //   getSessions1();
  //   getSessions2();
  // });

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       `${proxy}/sessions/getSessionList`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     );

  //     const responseData = await response.json();
  //     setSessionsObject(responseData);
  //     //setSession1List(responseData);
  //     setSession2List(responseData);
  //     dispatch(setConsecutiveSessions(responseData));
  //     console.log(responseData);

  //     if (!responseData) {
  //       // noinspection ExceptionCaughtLocallyJS
  //       throw new Error(responseData.message);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const getSessions1 = async () => {


    try {

      const response = await fetch(`${proxy}/sessions/getSessionsLec`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"tagRef": "Lecture"})
      })
      const responseData = await response.json();
      setSession1List(responseData);


    } catch (errors) {


      console.log(errors)
    }

  };

  const getSessions2 = async () => {


    try {

      const response = await fetch(`${proxy}/sessions/getSessionsTut`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"tagRef": "Tutorial" , "subjectCodeRef": s1, "groupRef": s2})
      })
      const responseData = await response.json();
      setSession2List(responseData);


    } catch (errors) {


      console.log(errors)
    }

  };

  const getSessions3 = async () => {


    try {

      const response = await fetch(`${proxy}/sessions/getSessionsTuto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"tagRef": "Tutorial"})
      })
      const responseData = await response.json();
      setSession2List(responseData);


    } catch (errors) {
      console.log(errors)
    }

  };

  const handleShow = () => {
    setLoading(true);
    setShow(true);
    setLoading(false);
  };

  const handleClose = () => {
    setLoading(true);
    setShow(false);
    setLoading(false);
  };

  const handleSubmit = async () => {
    var sameRoom;
    console.log(sessionId1)
    console.log(sessionId2)
    console.log(id1)
    console.log(id2)
    console.log(consecutiveId1)
    console.log(consecutiveId2)
    var sid = parseInt(String(sessionId1) + ''+ String(sessionId2));


    if(isSameRoomTrue.trim() != ''){
      sameRoom = true;
    }

    else sameRoom = false;

    if ((id1.trim() === '') && (id2.trim() === '')) {
      errors_ = 'Please select  values for all fields.'
      setError(true)
      setLoading(false)


    } else {
      if (id1.trim() === '') {
        errors_ = 'Please select session1 .'
        setError(true)
        setLoading(false)


      } else if (id2.trim() === '') {
        errors_ = 'Please select session2.'
        setError(true)
        setLoading(false)

      }
    }


        if (consecutiveId1 || consecutiveId2) {
          exist = 1;
        }

        else{
          exist = 0;
        }

      if (exist === 1) {
        handleShow();
      }


    if ((id1.trim() != '') && (id2.trim() != '') && (consecutiveId1 === false) && (consecutiveId2 === false)) {
      const finalObjectGroup = {
        isConsecutive,
        consecutiveId:sid,
        isSameRoom :sameRoom

      };


      try {

        const response = await fetch(`${proxy}/consecutiveSessions/addConsecutiveSession/` + id1, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObjectGroup)
        })
        const responseData = await response.json()
        console.log(responseData)
        setRenderRedirectTo(true);

      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }

      try {

        const response = await fetch(`${proxy}/consecutiveSessions/addConsecutiveSession/` + id2, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObjectGroup)
        })
        const responseData = await response.json()
        console.log(responseData)
        setRenderRedirectTo1(true);

      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }

     }



  };


  const renderRedirect = () => {
    if (renderRedirectTo && renderRedirectTo1) {
      return <Redirect to={routes.SESSIONS_LIST}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const renderRedirectGro = () => {
    if (renderRedirectToGro) {
      return <Redirect to={routes.GROUPS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };
  const handleSession1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setCon(true);
    setId1(e.target.value);
    console.log(e.target.value)
    setConsecutiveId1(false);
    getSession1(e.target.value);

    //getSessionALec();

    //getSessions2();




  };

  const handleSession2 = (e: React.ChangeEvent<HTMLInputElement>) => {

    setError(false)
    setId2(e.target.value);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2")
    console.log(e.target.value)
    setConsecutiveId2(false);
    getSession2(e.target.value);


    setIsConsecutive(true);
    //setConsecutiveId(100010001);
    //setIsSameRoom(true);
  };

  const getSession1 = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/sessions/getSessions/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setSessionId1(responseData.sessionId);
      console.log(responseData.sessionId);
      // setSubjectCodeRef1(responseData.subjectCodeRef);
      // setGroupRef1(responseData.groupRef);

        s1=responseData.subjectCodeRef;
        s2=responseData.groupRef;

        console.log(s1)
        console.log(s2)



      if(responseData.consecutiveId){
        setConsecutiveId1(true);
      }


      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const getSession2 = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/sessions/getSessions/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setSessionId2(responseData.sessionId);
      setSubjectCodeRef2(responseData.subjectCodeRef);
      setGroupRef2(responseData.groupRef);

      if(responseData.consecutiveId){
        setConsecutiveId2(true);
      }

      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }




  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '100vh'
      }}
    >

      {renderRedirect()}

      <NavBar/>
      <Modal show={show}
             onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>This consecutive sessions are already exists</Modal.Body>
        <Modal.Footer>
          <Button variant='danger'
                  onClick={handleClose}
                  style={{
                    textTransform: 'uppercase'
                  }}>
            OK
          </Button>

        </Modal.Footer>
        {
          loading && (
            <Spinner animation='border'
                     style={{
                       textAlign: 'center',
                       marginLeft: '50%'
                     }}/>
          )
        }
      </Modal>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Add Consecutive Session</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.groupsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >


        <div>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Select Session1</p>
            </Col>
            <Col xs={3} md={4}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={id1}
                    onChange={handleSession1}
                  >
                    <option>Select</option>
                    {session1List?.map((session, index) => (
                      <option value={session._id}>{session.sessionId}-{session.label}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={2}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Select Session2</p>
            </Col>
            <Col xs={3} md={4}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={id2}
                    onChange={handleSession2}
                  >
                    <option>Select</option>
                    {session2List?.map((session, index) => (
                      <option value={session._id}>{session.sessionId}-{session.label}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={2}></Col>
          </Row>

          <Row className="mt-3 mb-3 justify-content-md-center">
              <Col xs={12} md={2}>

              </Col>
              <Col xs={2} md={6}>


                <CheckboxGroup
                  name="setIsSameRoom"
                  value={isSameRoomTrue}
                  onChange={setIsSameRoomTrue}
                >
                  {(Checkbox) => (
                    <>

                        <label className="mr-sm-2 mr-md-3" >
                          <Checkbox value="require"/> require for the same room also
                        </label>

                    </>
                  )}
                </CheckboxGroup>
              </Col>
              <Col xs={12} md={4}/>


            </Row>
          <Row className="mt-2 mb-2 justify-content-md-center">
            <Col xs={12} md={2}/>
            <Col xs={3} md={6}>
              <Button
                style={{width: '150px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
                Add
              </Button>
            </Col>

            <Col xs={12} md={4}/>
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

export default ConsecutiveSessionsAdd;
