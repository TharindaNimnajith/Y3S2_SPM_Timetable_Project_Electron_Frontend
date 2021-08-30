import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import routes from '../../constants/routes.json';
import styles from './subGroupNums.css';
import {setEditingSubGroupNum, setEditingSubGroupNumId, setEditSubGroupNum, setSubGroupNums} from './subGroupNumsSlice';
import {setRoomUnavailability, setUnavailableRoom} from '../RoomsUnavailability/rooms-unavailability-slice'
import {setEditingRoom, setEditingRoomId, setEditRoom, setExistingRoom} from '../Rooms/rooms-slice'
import {
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding
} from '../Buildings/buildings-slice'
import {proxy} from '../../conf'

const SubGroupNum = (props: any) => (
  <tr>
    <td>{props.subGroupNum.subGroupNum}</td>
    <td>
      <Button onClick={() => {
        props.handleEdit(props.subGroupNum._id);
      }} style={{width: '160px', fontSize: '1.3em'}}>
        edit
      </Button>
      <Button
        className="ml-4"
        onClick={() => {
          props.handleDelete(props.subGroupNum._id);
        }}
        variant="outline-danger"
        style={{
          width: '160px',
          fontSize: '1.3em',
          borderWidth: '2px'
        }}>
        <NavLink
          to={routes.SUBGROUPNUMS_LIST_VIEW}
          style={{color: '#fff'}}>
          delete
        </NavLink>
      </Button>
    </td>
  </tr>
);

const SubGroupNumsListView: React.FC = () => {
  const dispatch = useDispatch()

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

  const [subGroupNumsObject, setSubGroupNumsObject] = useState<any>([]);
  const [renderEdit, setRenderEdit] = useState<boolean | null>(false);

  useEffect(() => {
    fetchData().then(() => {
    });
    console.log('menne sub group eke ************************');
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${proxy}/subGroupNums/getSubGroupNums`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const responseData = await response.json();

      setSubGroupNumsObject(responseData.subGroupNums);
      dispatch(setSubGroupNums(responseData.subGroupNums));
      console.log(responseData.subGroupNums);

      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    console.log(`in handle delete + ${id}`);

    try {
      const response = await fetch(
        `${proxy}/subGroupNums/deleteSubGroupNums`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id})
        }
      );

      const responseData = await response.json();
      // console.log(responseData.userDetails);
      //setRenderRedirectTo(true);

      fetchData();

      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }


  };


  const handleEdit = async (id: string) => {
    console.log(`in handle edit + ${id}`);

    try {
      const response = await fetch(
        `${proxy}/subGroupNums/getSubGroupNums/` + id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },

        }
      );

      const responseData = await response.json()

      console.log("me edit eken passe data-------------------------");
      console.log(responseData);


      dispatch(setEditingSubGroupNumId(id))
      dispatch(setEditingSubGroupNum(responseData))
      dispatch(setEditSubGroupNum(true))

      setRenderEdit(true);

    } catch (errors) {
      const errors_ = errors

      console.log(errors)
    }

  };

  const renderEditTo = () => {
    if (renderEdit) {
      return <Redirect to={routes.SUBGROUPNUMS_EDIT}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const subGroupNumList = () => {
    return subGroupNumsObject.map(subGroupNum => {
      return <SubGroupNum subGroupNum={subGroupNum} handleDelete={handleDelete} handleEdit={handleEdit}
                          key={subGroupNum._id}/>;
    });
  };

  return (
    <div style={{backgroundColor: '#37474F', height: '100vh'}}>
      {renderEditTo()}

      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>SubGroup Number List</h3>
        </Col>
      </Row>
      {subGroupNumsObject && (
        <Container
          className={`mt-2 p-4 ${styles.subGroupNumsTopWrapper}`}
          style={{
            border: '3px solid white',
            borderRadius: '8px',
            color: 'white'
          }}
        >
          <Row className="mt-3 mb-4 justify-content-md-left">
            <Col xs={12} md={12} className="mt-auto">
              <Button style={{width: '240px', fontSize: '1.2em'}}>
                <NavLink
                  to={routes.SUBGROUPNUMS_ADD}
                  style={{color: '#fff'}}
                >
                  Add New SubGroup Num
                </NavLink>
              </Button>
            </Col>
          </Row>
          <Row className="mt-3 mb-4 justify-content-md-center">
            <Col xs={12} md={12} className="mt-auto">
              <Table
                striped
                bordered
                hover
                variant="dark"
                className={`${styles.subGroupNumsViewTable}`}
              >
                <thead className="thead-light">
                <tr>
                  <th>SubGroup Number</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {subGroupNumList()}
                </tbody>

              </Table>


            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default SubGroupNumsListView;
