import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import styles from './programs.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setEditingProgram, setEditingProgramId, setEditProgram} from './programsSlice';
import {proxy} from '../../conf'

let errors_: string = ''
const ProgramsEdit: React.FC = () => {
  const dispatch = useDispatch();

  const editingProgramId = useSelector(
    (state: {
      programs: any
      editingProgramId: string
    }) => state.programs.editingProgramId
  );

  const editingProgram = useSelector(
    (state: {
      programs: any
      editingProgramId: any
    }) => state.programs.editingProgram
  );

  const [program, setProgram] = useState<{
    name: string,
    programToken: string
  }>({
    name: editingProgram.name,
    programToken: editingProgram.programToken
  });
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [id, setId] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    setId(editingProgramId);
  }, []);

  const handleSubmit = async () => {

    if (program.name.trim() === '' && program.programToken.trim() === '') {
      errors_ = 'Please enter a value for the programme name and  token.'
      setError(true)
      setLoading(false)

    } else {
      if (program.name.trim() === '') {
        errors_ = 'Please enter a value for the programme  name.'
        setError(true)
        setLoading(false)

      } else if (program.programToken.trim() === '') {
        errors_ = 'Please enter a value for the programme  token.'
        setError(true)
        setLoading(false)

      }
    }

    console.log(id);

    const finalObjectWithID = {
      programs: program,
      id: id
    };

    console.log(finalObjectWithID);


    if (program.name.trim() !== '' && program.programToken.trim() !== '') {
      setError(false)

      try {
        const response = await fetch(
          `${proxy}/programs/editPrograms`,
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
        dispatch(setEditProgram(false));
        dispatch(setEditingProgramId(''));
        dispatch(setEditingProgram(null));
        if (!responseData) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.PROGRAMS_LIST_VIEW}/>;
    }
    return null;
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setProgram({...program, name: e.target.value});
  };

  const handleChangeProgramToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setProgram({...program, programToken: e.target.value});
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
          <h3>Edit Programme</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.programsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >


        <div>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Programme Name</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={program.name}
                    onChange={handleChangeName}
                    placeholder="ex:-Software Engineering"
                  />


                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Short Name for Programme</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">


                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={program.programToken}
                    onChange={handleChangeProgramToken}
                    placeholder="ex:-SE"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}></Col>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={1}/>
            <Col xs={3} md={10}>
              <Button
                style={{width: '160px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
                Edit Programme
              </Button>
            </Col>
            <Col xs={12} md={1}/>
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


export default ProgramsEdit;
