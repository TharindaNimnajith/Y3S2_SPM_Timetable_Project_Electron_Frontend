/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//import CheckboxGroup from 'react-checkbox-group';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './sessions.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import { setSessions } from './sessionsSlice';
import { proxy } from '../../conf';

// noinspection DuplicatedCode
const SessionsAdd: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();

  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(
    false
  );
  const [error, setError] = useState<string | null>(null);

  // const [lecturers, setLecturers] = useState<string>('');
  const [subjectRef, setSubjectRef] = useState<string>('');
  const [subjectCodeRef, setSubjectCodeRef] = useState<string>('');
  const [tagRef, setTagRef] = useState<string>('');
  let [groupRef, setGroupRef] = useState<any>('');
  let [subGroupRef, setSubGroupRef] = useState<any>('');
  const [studentCount, setStudentCount] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  const [sessionsObject, setSessionsObject] = useState<any>(null);
  const [lecturersNameObject, setLecturersNameObject] = useState<any>(null);
  const [lecturerObject, setLecturerObject] = useState<any>(null);
  const [subjectObject, setSubjectObject] = useState<any>(null);
  const [groupObject, setGroupObject] = useState<any>(null);
  const [subGroupObject, setSubGroupObject] = useState<any>(null);
  const [tagsObject, setTagsObject] = useState<any>(null);

  const [lecturers, setLecturers] = useState<any>([]);
  const [label, setLabel] = useState<string>('');

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
        setSessionsObject(responseData.sessions);
        dispatch(setSessions(responseData.sessions));
        console.log(responseData.sessions);

        if (!responseData) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(responseData.message);
        }

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

        const responseTags = await fetch(
          `${proxy}/tags/getTags`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseDataTags = await responseTags.json();
        setTagsObject(responseDataTags);
        console.log('tags');
        console.log(responseDataTags);

        if (!responseDataTags) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(responseDataTags.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    // noinspection JSIgnoredPromiseFromCall
    fetchData();
  }, []);

  const renderRedirectToView = () => {
    if (sessionsObject) {
      return <Redirect to={routes.SESSIONS_LIST}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleSubmit = async () => {
    if (subjectRef === '') {
      setError('Please select subject !');
      return;
    }
    if (subjectCodeRef === '') {
      setError('Please select Subject Code !');
      return;
    }
    if (subjectRef === '') {
      setError('Please select Tag !');
      return;
    }

    if (studentCount === '') {
      setError('Please enter an Student Count!');
      return;
    }
    if (duration === '') {
      setError('Please enter an Duration !');
      return;
    }
    if (groupRef !== '' && subGroupRef !== '') {
      setError('Please Select only one group !');
      return;
    }

    if (groupRef === '') {
      groupRef = null;
    }
    if (subGroupRef === '') {
      subGroupRef = null;
    }

    // if (employeeId === '') {
    //   setError('Please enter an Employee ID !');
    //   return;
    // }
    // if (employeeId.length !== 6) {
    //   setError('Please enter an valied Employee ID !');
    //   return;
    // }
    // if (lecturerName === '') {
    //   setError('Please enter an Employee Name !');
    //   return;
    // }

    setError(null);
    const finalObject = {
      lecturers,
      subjectRef,
      subjectCodeRef,
      tagRef,
      groupRef,
      subGroupRef,
      studentCount,
      duration,
      label
    };

    console.log(finalObject);

    try {
      const response = await fetch(
        `${proxy}/sessions/addSessions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObject)
        }
      );

      const responseData = await response.json();
      setRenderRedirectTo(true);
      // console.log(responseData.userDetails);

      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.SESSIONS_LIST}/>;
    }
    return null;
  };

  const handleChangeLecturers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLecturerObject(e.target.value);
  };

  const handleLecturerArray = () => {
    setLecturers([...lecturers, { lecturerRef: lecturerObject }]);
  };

  // const handleChangeLecturers = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLecturers(e.target.value);
  // };
  const handleChangeSubjectRef = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectRef(e.target.value);
  };
  // const handleChangeFaculty = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSubjectCodeRef(e.target.value);
  //   if (e.target.value === 'Computing') {
  //     setSubOptions(['IT', 'SE', 'CS', 'ISE']);
  //   } else if (e.target.value === 'Engineering') {
  //     setSubOptions(['Civil', 'Electronic', 'Chemical']);
  //   } else if (e.target.value === 'Business') {
  //     setSubOptions(['Management', 'Logistic', 'Finance']);
  //   }
  // };
  const handleChangeSubjectCodeRef = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectCodeRef(e.target.value);
  };
  const handleChangeTagRef = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagRef(e.target.value);
  };
  const handleChangeGroupRef = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupRef(e.target.value);
  };
  const handleChangeSubGroupRef = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubGroupRef(e.target.value);
  };
  // const handleChangeLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLevel(e.target.value);
  //   console.log(e.target.value);
  // };
  const handleChangeStudentCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentCount(e.target.value);
  };
  const handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
    var id;
    if (groupRef) {
      id = subjectRef + '(' + subjectCodeRef + ')-' + groupRef + '-' + tagRef;
    }
    if (subGroupRef) {
      id = subjectRef + '(' + subjectCodeRef + ')-' + subGroupRef + '-' + tagRef;
    }
    console.log(id);
    setLabel(id);
  };


  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '100vh'
      }}
    >
      {renderRedirectToView()}
      {renderRedirect()}
      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{ backgroundColor: '#343a40', color: '#fff' }}
        >
          <h3>Add Session</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.tagsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >
        <div>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Lecturers Name</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{ borderWidth: '2.5px' }}
                    value={lecturerObject}
                    onChange={handleChangeLecturers}
                  >
                    <option value="">Select</option>
                    {lecturersNameObject &&
                    lecturersNameObject.map((lecturers: any) => {
                      return (
                        <option key={lecturers._id} value={lecturers.lecturerName}>
                          {lecturers.lecturerName}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={1}/>
            {/*</Row>*/}
            {/*<Row className="mb-2 justify-content-md-center">*/}
            {/*  <Col xs={0} md={9}/>*/}
            <Col xs={12} md={2}>
              <Button
                style={{ width: '100px', fontSize: '0.9em' }}
                onClick={handleLecturerArray}
              >
                Add Lecturer
              </Button>
            </Col>
          </Row>
          <Row style={{ textAlign: 'left' }}>
            <Col md={5}></Col>
            {/*  <Col xs={2} md={6}>*/}
            <Col md={6} style={{
              marginLeft: '0px',
              marginBottom: '15px'
            }}>
              <Form className="">
                {

                  lecturers.length > 0 && lecturers.map((item, index) => {
                    console.log(item);
                    return (<lable style={{ border: '1px solid white', padding: '10px' }}
                                   key={index}> {item.lecturerRef}  </lable>);
                  })
                }
              </Form>
            </Col>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Subject Name</p>
            </Col>
            <Col xs={2} md={6}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{ borderWidth: '2.5px' }}
                    value={subjectRef}
                    onChange={handleChangeSubjectRef}
                  >
                    <option value="">Select</option>
                    {subjectObject &&
                    subjectObject.map((subjects: any) => {
                      return (
                        <option key={subjects._id} value={subjects.subjectName}>
                          {subjects.subjectName}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Subject Code</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{ borderWidth: '2.5px' }}
                    value={subjectCodeRef}
                    onChange={handleChangeSubjectCodeRef}
                  >
                    <option value="">Select</option>
                    {subjectObject &&
                    subjectObject.map((subjects: any) => {
                      return (
                        <option key={subjects._id} value={subjects.subjectCode}>
                          {subjects.subjectCode}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Tag</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{ borderWidth: '2.5px' }}
                    value={tagRef}
                    onChange={handleChangeTagRef}
                  >
                    <option value="">Select</option>
                    {tagsObject &&
                    tagsObject.tags.map((tags: any) => {
                      return (
                        <option key={tags._id} value={tags.name}>
                          {tags.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Group ID</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{ borderWidth: '2.5px' }}
                    value={groupRef}
                    onChange={handleChangeGroupRef}
                  >
                    <option value="">Select</option>
                    {groupObject &&
                    groupObject.groups.map((groups: any) => {
                      return (
                        <option key={groups._id} value={groups.groupId}>
                          {groups.groupId}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Sub Group ID</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{ borderWidth: '2.5px' }}
                    value={subGroupRef}
                    onChange={handleChangeSubGroupRef}
                  >
                    <option value="">Select</option>
                    {subGroupObject &&
                    subGroupObject.subGroups.map((subGroups: any) => {
                      return (
                        <option key={subGroups._id} value={subGroups.subGroupId}>
                          {subGroups.subGroupId}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Student Count</p>
            </Col>
            <Col xs={2} md={6}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="number"
                    style={{ borderWidth: '2.5px' }}
                    value={studentCount}
                    onChange={handleChangeStudentCount}
                    placeholder="ex:- 60"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Duration</p>
            </Col>
            <Col xs={2} md={6}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    style={{ borderWidth: '2.5px' }}
                    value={duration}
                    onChange={handleChangeDuration}
                    placeholder="ex:-03"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row style={{ textAlign: 'center' }}>
            <Col md={12}>{error && <p className={` ${styles.workingDaysHoursError}`} style={{
              fontSize: '19px',
              textShadow: '1px 0 0 red, -1px 0 0 red, 0 1px 0 red, 0 -1px 0 red, 1px 1px red, -1px -1px 0 red, 1px -1px 0 red, -1px 1px 0 red'
            }}>{error}</p>}</Col>
          </Row>

          <Row className="mb-2 justify-content-md-center">
            <Col xs={0} md={9}/>
            <Col xs={12} md={2}>
              <Button
                style={{ width: '160px', fontSize: '1.3em' }}
                onClick={handleSubmit}
              >
                Add Session
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SessionsAdd;
