/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//import CheckboxGroup from 'react-checkbox-group';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './subjects.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setSubjects} from './subjectsSlice';
import {proxy} from '../../conf'
// noinspection DuplicatedCode
const SubjectsAdd: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();

  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(
    false
  );
  const [error, setError] = useState<string | null>(null);

  const [subjectCode, setSubjectCode] = useState<string>('');
  const [subjectName, setSubjectName] = useState<string>('');
  const [offeredYear, setOfferedYear] = useState<string>('');
  const [offeredSemester, setOfferedSemester] = useState<string>('');
  const [numberOfLectureHours, setNumberOfLectureHours] = useState<string>('');
  const [numberOfTutorialHours, setNumberOfTutorialHours] = useState<string>(
    ''
  );
  const [numberOfLabHours, setNumberOfLabHours] = useState<string>('');
  const [numberOfEvaluationHours, setNumberOfEvaluationHours] = useState<string>('');

  const [subjectsObject, setSubjectsObject] = useState<any>(null);
  const [label, setLabel] = useState<string>('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${proxy}/subjects/subjects`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseData = await response.json();
        setSubjectsObject(responseData.subjects);
        dispatch(setSubjects(responseData.subjects));
        console.log(responseData.subjects);

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
    if (subjectsObject) {
      return <Redirect to={routes.SUBJECTS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleSubmit = async () => {

    if (subjectCode === '') {
      setError('Please enter an Subject Code !');
      return;
    }
    if (subjectName === '') {
      setError('Please enter a Subject Name !');
      return;
    }
    if (numberOfLectureHours === '') {
      setError('Please enter a Number Of Lecture Hours !');
      return;
    }
    if (numberOfTutorialHours === '') {
      setError('Please enter a Number Of Tutorial Hours !');
      return;
    }
    if (numberOfLabHours === '') {
      setError('Please enter a Number Of Lab Hours !');
      return;
    }
    if (numberOfEvaluationHours === '') {
      setError('Please enter a Number Of Evaluation Hours !');
      return;
    }
    setError(null);

    const finalObject = {
      subjectCode,
      subjectName,
      offeredYear,
      offeredSemester,
      numberOfLectureHours,
      numberOfTutorialHours,
      numberOfLabHours,
      numberOfEvaluationHours,
      label
    };

    console.log('22222222222222222222222222222222222');
    console.log(finalObject);

    try {
      const response = await fetch(`http://localhost:5000/subjects/subjects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalObject)
      });

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
      return <Redirect to={routes.SUBJECTS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleChangeSubjectCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectCode(e.target.value);
  };
  const handleChangeSubjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectName(e.target.value);
  };
  const handleChangeOfferedYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfferedYear(e.target.value);
  };
  const handleChangeOfferedSemester = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOfferedSemester(e.target.value);
  };
  const handleChangeNumberOfLectureHours = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfLectureHours(e.target.value);
  };
  const handleChangeNumberOfTutorialHours = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfTutorialHours(e.target.value);
  };
  const handleChangeNumberOfLabHours = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfLabHours(e.target.value);
  };
  const handleChangeNumberOfEvaluationHours = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfEvaluationHours(e.target.value);

    const subject = subjectName;
    const code = subjectCode;

    var id = subject + '(' + code + ')';
    setLabel(id);
  };

  return (
    <div
      style={{
        backgroundColor: '#37474F', height: '100vh'
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
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Add Subject</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 ${styles.tagsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >
        <div>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Subject Code</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={subjectCode}
                    onChange={handleChangeSubjectCode}
                    placeholder="ex:- SE1050"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Subject Name</p>
            </Col>
            <Col xs={2} md={6}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={subjectName}
                    onChange={handleChangeSubjectName}
                    placeholder="ex:- SPM"
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Offered Year</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={offeredYear}
                    onChange={handleChangeOfferedYear}
                  >
                    <option>Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Offered Semester</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={offeredSemester}
                    onChange={handleChangeOfferedSemester}
                  >
                    <option>Select</option>
                    <option>1</option>
                    <option>2</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Number Of Lecture Hours</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="number"
                    style={{borderWidth: '2.5px'}}
                    value={numberOfLectureHours}
                    onChange={handleChangeNumberOfLectureHours}
                    placeholder="ex:- "
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Number Of Tutorial Hours</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="number"
                    style={{borderWidth: '2.5px'}}
                    value={numberOfTutorialHours}
                    onChange={handleChangeNumberOfTutorialHours}
                    placeholder="ex:- "
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Number Of Lab Hours</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="number"
                    style={{borderWidth: '2.5px'}}
                    value={numberOfLabHours}
                    onChange={handleChangeNumberOfLabHours}
                    placeholder="ex:- "
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Number Of Evaluation Hours</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="number"
                    style={{borderWidth: '2.5px'}}
                    value={numberOfEvaluationHours}
                    onChange={handleChangeNumberOfEvaluationHours}
                    placeholder="ex:- "
                  />
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
                Add Subject
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SubjectsAdd;
