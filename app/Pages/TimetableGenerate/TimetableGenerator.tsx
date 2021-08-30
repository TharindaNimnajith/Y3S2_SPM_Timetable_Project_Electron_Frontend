import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Container, Button } from 'react-bootstrap';
import moment from 'moment';
import sessions from '../../constants/data';
import {proxy} from '../../conf'

type TimetableGeneratorProps = {
  degree: string | null;
  semester: string | null;
  year: string | null;
  group: string | null;
  lecturer: string | null;
  room: string | null;
  isGenerate: boolean | null;
};

const TimetableGenerator: React.FC<TimetableGeneratorProps> = (props) => {

  const { group, year, semester, degree, lecturer, isGenerate, room } = props;
  const [columnsNo, setColumnsNo] = useState([1, 2, 3, 4, 5]);
  const [rowsNo, setRowsNo] = useState([]);
  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('17:30');
  const [timeSlotTime, setTimeSlotTime] = useState('60');
  const [finalSessionsLecturer, setFinalSessionsLecturer] = useState<[any[], any[], any[], any[], any[]] | null>(null);

  const getNoOfWorkingTime = (startTime, endTime) => {
    var startTime = startTime;
    var endTime = endTime;

    var todayDate = moment(new Date()).format('MM-DD-YYYY');

    var startDate = new Date(`${todayDate} ${startTime}`);
    var endDate = new Date(`${todayDate} ${endTime}`);
    var timeDiff = Math.abs(startDate.getTime() - endDate.getTime());

    var hh = Math.floor(timeDiff / 1000 / 60 / 60);
    hh = ('0' + hh).slice(-2);

    timeDiff -= hh * 1000 * 60 * 60;
    var mm = Math.floor(timeDiff / 1000 / 60);
    mm = ('0' + mm).slice(-2);

    timeDiff -= mm * 1000 * 60;
    var ss = Math.floor(timeDiff / 1000);
    ss = ('0' + ss).slice(-2);

    return ({ hours: hh, minutes: mm });
  };

  const generateNoOfTimeSlots = (timeSlotTime, startTime, endTime) => {
    const time = getNoOfWorkingTime(startTime, endTime);
    const tempHoursInMinutes = time.hours * 60;
    const slots = (parseInt(tempHoursInMinutes) + parseInt(time.minutes)) / timeSlotTime;
    return slots;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${proxy}/sessions/getSessionList`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          }
        );

        const responseData = await response.json();
        console.log(responseData);

        // setSessionsObject(responseData);
        // dispatch(setSessions(responseData));

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

  console.log(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'));

  const generateTimeTableTimeColumn = () => {
    // const startTimeHours = start;
    const res = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {
      return (i);
    });
    setRowsNo(res);
  };

  useEffect(() => {
    generateTimeTableTimeColumn();
  }, []);

  const getSessionForLecturer = (sessions, lecturer, startTime) => {
    const sessinsForLecturer = sessions.filter((data) => data.lecturers[0] === lecturer);
    const sessionsForMonday = sessinsForLecturer.filter((data) => data.day === 'Monday');
    const sessionsForTuesday = sessinsForLecturer.filter((data) => data.day === 'Tuesday');
    const sessionsForWednesday = sessinsForLecturer.filter((data) => data.day === 'Wednesday');
    const sessionsForThursday = sessinsForLecturer.filter((data) => data.day === 'Thursday');
    const sessionsForFriday = sessinsForLecturer.filter((data) => data.day === 'Friday');
    let mondaySessionsFinal = [];

    const resMonday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForMonday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resTuesday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForTuesday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resWednesday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForWednesday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resThursday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForThursday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resFriday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForFriday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    let mondayFinal = [];
    let tuesdayFinal = [];
    let wednesdayFinal = [];
    let thursdayFinal = [];
    let fridayFinal = [];

    resMonday.map((data, index) => {
      mondayFinal.push(data[0]);
      return index;
    });
    resTuesday.map((data, index) => {
      tuesdayFinal.push(data[0]);
      return index;
    });
    resWednesday.map((data, index) => {
      wednesdayFinal.push(data[0]);
      return index;
    });
    resThursday.map((data, index) => {
      thursdayFinal.push(data[0]);
      return index;
    });
    resFriday.map((data, index) => {
      fridayFinal.push(data[0]);
      return index;
    });

    return [mondayFinal, tuesdayFinal, wednesdayFinal, thursdayFinal, fridayFinal];

  };

  const getSessionForStudents = (sessions, year, group, semester, startTime, degree) => {
    console.log(group);
    console.log(degree);

    const sessinsForStudents = sessions.filter((data) => {
      const regex1 = /^([^.]+)/g;
      const regex2 = /([^.]+(?=\())/g;
      const regex3 = /\.([^.]*)./g;
      const regex4 = /([^(]+(?=\)))/g;

      const year1 = data.groupRef.match(regex1);
      const group1 = data.groupRef.match(regex2);
      const sem = data.groupRef.match(regex3);
      const degree1 = data.groupRef.match(regex4);
      console.log(degree1);
      console.log(group1);

      const semFinal = sem[0].split('.').join('');

      return ((year1[0] === year) && (group1[0] === group) && (semFinal === semester) && (degree1[0] === degree));
    });

    console.log(sessinsForStudents);

    const sessionsForMonday = sessinsForStudents.filter((data) => data.day === 'Monday');
    const sessionsForTuesday = sessinsForStudents.filter((data) => data.day === 'Tuesday');
    const sessionsForWednesday = sessinsForStudents.filter((data) => data.day === 'Wednesday');
    const sessionsForThursday = sessinsForStudents.filter((data) => data.day === 'Thursday');
    const sessionsForFriday = sessinsForStudents.filter((data) => data.day === 'Friday');
    let mondaySessionsFinal = [];

    const resMonday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForMonday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resTuesday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForTuesday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resWednesday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForWednesday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resThursday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForThursday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resFriday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForFriday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    let mondayFinal = [];
    let tuesdayFinal = [];
    let wednesdayFinal = [];
    let thursdayFinal = [];
    let fridayFinal = [];

    resMonday.map((data, index) => {
      mondayFinal.push(data[0]);
      return index;
    });
    resTuesday.map((data, index) => {
      tuesdayFinal.push(data[0]);
      return index;
    });
    resWednesday.map((data, index) => {
      wednesdayFinal.push(data[0]);
      return index;
    });
    resThursday.map((data, index) => {
      thursdayFinal.push(data[0]);
      return index;
    });
    resFriday.map((data, index) => {
      fridayFinal.push(data[0]);
      return index;
    });

    return [mondayFinal, tuesdayFinal, wednesdayFinal, thursdayFinal, fridayFinal];

  };


  const getSessionForRoom = (sessions, room, startTime) => {
    const sessinsForRoom = sessions.filter((data) => data.roomRef === room);
    const sessionsForMonday = sessinsForRoom.filter((data) => data.day === 'Monday');
    const sessionsForTuesday = sessinsForRoom.filter((data) => data.day === 'Tuesday');
    const sessionsForWednesday = sessinsForRoom.filter((data) => data.day === 'Wednesday');
    const sessionsForThursday = sessinsForRoom.filter((data) => data.day === 'Thursday');
    const sessionsForFriday = sessinsForRoom.filter((data) => data.day === 'Friday');
    let mondaySessionsFinal = [];

    const resMonday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForMonday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resTuesday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForTuesday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resWednesday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForWednesday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resThursday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForThursday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resFriday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForFriday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    let mondayFinal = [];
    let tuesdayFinal = [];
    let wednesdayFinal = [];
    let thursdayFinal = [];
    let fridayFinal = [];

    resMonday.map((data, index) => {
      mondayFinal.push(data[0]);
      return index;
    });
    resTuesday.map((data, index) => {
      tuesdayFinal.push(data[0]);
      return index;
    });
    resWednesday.map((data, index) => {
      wednesdayFinal.push(data[0]);
      return index;
    });
    resThursday.map((data, index) => {
      thursdayFinal.push(data[0]);
      return index;
    });
    resFriday.map((data, index) => {
      fridayFinal.push(data[0]);
      return index;
    });

    return [mondayFinal, tuesdayFinal, wednesdayFinal, thursdayFinal, fridayFinal];

  };

  useEffect(() => {
    // console.log(getSessionForLecturer(sessions, lecturer, startTime));
    if (lecturer != '') {
      setFinalSessionsLecturer(
        getSessionForLecturer(sessions, lecturer, startTime)
      );
    }

  }, [lecturer]);

  useEffect(() => {
    if ((year != '') && (semester != '') && (group != '')) {
      setFinalSessionsLecturer(
        getSessionForStudents(sessions, year, group, semester, startTime, degree)
      );
    }
  }, [year, semester, group, degree]);

  useEffect(() => {
    // console.log(getSessionForLecturer(sessions, lecturer, startTime));
    if (room != '') {
      setFinalSessionsLecturer(
        getSessionForRoom(sessions, room, startTime)
      );
    }

  }, [room]);


  const generateTable = () => {
    console.log(finalSessionsLecturer);
    const table = (<Table striped bordered hover>
        <thead>
        <tr>
          <th>Time</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
        </tr>
        </thead>
        <tbody>

        <tr style={{ display: 'table-cell', width: '13%' }}>
          {
            rowsNo.map((index) => {
              const regex1 = /^([^:]+)/g;
              const regex2 = /[^:]+$/g;
              const hours = startTime.match(regex1);
              const minutes = startTime.match(regex2);
              let increasingHours = 0;
              if (timeSlotTime === '60') {
                if (!hours) {
                  return;
                }
                increasingHours = parseInt(hours[0]) + (index + 1);
              }

              if (!minutes) {
                return;
              }
              return (<td key={index} style={{ display: 'block', textAlign: 'center' }}>
                <span
                  style={{ display: 'block' }}> - </span><span>{increasingHours - 1} : {minutes[0]}</span><span> - </span>
                <span>{increasingHours} : {minutes[0]}</span> <span style={{ display: 'block' }}> - </span></td>);
            })
          }
        </tr>

        {
          columnsNo.map((index1) => {
            console.log(index1);
            return (
              <tr style={{ display: 'table-cell', width: '17%' }}>
                {finalSessionsLecturer &&
                finalSessionsLecturer[index1 - 1].map((data, index2) => {
                  if (!data) {
                    if (!finalSessionsLecturer[index1 - 1][index2 - 1]) {
                      return (<td key={index2} style={{ display: 'block', textAlign: 'center' }}> -    <span
                        style={{ display: 'block' }}> - </span>
                        <span
                          style={{ display: 'block' }}> - </span></td>);
                    }
                    if (finalSessionsLecturer[index1 - 1][index2 - 1].duration === '2') {
                      return (<td key={index2}
                                  style={{ display: 'block' }}>{finalSessionsLecturer[index1 - 1][index2 - 1].groupRef}
                        <span
                          style={{ display: 'block' }}>{finalSessionsLecturer[index1 - 1][index2 - 1].subjectRef} </span>
                        <span
                          style={{ display: 'block' }}>{finalSessionsLecturer[index1 - 1][index2 - 1].roomRef} </span>
                      </td>);
                    }

                  }
                  return (<td key={index2} style={{ display: 'block' }}>{data.groupRef} <span
                    style={{ display: 'block' }}>{data.subjectRef} </span> <span
                    style={{ display: 'block' }}>{data.roomRef} </span></td>);
                  //   return (<td key={index2} style={{ display: 'block' }}><span>{data.groupRef}<span><br><span>{data.subjectCodeRef}<span><br></td>
                  // );
                })
                }
              </tr>
            );
          })
        }
        </tbody>
      </Table>
    );

    return table;
  };

  return (
    <div>
      {isGenerate && generateTable()}
    </div>
  );
};

export default TimetableGenerator;
