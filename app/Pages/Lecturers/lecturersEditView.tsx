/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//import CheckboxGroup from 'react-checkbox-group';
import {Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './lecturers.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setLecturers} from './lecturersSlice';

// noinspection DuplicatedCode
const LecturersEdit: React.FC = () => {
  const {id} = useParams();
  console.log(id);
  const dispatch = useDispatch();
  // const value = useSelector();
  const lecturersStore = useSelector(
    (state: { lecturers: any }) => state.lecturers
  );
  const lecturerSelected = lecturersStore.lecturers.find(
    (item) => item._id === id
  );
  console.log(lecturerSelected);
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(
    false
  );
  const [error, setError] = useState<string | null>(null);

  const [employeeId, setEmployeeId] = useState<string>(
    lecturerSelected.employeeId
  );
  const [lecturerName, setLecturerName] = useState<string>(
    lecturerSelected.lecturerName
  );
  const [faculty, setFaculty] = useState<string>(lecturerSelected.faculty);
  const [department, setDepartment] = useState<string>(
    lecturerSelected.department
  );
  const [center, setCenter] = useState<string>(lecturerSelected.center);
  const [building, setBuilding] = useState<string>(lecturerSelected.building);
  const [level, setLevel] = useState<string>(lecturerSelected.level);
  const [rank, setRank] = useState<string>(lecturerSelected.rank);

  const [lecturersObject, setLecturersObject] = useState<any>(null);
  const [buildingsObject, setBuildingsObject] = useState<any>(null);
  const [centersObject, setCenterObject] = useState<any>(null);
  const [subOptions, setSubOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBuildings = await fetch(
          `${proxy}/buildings/buildings`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseDataBuildings = await responseBuildings.json();
        setBuildingsObject(responseDataBuildings);
        // dispatch(setLecturers(responseDataBuildings.lecturers));
        console.log('111111111111222211111111111');
        console.log(responseDataBuildings);

        if (!responseDataBuildings) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(responseDataBuildings.message);
        }

        const responseCenters = await fetch(
          `${proxy}/centers/centers`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseDataCenters = await responseCenters.json();
        setCenterObject(responseDataCenters);
        // dispatch(setLecturers(responseDataBuildings.lecturers));
        console.log('111111111111222211111111111');
        console.log(responseDataCenters);

        if (!responseDataCenters) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(responseDataCenters.message);
        }

        const response = await fetch(
          `${proxy}/lecturers/lecturers`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
          }
        );

        const responseData = await response.json();
        setLecturersObject(responseData);
        dispatch(setLecturers(responseData));
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

  const renderRedirectToView = () => {
    if (lecturersObject) {
      return <Redirect to={routes.LECTURERS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleSubmit = async () => {
    if (employeeId === '') {
      setError('Please enter an Employee ID !');
      return;
    }
    if (employeeId.length !== 6) {
      setError('Please enter an valied Employee ID !');
      return;
    }
    if (lecturerName === '') {
      setError('Please enter an Employee Name !');
      return;
    }
    setError(null);
    const finalObject = {
      employeeId,
      lecturerName,
      faculty,
      department,
      center,
      building,
      level,
      rank
    };
    finalObject.rank = finalObject.level + '.' + finalObject.employeeId;
    console.log('22222222222222222222222222222222222');
    console.log(finalObject);

    try {
      const response = await fetch(
        `${proxy}/lecturers/lecturers`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({finalObject, id: lecturerSelected._id})
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
      return <Redirect to={routes.LECTURERS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleChangeEmployeeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeId(e.target.value);
  };
  const handleChangeLecturerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLecturerName(e.target.value);
  };
  const handleChangeFaculty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFaculty(e.target.value);
    if (e.target.value === 'Computing') {
      setSubOptions(['IT', 'SE', 'CS', 'ISE']);
    } else if (e.target.value === 'Engineering') {
      setSubOptions(['Civil', 'Electronic', 'Chemical']);
    } else if (e.target.value === 'Business') {
      setSubOptions(['Management', 'Logistic', 'Finance']);
    }
  };
  const handleChangeDepartment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };
  const handleChangeCenter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCenter(e.target.value);
  };
  const handleChangeBuilding = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuilding(e.target.value);
  };
  const handleChangeLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(e.target.value);
  };
  // const handleChangeRank = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setRank(e.target.value);
  // };

  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '100vh'
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
          <h3>Edit Subject</h3>
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
              <p>Employee Id</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={employeeId}
                    onChange={handleChangeEmployeeId}
                    placeholder="ex:- 000001"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Lecturer Name</p>
            </Col>
            <Col xs={2} md={6}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={lecturerName}
                    onChange={handleChangeLecturerName}
                    placeholder="ex:- Kasun"
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Faculty</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={faculty}
                    onChange={handleChangeFaculty}
                  >
                    <option value="">Select</option>
                    <option>Computing</option>
                    <option>Engineering</option>
                    <option>Business</option>
                    <option>Physical</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Department</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={department}
                    onChange={handleChangeDepartment}
                  >
                    <option>Select</option>
                    {
                      subOptions.length > 1 && subOptions.map((item) => (<option>{item}</option>))
                    }

                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Center</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={center}
                    onChange={handleChangeCenter}
                  >
                    <option value="">Select</option>
                    {centersObject &&
                    centersObject.map((centersE: any) => {
                      return (
                        <option
                          key={centersE._id}
                          value={centersE.centerName}
                        >
                          {centersE.centerName}
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
              <p>Building</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={building}
                    onChange={handleChangeBuilding}
                  >
                    <option value="">Select</option>
                    {buildingsObject &&
                    buildingsObject.map((buildingsE: any) => {
                      return (
                        <option
                          key={buildingsE._id}
                          value={buildingsE.buildingName}
                        >
                          {buildingsE.buildingName}
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
              <p>Level</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={level}
                    onChange={handleChangeLevel}
                  >
                    <option value="">Select</option>
                    <option value="1">Professor</option>
                    <option value="2">Assistant Professor</option>
                    <option value="3">Senior Lecturer(HG)</option>
                    <option value="4">Senior Lecturer</option>
                    <option value="5">Lecturer</option>
                    <option value="6">Assistant Lecturer</option>
                    <option value="7">Instructors</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row style={{textAlign: 'center'}}>
            <Col md={12}>{error && <p className={` ${styles.workingDaysHoursError}`} style={{
              fontSize: '19px',
              textShadow: '1px 0 0 red, -1px 0 0 red, 0 1px 0 red, 0 -1px 0 red, 1px 1px red, -1px -1px 0 red, 1px -1px 0 red, -1px 1px 0 red'
            }}>{error}</p>}</Col>
          </Row>
          <Row className="mb-2 justify-content-md-center">
            <Col xs={0} md={9}/>
            <Col xs={12} md={2}>
              <Button
                style={{width: '160px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
                Update Lecturer
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default LecturersEdit;
