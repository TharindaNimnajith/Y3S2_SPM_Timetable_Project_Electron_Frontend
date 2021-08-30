import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import styles from './lecturers.css';
import {setLecturers} from './lecturersSlice';
import {setRoomUnavailability, setUnavailableRoom} from '../RoomsUnavailability/rooms-unavailability-slice';
import {setEditingRoom, setEditingRoomId, setEditRoom, setExistingRoom} from '../Rooms/rooms-slice';
import {
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding
} from '../Buildings/buildings-slice';
import { proxy } from '../../conf';

const Lecturer = (props: any) => (
  <tr>
    <td>{props.lecturer.employeeId}</td>
    <td>{props.lecturer.lecturerName}</td>
    <td>{props.lecturer.faculty}</td>
    <td>{props.lecturer.department}</td>
    <td>{props.lecturer.center}</td>
    <td>{props.lecturer.building}</td>
    <td>{props.lecturer.level}</td>
    <td>{props.lecturer.rank}</td>
    <td>{props.day}</td>
    <td>{props.startTime}</td>
    <td>{props.endTime}</td>
    <td>
      <Link to={'/editLecturer/' + props.lecturer._id}>edit</Link> |{' '}
      <p style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={() => {
        props.handleDelete(props.lecturer._id);
      }}>
        delete
      </p>
    </td>
  </tr>
);

const LecturersListView: React.FC = () => {
  const dispatch = useDispatch();

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

  const [lecturersObject, setLecturersObject] = useState<any>([]);

  useEffect(() => {
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
        console.log(111111111);
        console.log(responseData);

        setLecturersObject(responseData);
        dispatch(setLecturers(responseData));
        console.log(2222);
        console.log(responseData);

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

  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(
        `${proxy}/lecturers/lecturers/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: id})
        }
      );

      const temp = lecturersObject.slice();
      const tempDeletedArray = temp.filter((item: any) => item._id !== id);
      setLecturersObject(tempDeletedArray);

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

  const lectureList = () => {
    return lecturersObject.map((lecturer) => {
      console.log(lecturer.unavailability[0]);
      var day;
      var startTime;
      var endTime;

      if(lecturer.unavailability[0]){
        day = lecturer.unavailability[0].day;
        startTime = lecturer.unavailability[0].startTime;
        endTime = lecturer.unavailability[0].endTime ;
      }
    else{
        day = " ";
        startTime = " ";
        endTime = " ";
      }

      return (
        <Lecturer
          lecturer={lecturer}
          handleDelete={handleDelete}
          key={lecturer._id}
          day={day}
          startTime={startTime}
          endTime={endTime}
        />
      );
    });
  };

  return (
    <div style={{backgroundColor: '#37474F'}}>
      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Lecturer Details</h3>
        </Col>
        <Col>
          <Button
            style={{
              width: '160px',
              fontSize: '1.3em',
              color: 'white',
              marginLeft: '1000px',
              marginTop: '20px'
            }}
          >
            <Link
              to={'/addLecturer/'}
              style={{
                width: '160px',
                fontSize: '1.0em',
                color: 'white'
              }}
            >
              Add Lecturer
            </Link>
          </Button>
        </Col>
      </Row>
      {lecturersObject && (
        <Container
          className={`mt-2 p-4 ${styles.lecturersTopWrapper}`}
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
                className={`${styles.lecturersViewTable}`}
              >
                <thead className="thead-light">
                <tr>
                  <th>EmployeeId</th>
                  <th>Lecturer Name</th>
                  <th>Faculty</th>
                  <th>Department</th>
                  <th>Center</th>
                  <th>Building</th>
                  <th>Level</th>
                  <th>Rank</th>
                  <th>Day(Not Available)</th>
                  <th>Start Time(Not Available)</th>
                  <th>End Time(Not Available)</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>{lectureList()}</tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default LecturersListView;
