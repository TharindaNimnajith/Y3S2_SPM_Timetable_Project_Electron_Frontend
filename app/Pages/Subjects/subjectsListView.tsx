import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import styles from './subjects.css';
import {setSubjects} from './subjectsSlice';
import {setRoomUnavailability, setUnavailableRoom} from '../RoomsUnavailability/rooms-unavailability-slice'
import {setEditingRoom, setEditingRoomId, setEditRoom, setExistingRoom} from '../Rooms/rooms-slice'
import {
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding
} from '../Buildings/buildings-slice'
import { proxy } from '../../conf';

const Subject = (props: any) => (
  <tr>
    <td>{props.subject.subjectCode}</td>
    <td>{props.subject.subjectName}</td>
    <td>{props.subject.offeredYear}</td>
    <td>{props.subject.offeredSemester}</td>
    <td>{props.subject.numberOfLectureHours}</td>
    <td>{props.subject.numberOfTutorialHours}</td>
    <td>{props.subject.numberOfLabHours}</td>
    <td>{props.subject.numberOfEvaluationHours}</td>
    <td>{props.subject.category}</td>
    <td>
      <Link to={'/editSubject/' + props.subject._id}>Edit</Link> |{' '}
      <p style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={() => {
        props.handleDelete(props.subject._id);
      }}>
        Delete
      </p>
    </td>
  </tr>
);

const SubjectsListView: React.FC = () => {
  const dispatch = useDispatch()

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

  const [subjectsObject, setSubjectsObject] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${proxy}/subjects/subjects`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const responseData = await response.json();

        setSubjectsObject(responseData);
        dispatch(setSubjects(responseData));
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
    console.log(id);
    try {
      const response = await fetch(
        `${proxy}/subjects/subjects/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id: id}),
        }
      );

      const temp = subjectsObject.slice();
      const tempDeletedArray = temp.filter((item: any) => item._id !== id);
      setSubjectsObject(tempDeletedArray);

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

  const subjectList = () => {
    return subjectsObject.map((subject) => {
      return (
        <Subject
          subject={subject}
          handleDelete={handleDelete}
          key={subject._id}
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
          <h3>Subject Details</h3>
        </Col>
        <Col>
          <Button
            style={{
              width: '160px',
              fontSize: '1.3em',
              color: 'white',
              marginLeft: '1000px',
              marginTop: '20px',
            }}
          >
            <Link
              to={'/addSubject/'}
              style={{
                width: '160px',
                fontSize: '1.0em',
                color: 'white',
              }}
            >
              Add Subjects
            </Link>
          </Button>
        </Col>
      </Row>
      {subjectsObject && (
        <Container
          className={`mt-2 p-4 ${styles.workingDaysHoursTopWrapper}`}
          style={{
            border: '3px solid white',
            borderRadius: '8px',
            color: 'white',
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
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>OfferedYear</th>
                  <th>Offered Semester</th>
                  <th>Number Of Lecture Hours</th>
                  <th>Number Of Tutorial Hours</th>
                  <th>Number Of Lab Hours</th>
                  <th>Number Of Evaluation Hours</th>
                  <th>Category ID</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>{subjectList()}</tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default SubjectsListView;
