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
import styles from './parallelCategory.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setParallelCategorys} from './parallelCategorySlice';
import {proxy} from '../../conf';


let errors_: string = ''


var exist = 0;
// noinspection DuplicatedCode
const ThreeModuleAdd: React.FC = () => {

  const [module1List, setModule1List] = useState<any>([]);
  const [module2List, setModule2List] = useState<any>([]);
  const [module3List, setModule3List] = useState<any>([]);


  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [renderRedirectTo1, setRenderRedirectTo1] = useState<boolean | null>(false);
  const [renderRedirectTo2, setRenderRedirectTo2] = useState<boolean | null>(false);
  const [renderRedirectToGro, setRenderRedirectToGro] = useState<boolean | null>(false);

  const [category1, setCategory1] = useState<boolean | null>(false);
  const [category2, setCategory2] = useState<boolean | null>(false);
  const [category3, setCategory3] = useState<boolean | null>(false);

  const [id1, setId1] = useState<string>('');

  const [id2, setId2] = useState<string>('');
  const [id3, setId3] = useState<string>('');

  const [subjectName1,setSubjectName1] = useState<number | null>(null);
  const [subjectName2,setSubjectName2] = useState<number | null>(null);
  const [subjectName3,setSubjectName3] = useState<number | null>(null);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday', 'Sunday'];

  const durationList = [1, 2, 3];
  const [categoryCount, setCategoryCount] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');




  const [modulesObject, setModulesObject] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

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
      setModulesObject(responseData);
      setModule1List(responseData);
      setModule2List(responseData);
      setModule3List(responseData);

      console.log(responseData);

      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
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

    var cid = ('('+String(subjectName1) + ','+ String(subjectName2)+ ','+ String(subjectName3)+')');
    console.log(cid);



    if ((id1.trim() === '') && (id2.trim() === '') && (id3.trim() === '')) {
      errors_ = 'Please select  values for all fields.'
      setError(true)
      setLoading(false)


    } else {
      if (id1.trim() === '') {
        errors_ = 'Please select module1 .'
        setError(true)
        setLoading(false)
        console.log("1 ")

      } else if (id2.trim() === '') {
        errors_ = 'Please select module2.'
        setError(true)
        setLoading(false)

      }else if (id3.trim() === '') {
        errors_ = 'Please select module3.'
        setError(true)
        setLoading(false)

      }

    }


        if (category1 || category2 || category3) {
          exist = 1;
        }

        else{
          exist = 0;
        }

      if (exist === 1) {
        handleShow();
      }


    if ((id1.trim() != '') && (id2.trim() != '') && (id3.trim() != '')&&(category1=== false) && (category2=== false)&& (category3=== false)) {
      const finalObjectGroup = {
      category : cid,
      categoryCount : 3
      };

      console.log(finalObjectGroup);
      try {

        const response = await fetch(`${proxy}/subjects/addCategory/` + id1, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObjectGroup)
        })
        const responseData = await response.json()
        console.log(responseData)
        setRenderRedirectTo(true);

      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }

      try {

        const response = await fetch(`${proxy}/subjects/addCategory/` + id2, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObjectGroup)
        })
        const responseData = await response.json()
        console.log(responseData)
        setRenderRedirectTo1(true);

      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }
      try {

        const response = await fetch(`${proxy}/subjects/addCategory/` + id3, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObjectGroup)
        })
        const responseData = await response.json()
        console.log(responseData)
        setRenderRedirectTo2(true);

      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }
    }


  };


  const renderRedirect = () => {
    if (renderRedirectTo && renderRedirectTo1 && renderRedirectTo2) {
      return <Redirect to={routes.SUBJECTS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };


  const handleModule1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)

    setId1(e.target.value);
    setCategory1(false);
    getModule1(e.target.value);


  };

  const handleModule2 = (e: React.ChangeEvent<HTMLInputElement>) => {

    setError(false)
    setId2(e.target.value);
    setCategory2(false);
    getModule2(e.target.value);

  };

  const handleModule3 = (e: React.ChangeEvent<HTMLInputElement>) => {

    setError(false)
    setId3(e.target.value);
    setCategory3(false);
    getModule3(e.target.value);

  };





  const getModule1 = async (id: string) => {
    console.log(id);
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/subjects/subjects1/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setSubjectName1(responseData.subjectName);


      if(responseData.category){
        setCategory1(true);
      }


      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const getModule2 = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/subjects/subjects1/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setSubjectName2(responseData.subjectName);

      if(responseData.category){
        setCategory2(true);
      }

      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const getModule3 = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/subjects/subjects1/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setSubjectName3(responseData.subjectName);

      if(responseData.category){
        setCategory3(true);
      }

      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }
  return (
    <div
      style={{
        backgroundColor: '#37474F',

      }}
    >

      {renderRedirect()}


      <Modal show={show}
             onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Some modules already added to a category</Modal.Body>
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
              <p>Select Module1</p>
            </Col>
            <Col xs={3} md={4}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={id1}
                    onChange={handleModule1}
                  >
                    <option>Select</option>
                    {module1List?.map((module, index) => (
                      <option value={module._id}>{module.offeredYear}.{module.offeredSemester}-{module.subjectName}({module.subjectCode})</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={2}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Select Module2</p>
            </Col>
            <Col xs={3} md={4}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={id2}
                    onChange={handleModule2}
                  >
                    <option>Select</option>
                    {module2List?.map((module, index) => (
                      <option value={module._id}>{module.offeredYear}.{module.offeredSemester}-{module.subjectName}({module.subjectCode})</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={2}></Col>
          </Row>

          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Select Module3</p>
            </Col>
            <Col xs={3} md={4}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={id3}
                    onChange={handleModule3}
                  >
                    <option>Select</option>
                    {module3List?.map((module, index) => (
                      <option value={module._id}>{module.offeredYear}.{module.offeredSemester}-{module.subjectName}({module.subjectCode})</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={2}/>
          </Row>



          <Row className="mt-2 mb-2 justify-content-md-center">
            <Col xs={12} md={2}/>
            <Col xs={3} md={6}>
              <Button
                style={{width: '170px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
                Create Category
              </Button>
            </Col>

            <Col xs={12} md={4}/>
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

export default ThreeModuleAdd;
