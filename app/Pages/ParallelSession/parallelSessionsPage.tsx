/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {RadioButton, RadioGroup} from 'react-radio-buttons';
import CheckboxGroup from 'react-checkbox-group';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import styles from './parallelSessions.css';
import {setNotAvailables} from './parallelSessionsSlice';
import {setRoomUnavailability, setUnavailableRoom} from '../RoomsUnavailability/rooms-unavailability-slice'
import {setEditingRoom, setEditingRoomId, setEditRoom, setExistingRoom} from '../Rooms/rooms-slice'
import {
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding
} from '../Buildings/buildings-slice';
import {proxy} from '../../conf';
import TwoSessionAdd from './twoSessionAdd.tsx';
import ThreeSessionAdd from './threeSessionAdd.tsx';
import { selectCount } from '../WorkingDaysHours/workingDaysHoursSlice';
import {setParallelSessions,setEditParallelSession,setEditingParallelSessionId,setEditingParallelSession} from './parallelSessionsSlice';

//const categoryList = ['(A,B,C)', '(E,F)', '(H,J)'];


const weekends = ['Saturday', 'Sunday'];
var catCount;
//var scode:{res:any} [] = [];

const ParallelSessionsPage: React.FC = () => {
  const dispatch = useDispatch();

  dispatch(setEditRoom(false))
  dispatch(setEditingRoomId(''))
  dispatch(setEditingRoom(null))
  dispatch(setExistingRoom(false))

  dispatch(setEditBuilding(false))
  dispatch(setEditingBuildingId(''))
  dispatch(setEditingBuilding(null))
  dispatch(setExistingBuilding(false))
  dispatch(setExistingRoomsForBuilding(false))

  dispatch(setRoomUnavailability(false))
  dispatch(setUnavailableRoom(null))

  const [lecturer, setLecturer] =useState<boolean | null>(false);
  const [session, setSession] =useState<boolean | null>(false);
  const [two, setTwo] =useState<boolean | null>(false);
  const [three, setThree] =useState<boolean | null>(false);
  const [categoryList, setCategoryList1] = useState<any>([]);

  const [days, setDays] = useState<string[] | null>(null);
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(
    false
  );
  const [error, setError] = useState<string | null>(null);
  const [weekType, setWeekType] = useState<string | null>(null);
  const [noOfWorkingDays, setNoOfWorkingDays] = useState<any>(null);
  const [noOfWorkingDaysDropDown, setNoOfWorkingDaysDropDown] = useState<number | null>(null);
  const [daysSelected, setDaysSelected] = useState<any>([]);
  const [timeSlots, setTimeSlots] = useState<any>([
    'One Hour',
    'Thirty Minutes'
  ]);
  const [workingTimePerDay, setWorkingTimePerDay] = useState<{
    hours: string;
    minutes: string;
  }>({
    hours: '00',
    minutes: '00'
  });
  const [ccount, setCCount] = useState<any>(null);
  const [category, setCategory] = useState<string>('');
  const categoryList1:{any} [] =[];




  useEffect(() => {
    fetchData();

  },[]);

  const fetchData = async () => {

    try {
      const response = await fetch(
        `${proxy}/parallelSessions/getCategories`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const responseData = await response.json();

      console.log(responseData.category);


     setCategoryList1(responseData.category);




      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCategory = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    var catid = e.target.value;

    setCategory(e.target.value);


    dispatch(setEditingParallelSessionId(e.target.value));

    console.log(catid);
    //-------------------2.category eka find ekakata yawala ena data walin category count eka alla ganna

    getCategoryCount(catid);
    //getSubjectCat(catid);
 };

  const getCategoryCount = async (cid) => {
    console.log(category)
    try {

      const response = await fetch(`${proxy}/parallelSessions/getCategoryCount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"category":cid})
      })
      const responseData = await response.json()
     console.log(responseData);

     var count = responseData.categoryCount;
     if(count === 2){
       setTwo(true);
       setThree(false);

     }
     if(count === 3){
       setTwo(false);
       setThree(true);
     }

    } catch (errors) {


      console.log(errors)
    }
  }


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

     console.log(scode);
     dispatch(setParallelSessions(scode));

    } catch (errors) {


      console.log(errors)
    }
  }

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.WORKING_DAYS_AND_HOURS_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };



  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '120vh'
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
          <h3>Add Parallel Session</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5  ${styles.parallelSessionsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >
        <Row className="mt-2 mb-3 justify-content-md-center">
        <Col xs={12} md={4} className="mt-auto">
              <p>Select a Category</p>
            </Col>
            <Col xs={3} md={4}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={category}
                    onChange={handleCategory}
                  >
                    <option>Select</option>
                    {categoryList?.map((category, index) => (
                      <option>{category}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={2}/>
        </Row>



        {two && (
            <TwoSessionAdd/>
        )
        }

        {three && (
            <ThreeSessionAdd/>
        )
        }

      </Container>
    </div>
  );
};

export default ParallelSessionsPage;
