/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {RadioButton, RadioGroup} from 'react-radio-buttons';
import CheckboxGroup from 'react-checkbox-group';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import styles from './notAvailables.css';
import {setNotAvailables} from './notAvailablesSlice';
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
import SessionsAddNA from './sessionsAddNA.tsx';
import LecturersAddNA from './lecturersAddNA.tsx';
import GroupsAddNA from './groupsAddNA.tsx';
import SubGroupsAddNA from './subGroupsAddNA.tsx';


const NotAvailablesPage: React.FC = () => {
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
  const [group, setGroup] =useState<boolean | null>(false);
  const [subGroup, setSubGroup] =useState<boolean | null>(false);


  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(
    false
  );



  const handleRole = (value: string) => {
    console.log("handle role eka ahule")
    if (value === 'lecturer') {
      setLecturer(true);
      setSession(false);
      setGroup(false);
      setSubGroup(false);
      console.log("lecturer")
    }
    if (value === 'session') {
      setLecturer(false);
      setSession(true);
      setGroup(false);
      setSubGroup(false);
      console.log("session")
    }
    if (value === 'group') {
      setLecturer(false);
      setSession(false);
      setGroup(true);
      setSubGroup(false);
      console.log("group")
    }
    if (value === 'subGroup') {
      setLecturer(false);
      setSession(false);
      setGroup(false);
      setSubGroup(true);
      console.log("subGroup")
    }

  };


  // const renderRedirect = () => {
  //   if (renderRedirectTo) {
  //     return <Redirect to={routes.WORKING_DAYS_AND_HOURS_VIEW}/>;
  //     //   props.history.push(loginState.redirectTo);s
  //   }
  //   return null;
  // };


  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '100vh'
      }}
    >


      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Allocate Not Available Times</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5  ${styles.notAvailablesTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >
        <Row className="mt-2 mb-3 justify-content-md-center">
          <Col xs={12} md={4} className="mt-auto">
            <p>Select a Role</p>
          </Col>
          <Col xs={3} md={7}>
            <RadioGroup onChange={handleRole} horizontal>
              <RadioButton iconInnerSize={10} iconSize={20} value="lecturer">
                Lecturer
              </RadioButton>
              <RadioButton iconInnerSize={10} iconSize={20} value="session">
                Session
              </RadioButton>
              <RadioButton iconInnerSize={10} iconSize={20} value="group">
                Group
              </RadioButton>
              <RadioButton iconInnerSize={10} iconSize={20} value="subGroup">
                SubGroup
              </RadioButton>
            </RadioGroup>
          </Col>
          <Col xs={3} md={1}/>
        </Row>

        {lecturer && (
            <LecturersAddNA/>
        )
        }

        {session && (
            <SessionsAddNA/>
        )
        }

        {group && (
          <GroupsAddNA/>
        )
        }


        {subGroup && (
          <SubGroupsAddNA/>
        )
        }
      </Container>
    </div>
  );
};

export default NotAvailablesPage;
