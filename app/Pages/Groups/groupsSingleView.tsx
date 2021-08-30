import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import styles from './groups.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
//import {setShowingGroup, setShowingGroupId, setShowGroup} from './groupsSlice';

const subGroupNumList = [1, 2];

const GroupsSingleView: React.FC = () => {
  //const dispatch = useDispatch();

  const showingGroupId = useSelector(
    (state: {
      groups: any
      showingGroupId: string
    }) => state.groups.showingGroupId
  )

  const showingGroup = useSelector(
    (state: {
      groups: any
      showingGroupId: any
    }) => state.groups.showingGroup
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

    academicYear: showingGroup.academicYear,
    academicSemester: showingGroup.academicSemester,
    academicYearAndSemester: showingGroup.academicYearAndSemester,
    programme: showingGroup.programme,
    group: showingGroup.group,
    groupId: showingGroup.groupId,
    subGroups: showingGroup.subGroups,
    availableSubGroup: showingGroup.availableSubGroup
  })
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [id, setId] = useState<string>('');
  const [subGrouup, setSubGrouup] = useState<{ subGroup: Number, subGroupId: string }>({});

  useEffect(() => {
    console.log(`#############################3333333+${showingGroupId}`);
  }, []);


  const handleSubmit = async () => {
    setRenderRedirectTo(true)
  }

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.GROUPS_LIST_VIEW}/>;
    }
    return null;
  };


  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '100vh',
        overflow: 'scroll'
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
          <h3>{groupOne.groupId} Group Details</h3>
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
              <p>Academic Year</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    disabled
                    type="text"

                    style={{borderWidth: '2.5px'}}
                    value={groupOne.academicYear}

                  >
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Academic Semester</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    disabled
                    type="text"

                    style={{borderWidth: '2.5px'}}
                    value={groupOne.academicSemester}

                  >
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Academic Year and Semester(Token)</p>
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
            <Col xs={12} md={4} className="mt-auto">
              <p>Group ID</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    disabled
                    type="text"

                    style={{borderWidth: '2.5px'}}
                    value={groupOne.groupId}

                  >
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>All Sub Group ID(s)</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  {groupOne.subGroups?.map((sub, index) => (

                    <Form.Control
                      disabled
                      type="text"

                      value={sub.subGroupId}


                    >


                    </Form.Control>

                  ))}


                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}></Col>
          </Row>

          <Row className="mt-2 mb-2 justify-content-md-center">
            <Col xs={12} md={10}/>
            <Col xs={3} md={2}>
              <Button
                className="pull-right"
                style={{width: '80px', fontSize: '1.0em'}}
                onClick={handleSubmit}
              >
                OK
              </Button>
            </Col>

          </Row>
        </div>

      </Container>
    </div>
  );
};

export default GroupsSingleView;
