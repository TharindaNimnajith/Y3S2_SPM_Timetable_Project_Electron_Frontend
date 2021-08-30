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
import styles from './yearsems.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setYearSems} from './yearsemsSlice';
import {proxy} from '../../conf'


const yearList = [1, 2, 3, 4];
const semesterList = [1, 2];
let errors_: string = ''
// noinspection DuplicatedCode
const YearSemsAdd: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();


  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);

  const [year, setYear] = useState<number | null>(null);
  const [semester, setSemester] = useState<number | null>(null);
  const [yearSemToken, setYearSemToken] = useState<string>('');

  const [yearsemsObject, setYearSemsObject] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${proxy}/yearSems/getYearSems`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseData = await response.json();
        setYearSemsObject(responseData.yearsems);
        dispatch(setYearSems(responseData.yearsems));
        console.log(responseData.yearsems);

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


  // const renderRedirectToView = () => {

  //   if (yearsemsObject != null) {
  //     return <Redirect to={routes.YEARSEMS_LIST_VIEW}/>;
  //     //   props.history.push(loginState.redirectTo);s
  //   }
  //   return null;
  // };


  const handleSubmit = async () => {


    if ((year === null) && (semester === null)) {
      errors_ = 'Please select  values for the year and semester.'
      setError(true)
      setLoading(false)
      console.log("1 2")

    } else {
      if (year === null) {
        errors_ = 'Please select values for the year.'
        setError(true)
        setLoading(false)
        console.log("1 ")

      } else if (semester === null) {
        errors_ = 'Please select  values for the semester.'
        setError(true)
        setLoading(false)
        console.log(" 2")
      }
    }

    const finalObject = {
      year,
      semester,
      yearSemToken

    };

    console.log('22222222222222222222222222222222222');
    console.log(finalObject);

    if (yearSemToken) {
      setError(false)
      try {
        const response = await fetch(
          `${proxy}/yearSems/create`,
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

    }
  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.YEARSEMS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    const val = parseInt(e.target.value);
    //setYear(val);
    setYear(e.target.value);
  };

  const handleChangeSemester = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    const val = parseInt(e.target.value);
    const year1 = year.toString();
    setSemester(e.target.value);


    var id = 'Y' + year1 + 'S' + val;


    setYearSemToken(id);
    setSemester(val);

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
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Add Academic Year & Semester</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.yearsemsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >


        <div>

          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Year</p>
            </Col>

            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={year}
                    onChange={handleChangeYear}
                  >
                    <option>Select</option>
                    {yearList?.map((group, index) => (
                      <option>{group}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Semester</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={semester}
                    onChange={handleChangeSemester}
                  >
                    <option>Select</option>
                    {semesterList?.map((sem, index) => (
                      <option>{sem}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}></Col>
          </Row>
          <Row className="mt-2 mb-2 justify-content-md-center">
            <Col xs={12} md={2}/>
            <Col xs={3} md={8}>
              <Button
                style={{width: '200px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
                Add Year & Sem
              </Button>
            </Col>
          </Row>
          <Col xs={12} md={2}/>
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

export default YearSemsAdd;
