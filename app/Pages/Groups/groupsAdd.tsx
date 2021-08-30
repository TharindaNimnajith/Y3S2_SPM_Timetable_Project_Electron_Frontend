/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Modal, Row, Spinner} from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//import CheckboxGroup from 'react-checkbox-group';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './groups.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setGroups} from './groupsSlice';

import {proxy} from '../../conf'
//const yearSemList = ['Y1S1', 'Y1S2', 'Y2S1', 'Y2S2', 'Y3S1', 'Y3S2', 'Y4S1', 'Y4S2'];
//const programList = ['SE', 'CS', 'DS', 'IT'];
//const groupNumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//const subGroupNumList = [1, 2];
let errors_: string = ''


var exist = 0;
// noinspection DuplicatedCode
const GroupsAdd: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();

  const [yearSemList, setYearSemList] = useState<any>([]);
  const [programList, setProgramList] = useState<any>([]);
  const [groupNumList, setGroupNumList] = useState<any>([]);

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [renderRedirectTo1, setRenderRedirectTo1] = useState<boolean | null>(false);
  const [renderRedirectToGro, setRenderRedirectToGro] = useState<boolean | null>(false);


  const [academicYear, setAcademicYear] = useState<number | null>(null);
  const [academicSemester, setAcademicSemester] = useState<number | null>(null);
  const [academicYearAndSemester, setAcademicYearAndSemester] = useState<string>('');
  const [programme, setProgramme] = useState<string>('');
  const [group, setGroup] = useState<number | null>(null);
  const [groupId, setGroupId] = useState<string>('');
  // const [availableSubGroup, setAvailableSubGroup] = useState<boolean | null>(false);
  // const [subGroups, setSubGroups] = useState<any>([]);

  const [subGrouup, setSubGrouup] = useState<{ subGroup: Number, subGroupId: string }>({});


  const [groupsObject, setGroupsObject] = useState<any>(null);

  useEffect(() => {


    // noinspection JSIgnoredPromiseFromCall

    getYearAndSem();
    getProgramme();
    getGroupNum();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${proxy}/groups/getGroups`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const responseData = await response.json();
      setGroupsObject(responseData.groups);
      dispatch(setGroups(responseData.groups));
      console.log(responseData.groups);

      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const renderRedirectToView = () => {
    if (groupsObject) {
      return <Redirect to={routes.GROUPS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };


  const getYearAndSem = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${proxy}/yearSems/getYearSems`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      setYearSemList(responseData.yearsems);
      // await dispatch(setBuildings(responseData));
      setLoading(false);
    } catch (errors) {

      console.log(errors);
    }
  };

  const getProgramme = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${proxy}/programs/getPrograms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      setProgramList(responseData.programs);
      // await dispatch(setBuildings(responseData));
      setLoading(false);
    } catch (errors) {

      console.log(errors);
    }
  };

  const getGroupNum = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${proxy}/groupNums/getGroupNums`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      setGroupNumList(responseData.groupNums);
      // await dispatch(setBuildings(responseData));
      setLoading(false);
    } catch (errors) {

      console.log(errors);
    }
  };

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

  const handleSubmit = async () => {
    console.log("clicked sub group one222222222222222222222222")

    if ((academicYearAndSemester === null) && (programme === null) && (group === null)) {
      errors_ = 'Please select  values for all fields.'
      setError(true)
      setLoading(false)


    } else {
      if (academicYearAndSemester === null) {
        errors_ = 'Please select values for the academic year and semster.'
        setError(true)
        setLoading(false)
        console.log("1 ")

      } else if (programme === null) {
        errors_ = 'Please select  values for the programme.'
        setError(true)
        setLoading(false)

      } else if (group === null) {
        errors_ = 'Please select  values for the group.'
        setError(true)
        setLoading(false)

      }
    }

    if (groupId) {
      setError(false)
      const finalObjectGroup = {
        academicYear,
        academicSemester,
        academicYearAndSemester,
        programme,
        group,
        groupId,
        availableSubGroup: false
      };

      groupsObject.map((rec: any) => {

        if (rec.groupId === groupId) {
          exist = 1;

          console.log("This group is already exists")
          return;
        }


        exist = 0;
      });


      if (exist === 1) {
        handleShow();
      }


      if (exist === 0) {


        try {
          const response = await fetch(
            `${proxy}/groups/create`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(finalObjectGroup)
            }
          );

          const responseData = await response.json();

          console.log(responseData);
          setRenderRedirectToGro(true);


          if (!responseData) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error(responseData.message);
          }
        } catch (err) {
          console.log(err.message);
        }

      }
    }


  };

  const handleSubmitSub = async () => {
    if ((academicYearAndSemester === null) && (programme === null) && (group === null)) {
      errors_ = 'Please select  values for all fields.'
      setError(true)
      setLoading(false)


    } else {
      if (academicYearAndSemester === null) {
        errors_ = 'Please select values for the academic year and semster.'
        setError(true)
        setLoading(false)
        console.log("1 ")

      } else if (programme === null) {
        errors_ = 'Please select  values for the programme.'
        setError(true)
        setLoading(false)

      } else if (group === null) {
        errors_ = 'Please select  values for the group.'
        setError(true)
        setLoading(false)

      }
    }

    if (groupId) {
      setError(false)

      const finalObjectGroup = {
        academicYear,
        academicSemester,
        academicYearAndSemester,
        programme,
        group,
        groupId,
        subGroups: subGrouup,
        availableSubGroup: true
      };

      groupsObject.map((rec: any) => {

        if (rec.groupId === groupId) {
          exist = 1;
          console.log("This group is already exists")
          return;
        }
        exist = 0;
      });


      if (exist === 1) {
        handleShow();
      }


      if (exist === 0) {

        try {
          const response = await fetch(
            `${proxy}/groups/create`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(finalObjectGroup)
            }
          );

          const responseData = await response.json();

          console.log(responseData);
          setRenderRedirectTo(true);


          if (!responseData) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error(responseData.message);
          }
        } catch (err) {
          console.log(err.message);
        }

      }


      const finalObjectSubGroup = {
        academicYear,
        academicSemester,
        academicYearAndSemester,
        programme,
        group,
        groupId,
        subGroup: subGrouup.subGroup,
        subGroupId: subGrouup.subGroupId
      };

      if (exist === 0) {
        try {
          const response = await fetch(
            `${proxy}/subGroups/create`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(finalObjectSubGroup)
            }
          );

          const responseData = await response.json();
          setRenderRedirectTo1(true);


          if (!responseData) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error(responseData.message);
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    }
  };

  const renderRedirect = () => {
    if (renderRedirectTo && renderRedirectTo1) {
      return <Redirect to={routes.GROUPS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const renderRedirectGro = () => {
    if (renderRedirectToGro) {
      return <Redirect to={routes.GROUPS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };
  const handleChangeAcademicYearAndSemester = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    const val = e.target.value;
    setAcademicYearAndSemester(e.target.value);

    if (val === 'Y1S1') {
      setAcademicYear(1);
      setAcademicSemester(1);
    } else if (val === 'Y1S2') {
      setAcademicYear(1);
      setAcademicSemester(2);
    } else if (val === 'Y2S1') {
      setAcademicYear(2);
      setAcademicSemester(1);
    } else if (val === 'Y2S2') {
      setAcademicYear(2);
      setAcademicSemester(2);
    } else if (val === 'Y3S1') {
      setAcademicYear(3);
      setAcademicSemester(1);
    } else if (val === 'Y3S2') {
      setAcademicYear(3);
      setAcademicSemester(2);
    } else if (val === 'Y4S1') {
      setAcademicYear(4);
      setAcademicSemester(1);
    } else if (val === 'Y4S2') {
      setAcademicYear(4);
      setAcademicSemester(2);
    } else {
      setAcademicYear(5);
      setAcademicSemester(5);
    }
  };

  const handleChangeProgramme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setProgramme(e.target.value);
  };

  const handleChangeGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    const val = parseInt(e.target.value);

    setGroup(val);

    const year = String(academicYear);
    const sem = String(academicSemester);
    const pro = String(programme);
    const groupforId = val.toString();

    if (val <= 9) {
      var groId = 'Y' + year + '.S' + sem  + '.0' + groupforId + '(' + pro + ')';
    } else {
      var groId = 'Y' + year + '.S' + sem + '.' + groupforId + '(' + pro + ')';
    }

    // const groId = 'Y' + year + '.S' + sem + '.' + pro + '.0' + groupforId;
    setGroupId(groId);

    var subNum = 1;
    if (val <= 9) {
      var subId = 'Y' + year + '.S' + sem + '.0' + groupforId + '.1' + '(' + pro + ')';
    } else {
      var subId = 'Y' + year + '.S' + sem + '.' + groupforId + '.1' + '(' + pro + ')';
    }


    //var subId = 'Y' + year + '.S' + sem + '.' + pro + '.0' + groupforId + '.1';
    setSubGrouup({subGroup: subNum, subGroupId: subId});


  };

  // const handleChangeSubGroups = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const val = parseInt(e.target.value);
  //   var year = String(academicYear);
  //   var sem = String(academicSemester);
  //   var pro = String(programme);
  //   var groupforId = group.toString();
  //   if (val === 1) {
  //     var id = 'Y' + year + '.S' + sem + '.' + pro + '.' + groupforId + '.01';
  //   } else {
  //     var id = 'Y' + year + '.S' + sem + '.' + pro + '.' + groupforId + '.02';
  //   }


  //   setSubGrouup({subGroup: val, subGroupId: id});
  //   setOther();
  // };

  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '100vh'
      }}
    >

      {renderRedirect()}
      {renderRedirectGro()}
      <NavBar/>
      <Modal show={show}
             onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>This group is already exists</Modal.Body>
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
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Add Student Group</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.groupsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >


        <div>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Academic Year and Semester</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={academicYearAndSemester}
                    onChange={handleChangeAcademicYearAndSemester}
                  >
                    <option>Select</option>
                    {yearSemList?.map((yearSem, index) => (
                      <option>{yearSem.yearSemToken}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Programme</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={programme}
                    onChange={handleChangeProgramme}
                  >
                    <option>Select</option>
                    {programList?.map((program, index) => (
                      <option>{program.programToken}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}></Col>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Group Number</p>
            </Col>
            <Col xs={3} md={3}>


              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={group}
                    onChange={handleChangeGroup}
                  >
                    <option>Select</option>
                    {groupNumList?.map((group, index) => (
                      <option>{group.groupNum}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          {/* <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Sub Group Number</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={subGrouup.subGroup}
                    onChange={handleChangeSubGroups}
                  >
                    <option>Select</option>
                    {subGroupNumList?.map((sub, index) => (
                      <option>{sub}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}></Col>
          </Row>*/}
          {/*error && (
              <Row className=" justify-content-md-center">
                <Col xs={12} md={10}>
                  <p className={`text-danger ${styles.groupsError}`}>
                    {error}
                  </p>
                </Col>
              </Row>
          )*/}
          <Row className="mt-2 mb-2 justify-content-md-center">
            <Col xs={12} md={2}/>
            <Col xs={3} md={4}>
              <Button
                style={{width: '250px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
                Generate a New Group
              </Button>
            </Col>
            <Col xs={3} md={6}>
              <Button
                style={{width: '300px', fontSize: '1.3em'}}
                onClick={handleSubmitSub}
              >
                New Group with Sub Group
              </Button>
            </Col>
            <Col xs={12} md={2}/>
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
  );
};

export default GroupsAdd;
