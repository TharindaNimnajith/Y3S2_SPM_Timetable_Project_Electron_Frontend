/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Modal, Row, Spinner} from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//import CheckboxGroup from 'react-checkbox-group';
import {Redirect} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './parallelSessions.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';

import {proxy} from '../../conf';
import CheckboxGroup from 'react-checkbox-group';
import {setParallelSessions,setEditParallelSession,setEditingParallelSessionId,setEditingParallelSession} from './parallelSessionsSlice';

let errors_: string = ''


var exist = 0;
// noinspection DuplicatedCode
const ThreeSessionAdd: React.FC = (props) => {
  const dispatch = useDispatch();
  // const value = useSelector();


  const editingParallelSessionId = useSelector(
    (state: {
      parallelSessions: any
      editingParallelSessionId: string
    }) => state.parallelSessions.editingParallelSessionId
  );




  const parallelSessions = useSelector(
    (state: {
      parallelSessions: any
      editingParallelSessionId: string
    }) => state.parallelSessions.parallelSessions
  );

  const [session1List, setSession1List] = useState<any>([]);
  const [session2List, setSession2List] = useState<any>([]);
  const [session3List, setSession3List] = useState<any>([]);


  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [renderRedirectTo1, setRenderRedirectTo1] = useState<boolean | null>(false);
  const [renderRedirectTo2, setRenderRedirectTo2] = useState<boolean | null>(false);
  const [renderRedirectToGro, setRenderRedirectToGro] = useState<boolean | null>(false);

  const [isParallel, setIsParallel] = useState<boolean | null>(false);
  const [parallelId1, setParallelId1] = useState<boolean | null>(false);
  const [parallelId2, setParallelId2] = useState<boolean | null>(false);
  const [parallelId3, setParallelId3] = useState<boolean | null>(false);

  const [id1, setId1] = useState<string>('');

  const [id2, setId2] = useState<string>('');
  const [id3, setId3] = useState<string>('');

  const [sessionId1,setSessionId1] = useState<number | null>(null);
  const [sessionId2,setSessionId2] = useState<number | null>(null);
  const [sessionId3,setSessionId3] = useState<number | null>(null);

  const [workingTimePerDay1, setWorkingTimePerDay1] = useState<{
    hours: string;
    minutes: string;
  }>({
    hours: '00',
    minutes: '00'
  });
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday', 'Sunday'];

  const durationList = [1, 2, 3];
  const [duration, setDuration] = useState<number | null>(null);
  const [day, setDay] = useState<string>('');


  useEffect(() => {
    console.log(props);
    console.log(editingParallelSessionId);
    console.log(parallelSessions)
    //fetchData();

    // getSessions1(parallelSessions[0]);
    // getSessions2(parallelSessions[1]);
    // getSessions3(parallelSessions[2]);

    // getSessions1(props.scode1);
    // getSessions2(props.scode2);
    // getSessions3(props.scode3);

    getSubjectCat(editingParallelSessionId);
  },[]);

  const  getSubjectCat = async (cid) => {

    var scode:{res:any} [] = [];

     try {

       const response = await fetch(`${proxy}/parallelSessions/getSubjectCat`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({"category":cid})
       })
       const responseData = await response.json()
      console.log(responseData);
      responseData.map((res:any) =>{
        console.log(res.subjectCode)
        var code =res.subjectCode;
        scode.push(code);
        return scode;

      })

      getSessions1(scode[0]);
      getSessions2(scode[1]);
      getSessions3(scode[2]);
      console.log(scode);
      //dispatch(setParallelSessions(scode));

     } catch (errors) {


       console.log(errors)
     }
   }


  const getSessions1 = async (cid) => {

    try {

      const response = await fetch(`${proxy}/sessions/getSessionsCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"subjectCodeRef":cid})
      })
      const responseData = await response.json();
      setSession1List(responseData);
      console.log(responseData);


    } catch (errors) {


      console.log(errors)
    }

  };


  const getSessions2 = async (cid) => {


    try {

      const response = await fetch(`${proxy}/sessions/getSessionsCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"subjectCodeRef":cid})
      })
      const responseData = await response.json();
      setSession2List(responseData);
      console.log(responseData);


    } catch (errors) {


      console.log(errors)
    }

  };


  const getSessions3 = async (cid) => {


    try {

      const response = await fetch(`${proxy}/sessions/getSessionsCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"subjectCodeRef":cid})
      })
      const responseData = await response.json();
      setSession3List(responseData);
      console.log(responseData);


    } catch (errors) {


      console.log(errors)
    }

  };
  // const renderRedirectToView = () => {
  //   if (setSessionsObject) {
  //     return <Redirect to={routes.GROUPS_LIST_VIEW}/>;
  //     //   props.history.push(loginState.redirectTo);s
  //   }
  //   return null;
  // };

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

    var cid = parseInt(String(sessionId1) + ''+ String(sessionId2)+ ''+ String(sessionId3));
    console.log(cid);

    var emin1;
    var stime;
    var etime;


   if(workingTimePerDay1.minutes <= 9 && workingTimePerDay1.minutes!== '00'){
     emin1 = '0' + workingTimePerDay1.minutes;
    }
    else{
      emin1 = workingTimePerDay1.minutes;
    }



     stime = workingTimePerDay1.hours+':'+ emin1 ;
     etime = String(parseInt(workingTimePerDay1.hours)+parseInt(duration))+':'+ emin1;

     console.log(etime);

    if ((id1.trim() === '') && (id2.trim() === '') && (id3.trim() === '')&& (day.trim() === '')&& (stime.trim() === '00:00') &&  (etime.trim() === '00:00') && (duration === null) ) {
      errors_ = 'Please select  values for all fields.'
      setError(true)
      setLoading(false)


    } else {
      if (id1.trim() === '') {
        errors_ = 'Please select session1 .'
        setError(true)
        setLoading(false)
        console.log("1 ")

      } else if (id2.trim() === '') {
        errors_ = 'Please select session2.'
        setError(true)
        setLoading(false)

      }else if (id3.trim() === '') {
        errors_ = 'Please select session3.'
        setError(true)
        setLoading(false)

      }
      else if (day.trim() === '') {
        errors_ = 'Please select a day.'
        setError(true)
        setLoading(false)

      }
      else if (stime.trim() === '') {
        errors_ = 'Please select a start time.'
        setError(true)
        setLoading(false)

      }
      else if (duration === null ) {
        errors_ = 'Please select a duration.'
        setError(true)
        setLoading(false)

      }
    }


        if (parallelId1 || parallelId2 || parallelId3) {
          exist = 1;
        }

        else{
          exist = 0;
        }

      if (exist === 1) {
        handleShow();
      }


    if ((id1.trim() != '') && (id2.trim() != '') && (id3.trim() != '')&& (day.trim() != '')&& (stime.trim() != '00:00') &&  (etime.trim() != '00:00') && (duration != null)  && (parallelId1 === false) && (parallelId2 === false)&& (parallelId3 === false)) {
      const finalObjectGroup = {
        duration,
        day,
        startTime :stime,
        endTime :etime,
        isParallel,
        parallelId:cid
      };

 console.log(finalObjectGroup);
      try {

        const response = await fetch(`${proxy}/parallelSessions/addParallelSession/` + id1, {
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

        const response = await fetch(`${proxy}/parallelSessions/addParallelSession/` + id2, {
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

      try {

        const response = await fetch(`${proxy}/parallelSessions/addParallelSession/` + id3, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObjectGroup)
        })
        const responseData = await response.json()
        console.log(responseData)
        setRenderRedirectTo2(true);

      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }

     }



  };


  const renderRedirect = () => {
    if (renderRedirectTo && renderRedirectTo1 && renderRedirectTo2) {
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

    setId1(e.target.value);
    setParallelId1(false);
    getSession1(e.target.value);


  };

  const handleSession2 = (e: React.ChangeEvent<HTMLInputElement>) => {

    setError(false)
    setId2(e.target.value);
    setParallelId2(false);
    getSession2(e.target.value);

  };

  const handleSession3 = (e: React.ChangeEvent<HTMLInputElement>) => {

    setError(false)
    setId3(e.target.value);
    setParallelId3(false);
    getSession3(e.target.value);

  };




 const handleDay = (e: React.ChangeEvent<HTMLInputElement>) => {

    setError(false)
    setDay(e.target.value);

  };


const handleChangeHour1 = (e: React.ChangeEvent<HTMLInputElement>) => {

 setError(false)
 setWorkingTimePerDay1({...workingTimePerDay1, hours: e.target.value});
};

const handleChangeMinutes1 = (e: React.ChangeEvent<HTMLInputElement>) => {

 setError(false)
 setWorkingTimePerDay1({...workingTimePerDay1, minutes: e.target.value});
};



const handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
  setError(false)
  const val = parseInt(e.target.value);
  //setDuration(val);
  setDuration(e.target.value);
  setIsParallel(true);
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

      if(responseData.parallelId){
        setParallelId1(true);
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

      if(responseData.parallelId){
        setParallelId2(true);
      }

      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const getSession3 = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/sessions/getSessions/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setSessionId3(responseData.sessionId);

      if(responseData.parallelId){
        setParallelId3(true);
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

      }}
    >

      {renderRedirect()}


      <Modal show={show}
             onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>This parallel sessions are already exists</Modal.Body>
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
            <Col xs={12} md={4} className="mt-auto">
              <p>Select Session3</p>
            </Col>
            <Col xs={3} md={4}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={id3}
                    onChange={handleSession3}
                  >
                    <option>Select</option>
                    {session3List?.map((session, index) => (
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
              <p>Day</p>
            </Col>
            <Col xs={3} md={4}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={day}
                    onChange={handleDay}
                  >
                    <option>Select</option>
                    {weekdays?.map((day, index) => (
                      <option value={day}>{day}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={2}></Col>
          </Row>



          <Row className="mt-3 mb-3 justify-content-md-center">
              <Col xs={12} md={4}>
                <p>Start Time</p>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12} md={5}>
                    <Form.Group controlId="formGridEmail">
                    <Form.Control
                        style={{
                          width: '60px',
                          display: 'inline',
                          marginLeft: '10px'
                        }}
                        type="number"
                        value={workingTimePerDay1.hours}
                        onChange={handleChangeHour1}
                        placeholder="Hours"
                        min="0"
                        max="23"
                      />
                      <Form.Label>Hours</Form.Label>

                    </Form.Group>
                  </Col>
                  <Col xs={12} md={7}>
                    <Form.Group controlId="formGridPassword">
                    <Form.Control
                        style={{
                          width: '60px',
                          display: 'inline',
                          marginLeft: '10px'
                        }}
                        type="number"
                        value={workingTimePerDay1.minutes}
                        onChange={handleChangeMinutes1}
                        placeholder="Minutes"
                        min="0"
                        max="59"
                      />
                      <Form.Label>Minutes</Form.Label>

                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col xs={3} md={0}/>
            </Row>

            <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Duration</p>
            </Col>

            <Col xs={3} md={4}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={duration}
                    onChange={handleChangeDuration}
                  >
                    <option>Select</option>
                    {durationList?.map((duration, index) => (
                      <option>{duration}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={2}/>
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

export default ThreeSessionAdd;
