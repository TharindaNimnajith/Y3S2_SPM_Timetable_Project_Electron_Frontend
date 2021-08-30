import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { session } from 'electron';
import NavBar from '../../components/NavBar/NavBar';
import styles from './sessions.css';
import { setSessions } from './sessionsSlice';
import {
  setRoomUnavailability,
  setUnavailableRoom
} from '../RoomsUnavailability/rooms-unavailability-slice';
import {
  setEditingRoom,
  setEditingRoomId,
  setEditRoom,
  setExistingRoom
} from '../Rooms/rooms-slice';
import {
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding
} from '../Buildings/buildings-slice';
import { proxy } from '../../conf';

const Session = (props: any) => (
  <tr>
    <td>{props.session.sessionId}</td>
    <td>{
      props.session.lecturers.map((item) => item.lecturerRef + ', ') }</td>
    <td>{props.session.subjectCodeRef}</td>
    <td>{props.session.subjectRef}</td>
    <td>{props.session.tagRef}</td>
    <td>{props.session.groupRef}</td>
    <td>{props.session.subGroupRef}</td>
    <td>{props.session.studentCount}</td>
    <td>{props.session.duration}</td>
    <td>{props.session.parallelId}</td>
    <td>{props.session.consecutiveId}</td>
    {
      props.session.isSameRoom ? (
        <td>True</td>
      ) : (
        <td/>
      )
    }

    {/*<td>{props.session.isSameRoom}</td>*/}
    {/*    <td> */}
    {/*      <Link to={`/editLecturer/${props.lecturer._id}`}>edit</Link> | */}
    {/* {' '} */}
    {/*      <p */}
    {/*        style={{ cursor: 'pointer', textDecoration: 'underline' }} */}
    {/*        onClick={() => { */}
    {/*          props.handleDelete(props.session._id); */}
    {/*        }} */}
    {/*      > */}
    {/*        delete */}
    {/*      </p> */}
    {/*    </td> */}
  </tr>
);

