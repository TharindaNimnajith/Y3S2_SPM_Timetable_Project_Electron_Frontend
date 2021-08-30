/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import NavBar from '../../components/NavBar/NavBar';
import styles from './working-days-hours.css';
import routes from '../../constants/routes.json';
import {setWorkingDaysHours} from './workingDaysHoursSlice';
import {proxy} from '../../conf'

// noinspection DuplicatedCode
const WorkingDaysHoursView: React.FC = () => {
  const dispatch = useDispatch();
  const [workingDaysAndHoursObject, setWorkingDaysAndHoursObject] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${proxy}/workingDaysHours/getWorkingDaysAndHours`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseData = await response.json();
        setWorkingDaysAndHoursObject(responseData.workingDaysAndHours[0]);
        dispatch(setWorkingDaysHours(responseData.workingDaysAndHours[0]));
        console.log(responseData.workingDaysAndHours);

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

  const handleDelete = async () => {
    const tempObj = {
      // eslint-disable-next-line no-underscore-dangle
      id: workingDaysAndHoursObject._id
    };
    try {
      const response = await fetch(
        `${proxy}/workingDaysHours/deleteWorkingDaysAndHours`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tempObj)
        }
      );

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

  return (
    <div style={{backgroundColor: '#37474F', height: '100vh'}}>
      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Working Days and Hours</h3>
        </Col>
      </Row>
      {workingDaysAndHoursObject && (
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
                <tbody>
                <tr>
                  <td>Selected Week Type</td>
                  <td>
                    {workingDaysAndHoursObject.workingDays.length > 2
                      ? 'Weekdays'
                      : 'Weekend'}
                  </td>
                </tr>
                <tr>
                  <td>No of Working Days</td>
                  <td>{workingDaysAndHoursObject.numberOfWorkingDays}</td>
                </tr>
                <tr>
                  <td>Working Days</td>
                  <td>
                    {workingDaysAndHoursObject.workingDays.map(
                      (day: any, index: number) => {
                        if (
                          workingDaysAndHoursObject.workingDays.length ===
                          index + 1
                        ) {
                          return <span key={index}>{day.day} </span>;
                        }
                        // eslint-disable-next-line react/no-array-index-key
                        return <span key={index}>{day.day} ,</span>;
                      }
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Start Time & End Time</td>
                  <td>
                   Start time -  {workingDaysAndHoursObject.workingTimePerDay.startTime}
                    and End time -  {workingDaysAndHoursObject.workingTimePerDay.endTime}{' '}
                  </td>
                </tr>
                <tr>
                  <td>Time Slots</td>
                  <td>
                    {workingDaysAndHoursObject.timeSlots.map(
                      (slot: any, index: number) => {
                        if (
                          workingDaysAndHoursObject.timeSlots.length ===
                          index + 1
                        ) {
                          return <span key={index}>{slot.type}</span>;
                        }
                        // eslint-disable-next-line react/no-array-index-key
                        return <span key={index}>{slot.type} ,</span>;
                      }
                    )}
                  </td>
                </tr>
                </tbody>
              </Table>

              <Button style={{width: '160px', fontSize: '1.3em'}}>
                <NavLink
                  to={routes.WORKING_DAYS_AND_HOURS_Edit}
                  style={{color: '#fff'}}
                >
                  Edit & Update
                </NavLink>
              </Button>
              <Button
                className="ml-4"
                onClick={handleDelete}
                variant="outline-danger"
                style={{
                  width: '160px',
                  fontSize: '1.3em',
                  borderWidth: '2px'
                }}
              >
                <NavLink
                  to={routes.WORKING_DAYS_AND_HOURS}
                  style={{color: '#fff'}}
                >
                  Reset Data
                </NavLink>
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default WorkingDaysHoursView;
