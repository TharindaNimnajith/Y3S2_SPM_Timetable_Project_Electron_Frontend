/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import styles from './parallelCategory.css';
import {setRoomUnavailability, setUnavailableRoom} from '../RoomsUnavailability/rooms-unavailability-slice'
import {setEditingRoom, setEditingRoomId, setEditRoom, setExistingRoom} from '../Rooms/rooms-slice'
import {
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding
} from '../Buildings/buildings-slice';

import TwoModuleAdd from './twoModuleAdd.tsx';
import ThreeModuleAdd from './threeModuleAdd.tsx';


const moduleList = [2,3];



const ParallelCategoryPage: React.FC = () => {
  const dispatch = useDispatch();

  dispatch(setEditRoom(false))
  dispatch(setEditingRoomId(''))
  dispatch(setEditingRoom(null))
  dispatch(setExistingRoom(false))

  dispatch(setEditBuilding(false))
  dispatch(setEditingBuildingId(''))
  dispatch(setEditingBuilding(null))
  dispatch(setExistingBuilding(false))
  dispatch(setExistingRoomsForBuilding(false))

  dispatch(setRoomUnavailability(false))
  dispatch(setUnavailableRoom(null))


  const [two, setTwo] =useState<boolean | null>(false);
  const [three, setThree] =useState<boolean | null>(false);



  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(
    false
  );

  const [module, setModule] = useState<string>('');




  const handleModule = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setModule(e.target.value);
    var count = parseInt(e.target.value);


    if(count === 2){

      setTwo(true);
      setThree(false);
    }
    if(count === 3){

      setTwo(false);
      setThree(true);
    }




  };





  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.TAGS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };



  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '120vh'
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
          <h3>Add Module for Category</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5  ${styles.parallelCategorysTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >
        <Row className="mt-2 mb-3 justify-content-md-center">
        <Col xs={12} md={4} className="mt-auto">
              <p>Number of Modules</p>
            </Col>
            <Col xs={3} md={4}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={module}
                    onChange={handleModule}
                  >
                    <option>Select</option>
                    {moduleList?.map((module, index) => (
                      <option>{module}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={2}/>
        </Row>



        {two && (
            <TwoModuleAdd/>
        )
        }

        {three && (
            <ThreeModuleAdd/>
        )
        }

      </Container>
    </div>
  );
};

export default ParallelCategoryPage;