const SessionsListView: React.FC = () => {
  const dispatch = useDispatch();

  const [lecturersNameObject, setLecturersNameObject] = useState<any>(null);
  const [subjectObject, setSubjectObject] = useState<any>(null);
  const [groupObject, setGroupObject] = useState<any>(null);
  const [subGroupObject, setSubGroupObject] = useState<any>(null);

  dispatch(setEditRoom(false));
  dispatch(setEditingRoomId(''));
  dispatch(setEditingRoom(null));
  dispatch(setExistingRoom(false));

  dispatch(setEditBuilding(false));
  dispatch(setEditingBuildingId(''));
  dispatch(setEditingBuilding(null));
  dispatch(setExistingBuilding(false));
  dispatch(setExistingRoomsForBuilding(false));

  dispatch(setRoomUnavailability(false));
  dispatch(setUnavailableRoom(null));

  const [sessionsObject, setSessionsObject] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionS, setsessionS] = useState<{
    lecturers: string;
    subjectRef: string;
    groupRef: string;
    subGroupRef: string;
  }>({
    lecturers: '',
    subjectRef: '',
    groupRef: '',
    subGroupRef: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${proxy}/sessions/getSessionList`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseData = await response.json();
        console.log(111111111);
        console.log(responseData);

        setSessionsObject(responseData);
        dispatch(setSessions(responseData));
        console.log(2222);
        console.log(responseData);

        const responseLecturers = await fetch(
          `${proxy}/lecturers/lecturers`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseDataLecturers = await responseLecturers.json();
        setLecturersNameObject(responseDataLecturers);
        console.log('111111111111222211111111111');
        console.log(responseDataLecturers);

        if (!responseDataLecturers) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(responseDataLecturers.message);
        }

        const responseSubjects = await fetch(
          `${proxy}/subjects/subjects`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseDataSubjects = await responseSubjects.json();
        setSubjectObject(responseDataSubjects);
        console.log('111111111111222211111111111');
        console.log(responseDataSubjects);

        if (!responseDataSubjects) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(responseDataSubjects.message);
        }
        const responseGroup = await fetch(
          `${proxy}/groups/getGroups`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseDataGroup = await responseGroup.json();
        setGroupObject(responseDataGroup);
        console.log('group');
        console.log(responseDataGroup);

        if (!responseDataGroup) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(responseDataGroup.message);
        }

        const responseSubGroup = await fetch(
          `${proxy}/subGroups/getSubGroups`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseDataSubGroup = await responseSubGroup.json();
        setSubGroupObject(responseDataSubGroup);
        console.log('sub group');
        console.log(responseDataSubGroup);

        if (!responseDataSubGroup) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(responseDataSubGroup.message);
        }

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

  const sessionsStore = useSelector(
    (state: { sessions: any }) => state.sessions
  );

  console.log('---------');
  console.log(sessionsStore);

  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(
        `${proxy}/lecturers/lecturers/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        }
      );

      const temp = sessionsObject.slice();
      const tempDeletedArray = temp.filter((item: any) => item._id !== id);
      setSessionsObject(tempDeletedArray);

      const responseData = await response.json();
      // console.log(responseData.userDetails);

      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };


  const handleChangeLecturerSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if(e.target.value === 'reset'){

      return setSessionsObject(sessionsStore.sessions);
    }
    setLoading(true);
    setsessionS({ ...sessionS, subGroupRef: e.target.value });

    const temp = sessionsStore.sessions.filter((data) => {
      // console.log(data.lecturers[0]);
      // console.log(e.target.value);
      return ((data.lecturers[0].lecturerRef) === (e.target.value ))
    });
    // console.log(sessionsObject);
    // console.log(temp);
    setSessionsObject(temp);
    setLoading(false);
  };

  const handleChangeSubjectSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if(e.target.value === 'reset'){

      return setSessionsObject(sessionsStore.sessions);
    }
    setLoading(true);
    setsessionS({ ...sessionS, subGroupRef: e.target.value });

    const temp = sessionsStore.sessions.filter((data) => {
      // console.log(data.lecturers[0]);
      // console.log(e.target.value);
      return ((data.subjectRef) === (e.target.value ))
    });
    // console.log(sessionsObject);
    // console.log(temp);
    setSessionsObject(temp);
    setLoading(false);
  };

  const handleChangeGroupSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === 'reset'){

      return setSessionsObject(sessionsStore.sessions);
    }
    setLoading(true);
    setsessionS({ ...sessionS, subGroupRef: e.target.value });

    const temp = sessionsStore.sessions.filter((data) => {
      // console.log(data.lecturers[0]);
      // console.log(e.target.value);
      return ((data.groupRef) === (e.target.value ))
    });
    // console.log(sessionsObject);
    // console.log(temp);
    setSessionsObject(temp);
    setLoading(false);
  };

  const handleChangeSubGroupSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if(e.target.value === 'reset'){

      return setSessionsObject(sessionsStore.sessions);
    }
    setLoading(true);
    setsessionS({ ...sessionS, subGroupRef: e.target.value });

    const temp = sessionsStore.sessions.filter((data) => {
      // console.log(data.lecturers[0]);
      // console.log(e.target.value);
      return ((data.subGroupRef) === (e.target.value ))
    });
    // console.log(sessionsObject);
    // console.log(temp);
    setSessionsObject(temp);
    setLoading(false);
  };

  const sessionList = () => {
    return sessionsObject.map((session) => {
      console.log(session);
      return (
        <Session
          session={session}
          handleDelete={handleDelete}
          key={session._id}
        />
      );
    });
  };

  return (
    <div style={{ backgroundColor: '#37474F' }}>
      <NavBar/>

      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{ backgroundColor: '#343a40', color: '#fff' }}
        >
          <h3>Session Details</h3>
        </Col>
        <Col>
          <Button
            style={{
              width: '160px',
              fontSize: '1.3em',
              color: 'white',
              marginLeft: '63.5%',
              marginTop: '20px'
            }}
          >
            <Link
              to="/addSessions/"
              style={{
                width: '160px',
                fontSize: '1.0em',
                color: 'white'
              }}
            >
              Add Session
            </Link>
          </Button>
        </Col>
      </Row>
      <div>
        <Form>
          <Form.Row
            style={{
              marginTop: '-2%'
            }}
          >
            <Form.Group
              controlId="formLocatedBuilding"
              style={{
                marginLeft: '20%'
              }}
            >
              <Form.Label>Lecturer Name</Form.Label>
              <Form.Control
                as="select"
                value={sessionS.groupRef}
                onChange={handleChangeLecturerSearch}
                title="Search by located building."
              >
                <option value="">Search by Lecturer Name</option>
                {lecturersNameObject &&
                lecturersNameObject.map((lecturersNameObject: any) => {
                  return (
                    <option key={lecturersNameObject._id} value={lecturersNameObject.lecturerName}>
                      {lecturersNameObject.lecturerName}
                    </option>
                  );
                })}
                <option value="reset">Reset</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              controlId="formLocatedBuilding"
              style={{
                marginLeft: '3%'
              }}
            >
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                as="select"
                value={sessionS.subjectRef}
                onChange={handleChangeSubjectSearch}
                title="Search by located building."
              >
                <option value="">Search by Subject</option>
                {subjectObject &&
                subjectObject.map((subjectObject: any) => {
                  return (
                    <option key={subjectObject._id} value={subjectObject.subjectName}>
                      {subjectObject.subjectName}
                    </option>
                  );
                })}
                <option value="reset">Reset</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              controlId="formLocatedBuilding"
              style={{
                marginLeft: '3%'
              }}
            >
              <Form.Label>Group ID</Form.Label>
              <Form.Control
                as="select"
                value={sessionS.groupRef}
                onChange={handleChangeGroupSearch}
                title="Search by located building."
              >
                <option value="">Search by Group ID</option>
                {groupObject &&
                groupObject.groups.map((groupObject: any) => {
                  return (
                    <option key={groupObject._id} value={groupObject.groupId}>
                      {groupObject.groupId}
                    </option>
                  );
                })}
                <option value="reset">Reset</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              controlId="formLocatedBuilding"
              style={{
                marginLeft: '3%'
              }}
            >
              <Form.Label> Sub Group ID</Form.Label>
              <Form.Control
                as="select"
                value={sessionS.subGroupRef}
                onChange={handleChangeSubGroupSearch}
                title="Search by located building."
              >
                <option value="">Search by Group ID</option>
                {subGroupObject &&
                subGroupObject.subGroups.map((subGroupObject: any) => {
                  return (
                    <option key={subGroupObject._id} value={subGroupObject.subGroupId}>
                      {subGroupObject.subGroupId}
                    </option>
                  );
                })}
                <option value="reset">Reset</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>

      {sessionsObject && (
        <Container
          className={`mt-2 p-4 ${styles.workingDaysHoursTopWrapper}`}
          style={{
            border: '3px solid white',
            borderRadius: '8px',
            color: 'white'
          }}
        >
          <Row className="mt-3 mb-4 justify-content-md-center">
            <Col xs={12} md={12} className="mt-auto">
              <Table
                striped
                bordered
                hover
                variant="dark"
                className={`${styles.workingDaysHoursViewTable}`}
              >
                <thead className="thead-light">
                <tr>
                  <th>Session ID</th>
                  <th>Lecturers Name</th>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Tag</th>
                  <th>Group</th>
                  <th>Sub Group</th>
                  <th>Student Count</th>
                  <th>Duration</th>
                  <th>Parallel</th>
                  <th>Consecutive</th>
                  <th>isSameRoom</th>
                </tr>
                </thead>
                <tbody>{sessionList()}</tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default SessionsListView;
