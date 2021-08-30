/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Modal, Row, Spinner} from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//import CheckboxGroup from 'react-checkbox-group';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './groups.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setEditGroup, setEditingGroup, setEditingGroupId} from './groupsSlice';
import {proxy} from '../../conf'

//const yearSemList = ['Y1S1', 'Y1S2', 'Y2S1', 'Y2S2', 'Y3S1', 'Y3S2', 'Y4S1', 'Y4S2'];
//const programList = ['SE', 'CS', 'DS', 'IT'];
//const groupNumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//const subGroupNumList = [1, 2];

let errors_: string = ''

// noinspection DuplicatedCode
const GroupsEdit: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();


  // let groupList = useSelector(
  //   (state: {
  //     groups: any
  //   }) => state.groups.groups
  // )

  const editingGroupId = useSelector(
    (state: {
      groups: any
      editingGroupId: string
    }) => state.groups.editingGroupId
  )

  const editingGroup = useSelector(
    (state: {
      groups: any
      editingGroupId: any
    }) => state.groups.editingGroup
  )

  const [groupOne, setGroupOne] = useState<{
    academicYear: number,
    academicSemester: number,
    academicYearAndSemester: string,
    programme: string,
    group: number,
    groupId: string,
    subGroups: any
    availableSubGroup: boolean
  }>({

    academicYear: editingGroup.academicYear,
    academicSemester: editingGroup.academicSemester,
    academicYearAndSemester: editingGroup.academicYearAndSemester,
    programme: editingGroup.programme,
    group: editingGroup.group,
    groupId: editingGroup.groupId,
    subGroups: editingGroup.subGroups,
    availableSubGroup: editingGroup.availableSubGroup
  })


  const [subGroupNumList, setSubGroupNumList] = useState<any>([]);

  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [renderRedirectTo1, setRenderRedirectTo1] = useState<boolean | null>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const [academicYear, setAcademicYear] = useState<number | null>(null);
  const [academicSemester, setAcademicSemester] = useState<number | null>(null);
  const [academicYearAndSemester, setAcademicYearAndSemester] = useState<string>('');
  const [programme, setProgramme] = useState<string>('');
  const [group, setGroup] = useState<number | null>(null);
  const [groupId, setGroupId] = useState<string>('');
  const [availableSubGroup, setAvailableSubGroup] = useState<boolean | null>(false);
  const [subGroups, setSubGroups] = useState<any>([]);

  const [subGrouup, setSubGrouup] = useState<{ subGroup: Number, subGroupId: string }>({});


  const [groupsObject, setGroupsObject] = useState<any>(null);
  const [id, setId] = useState<string>('');


  useEffect(() => {

    setId(editingGroupId);

    getSubGroupNum();


  }, []);

  const renderRedirectToView = () => {
    if (groupsObject) {
      return <Redirect to={routes.GROUPS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  // const setOther = () => {
  //   const year = String(academicYear);
  //   const sem = String(academicSemester);
  //   const pro = String(programme);
  //   const groupforId = group.toString();

  //   const id = 'Y' + year + '.S' + sem + '.' + pro + '.' + groupforId;

  //   setGroupId(id);


  // };


  const getSubGroupNum = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${proxy}/subGroupNums/getSubGroupNums`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      setSubGroupNumList(responseData.subGroupNums);
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

    if (subGrouup.subGroup === null) {
      errors_ = 'Please select values for the sub group.'
      setError(true)
      setLoading(false)

    }


    if (subGrouup.subGroup) {
      setError(false)

      const finalObjectGroup = {
        academicYear: groupOne.academicYear,
        academicSemester: groupOne.academicSemester,
        academicYearAndSemester: groupOne.academicYearAndSemester,
        programme: groupOne.programme,
        group: groupOne.group,
        groupId: groupOne.groupId,
        subGroups: [...groupOne.subGroups, subGrouup],
        availableSubGroup: true
      };

      const finalObjectWithID = {
        groups: finalObjectGroup,
        // eslint-disable-next-line no-underscore-dangle
        id: id
      };
      console.log('22222222222222222222222222222222222');
      console.log(finalObjectGroup);

      try {
        const response = await fetch(
          `${proxy}/groups/editGroups`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalObjectWithID)
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


      const finalObjectSubGroup = {
        academicYear: groupOne.academicYear,
        academicSemester: groupOne.academicSemester,
        academicYearAndSemester: groupOne.academicYearAndSemester,
        programme: groupOne.programme,
        group: groupOne.group,
        groupId: groupOne.groupId,
        subGroup: subGrouup.subGroup,
        subGroupId: subGrouup.subGroupId
      };


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

        dispatch(setEditGroup(false));
        dispatch(setEditingGroupId(''));
        dispatch(setEditingGroup(null));

        // console.log(responseData.userDetails);

        if (!responseData) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err.message);
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


  const handleChangeSubGroups = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    const val = parseInt(e.target.value);
    var year = String(groupOne.academicYear);
    var sem = String(groupOne.academicSemester);
    var pro = String(groupOne.programme);
    var groupforId = groupOne.group.toString();
    var sub = e.target.value;

    if (groupOne.group <= 9) {
      var id = 'Y' + year + '.S' + sem  + '.0' + groupforId + '.' + sub + '(' + pro + ')';
    } else {
      var id = 'Y' + year + '.S' + sem + '.' + groupforId + '.' + sub + '(' + pro + ')';
    }


    setSubGrouup({subGroup: val, subGroupId: id});

  };

  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '100vh'
      }}
    >

      {renderRedirect()}
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
          <h3>Add New Sub Group</h3>
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
                    disabled
                    type="text"

                    style={{borderWidth: '2.5px'}}
                    value={groupOne.academicYearAndSemester}

                  >
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
                    disabled
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={groupOne.programme}

                  >

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
                    disabled
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={groupOne.group}

                  >
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
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
                      <option>{sub.subGroupNum}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}></Col>
          </Row>
          {/* {error && (
              <Row className=" justify-content-md-center">
                <Col xs={12} md={10}>
                  <p className={`text-danger ${styles.workingDaysHoursError}`}>
                    {error}
                  </p>
                </Col>
              </Row>
            )} */}
          <Row className="mt-2 mb-2 justify-content-md-center">
            <Col xs={12} md={2}/>
            <Col xs={3} md={8}>
              <Button
                style={{width: '220px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
                Generate a SubGroup
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

export default GroupsEdit;
