import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import routes from '../../constants/routes.json';
import styles from './groupNums.css';
import {setEditGroupNum, setEditingGroupNum, setEditingGroupNumId} from './groupNumsSlice';
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

const GroupNum = (props: any) => (
  <tr>
    <td>{props.groupNum.groupNum}</td>
    <td>
      <Button onClick={() => {
        props.handleEdit(props.groupNum._id);
      }} style={{width: '160px', fontSize: '1.3em'}}>
        edit
      </Button>
      <Button
        className="ml-4"
        onClick={() => {
          props.handleDelete(props.groupNum._id);
        }}
        variant="outline-danger"
        style={{
          width: '160px',
          fontSize: '1.3em',
          borderWidth: '2px'
        }}>
        <NavLink
          to={routes.GROUPNUMS_LIST_VIEW}
          style={{color: '#fff'}}>
          delete
        </NavLink>
      </Button>
    </td>
  </tr>
);

const GroupNumsListView: React.FC = () => {
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

  const [groupNumsObject, setGroupNumsObject] = useState<any>([]);
  const [renderEdit, setRenderEdit] = useState<boolean | null>(false);

  useEffect(() => {
    fetchData().then(() => {
    });
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${proxy}/groupNums/getGroupNums`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const responseData = await response.json();

      setGroupNumsObject(responseData.groupNums);
      // dispatch(setYearSems(responseData.yearsems));
      // console.log(responseData.yearsems);

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
        `${proxy}/groupNums/deleteGroupNums`,
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

      //fetchData();

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
        `${proxy}/groupNums/getGroupNums/` + id,
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


      dispatch(setEditingGroupNumId(id))
      dispatch(setEditingGroupNum(responseData))
      dispatch(setEditGroupNum(true))

      setRenderEdit(true);

    } catch (errors) {
      const errors_ = errors

      console.log(errors)
    }

  };

  const renderEditTo = () => {
    if (renderEdit) {
      return <Redirect to={routes.GROUPNUMS_EDIT}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const groupNumList = () => {
    return groupNumsObject.map(groupNum => {
      return <GroupNum groupNum={groupNum} handleDelete={handleDelete} handleEdit={handleEdit} key={groupNum._id}/>;
    });
  };

  return (
    <div style={{backgroundColor: '#37474F'}}>
      {renderEditTo()}

      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Group Number List</h3>
        </Col>
      </Row>
      {groupNumsObject && (
        <Container
          className={`mt-2 p-4 ${styles.groupNumsTopWrapper}`}
          style={{
            border: '3px solid white',
            borderRadius: '8px',
            color: 'white'
          }}
        >
          <Row className="mt-3 mb-4 justify-content-md-left">
            <Col xs={12} md={12} className="mt-auto">
              <Button style={{width: '220px', fontSize: '1.2em'}}>
                <NavLink
                  to={routes.GROUPNUMS_ADD}
                  style={{color: '#fff'}}
                >
                  Add New Group Num
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
                className={`${styles.groupNumsViewTable}`}
              >
                <thead className="thead-light">
                <tr>
                  <th>Group Number</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {groupNumList()}
                </tbody>

              </Table>


            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default GroupNumsListView;
