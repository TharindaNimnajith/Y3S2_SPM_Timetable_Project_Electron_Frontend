import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Modal, Row, Spinner} from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//import CheckboxGroup from 'react-checkbox-group';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import styles from './notAvailables.css';
import routes from '../../constants/routes.json';

import {proxy} from '../../conf';


let errors_: string = '';


var exist = 0;

const LecturersAddNA: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();

  const [lecturer1List, setLecturer1List] = useState<any>([]);



  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [renderRedirectTo1, setRenderRedirectTo1] = useState<boolean | null>(false);
  const [renderRedirectToGro, setRenderRedirectToGro] = useState<boolean | null>(false);


  const [existUnavaialability, setExistUnavaialability] = useState<boolean | null>(false);


  const [day, setDay] = useState<string>('');
  const [id1, setId1] = useState<string>('');


  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday', 'Sunday'];


  const [unavailability, setUnavailability] = useState<{ day: string, startTime: string, endTime: string  }>({});

  const [lecturersObject, setLecturersObject] = useState<any>(null);
  const [workingTimePerDay1, setWorkingTimePerDay1] = useState<{
    hours: string;
    minutes: string;
  }>({
    hours: '00',
    minutes: '00'
  });

  const [workingTimePerDay2, setWorkingTimePerDay2] = useState<{
    hours: string;
    minutes: string;
  }>({
    hours: '00',
    minutes: '00'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${proxy}/lecturers/lecturers`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const responseData = await response.json();
      setLecturersObject(responseData);
      setLecturer1List(responseData);

      //dispatch(setConsecutiveSessions(responseData));
      console.log(responseData);

      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
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
  const handleSubmit1 = async () => {

    if (existUnavaialability) {
      exist = 1;
    }

    else{
      exist = 0;
    }

  if (exist === 1) {
    handleShow();
  }
  }

  const handleSubmit = async () => {
    var emin1;
    var emin2;
    var stime;
    var etime;



   if(workingTimePerDay2.minutes  <= 9 && workingTimePerDay2.minutes!== '00'){
    emin2 = '0' + workingTimePerDay2.minutes;
   }
   else{
     emin2 = workingTimePerDay2.minutes;
   }



   if(workingTimePerDay1.minutes <= 9 && workingTimePerDay1.minutes!== '00'){
     emin1 = '0' + workingTimePerDay1.minutes;
    }
    else{
      emin1 = workingTimePerDay1.minutes;
    }



     stime = workingTimePerDay1.hours+':'+ emin1 ;
     etime = workingTimePerDay2.hours+':'+ emin2;

    //  setUnavailability({day:day, startTime: stime , endTime : etime});

    if ((id1.trim() === '') && (day.trim() === '') && (stime.trim() === '00:00') &&  (etime.trim() === '00:00')){
      errors_ = 'Please select  values for all fields.'
      setError(true)
      setLoading(false)
    } else {
      if (id1.trim() === '') {
        errors_ = 'Please select a lecturer .'
        setError(true)
        setLoading(false)
      } else if (day.trim() === '') {
        errors_ = 'Please select a day.'
        setError(true)
        setLoading(false)

      }else if (stime.trim() === '00:00') {
        errors_ = 'Please select a start time.'
        setError(true)
        setLoading(false)

      }
      else if (etime.trim() === '00:00') {
        errors_ = 'Please select a end time.'
        setError(true)
        setLoading(false)

      }
    }



      //   if (existUnavaialability) {
      //     exist = 1;
      //   }

      //   else{
      //     exist = 0;
      //   }

      // if (exist === 1) {
      //   handleShow();
      // }


      if ((id1.trim() != '') && (day.trim() != '') && (stime.trim() != '00:00') &&  (etime.trim() != '00:00')){
      const finalObjectGroup = {
      unavailability :{day:day, startTime: stime , endTime : etime}
      };


      try {

        const response = await fetch(`${proxy}/lecturers/addNotAvailable/` + id1, {
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



     }



  };


  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.LECTURERS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const renderRedirectGro = () => {
    if (renderRedirectToGro) {
      return <Redirect to={routes.LECTURERS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };


  // const other = () => {
  //  var emin1;
  //  var emin2;
  //  if(workingTimePerDay2.minutes != "00"){
  //   var emin =  String(parseInt(workingTimePerDay2.minutes) +1 );
  //  }
  //  else{
  //    emin2 = workingTimePerDay2.minutes;
  //  }


  // if(emin <= 9){
  //  emin2 = '0' + emin;
  // }
  // else{
  //   emin2 = emin;
  // }



  // if(workingTimePerDay1.minutes <= 9){
  //   emin1 = '0' + workingTimePerDay1.minutes;
  //  }
  //  else{
  //    emin1 = workingTimePerDay1.minutes;
  //  }



  //  var stime = workingTimePerDay1.hours+':'+ emin1 ;
  //  var etime = workingTimePerDay2.hours+':'+ emin2;

  //   setUnavailability({day:day, startTime: stime , endTime : etime});
  // }
  const handleLecturer1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)

    setId1(e.target.value);
    setExistUnavaialability(true);
    getLecturer1(e.target.value);


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

  const handleChangeHour2 = (e: React.ChangeEvent<HTMLInputElement>) => {

    setError(false)
    setWorkingTimePerDay2({...workingTimePerDay2, hours: e.target.value});
  };

  const handleChangeMinutes2 = (e: React.ChangeEvent<HTMLInputElement>) => {

    setError(false)
    setWorkingTimePerDay2({...workingTimePerDay2, minutes: e.target.value});
    //other();
  };


  const getLecturer1 = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/lecturers/lecturers/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
     console.log(responseData.unavailability[0].day);

      if(responseData.unavailability[0].day){
        setExistUnavaialability(true);
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
        backgroundColor: '#37474F'
      }}
    >

      {renderRedirect()}


      <Modal show={show}
             onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>This lecturer already has a not available time. If you want you can replace that or keep it as it is.</Modal.Body>
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
        className={`mt-2 p-4 mb-3 pd-2 ${styles.groupsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >


        <div>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Select Lecturer</p>
            </Col>
            <Col xs={3} md={4}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={id1}
                    onChange={handleLecturer1}
                  >
                    <option>Select</option>
                    {lecturer1List?.map((lec, index) => (
                      <option value={lec._id}>{lec.lecturerName}</option>
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
                <p>End Time</p>
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
                        value={workingTimePerDay2.hours}
                        onChange={handleChangeHour2}
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
                        value={workingTimePerDay2.minutes}
                        onChange={handleChangeMinutes2}
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






          <Row className="mt-2 mb-2 justify-content-md-center">
            <Col xs={12} md={4}/>
            <Col xs={3} md={2}>
              <Button
                style={{width: '150px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
                Add
              </Button>
            </Col>

            <Col xs={3} md={2}>

            </Col>
            <Col xs={3} md={4}/>
          </Row>



  <Row className="mt-2 mb-2 justify-content-md-center">
            <Col xs={12} md={8}/>
            <Col xs={3} md={2}/>

            <Col xs={3} md={2}>
            <a
                style={{width: '150px', fontSize: '1.3em', color:'red'}}
                onClick={handleSubmit1}
              >
                Exist One
              </a>
            </Col>


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
  )
}

export default LecturersAddNA




