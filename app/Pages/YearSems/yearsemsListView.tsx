import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import routes from '../../constants/routes.json';
import styles from './yearsems.css';
import {setEditingYearSem, setEditingYearSemId, setEditYearSem, setYearSems} from './yearsemsSlice';
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

const YearSem = (props: any) => (
  <tr>
    <td>{props.yearSem.year}</td>
    <td>{props.yearSem.semester}</td>
    <td>{props.yearSem.yearSemToken}</td>
    <td>
      <Button onClick={() => {
        props.handleEdit(props.yearSem._id);
      }} style={{width: '160px', fontSize: '1.3em'}}>
        edit
      </Button>
      <Button
        className="ml-4"
        onClick={() => {
          props.handleDelete(props.yearSem._id);
        }}
        variant="outline-danger"
        style={{
          width: '160px',
          fontSize: '1.3em',
          borderWidth: '2px'
        }}>
        <NavLink
          to={routes.YEARSEMS_LIST_VIEW}
          style={{color: '#fff'}}>
          delete
        </NavLink>
      </Button>
    </td>
  </tr>
);

const YearSemsListView: React.FC = () => {
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

  const [yearSemsObject, setYearSemsObject] = useState<any>([]);
  const [renderEdit, setRenderEdit] = useState<boolean | null>(false);

  useEffect(() => {
    fetchData().then(() => {
    });
  });

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

  const handleDelete = async (id) => {
    console.log(`in handle delete + ${id}`);

    try {
      const response = await fetch(
        `${proxy}/yearSems/deleteYearSems`,
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


    // setTagsObject({
    //   tagsObject: tagsObject.filter(el => el._id !== id)
    // })


    // setTagsObjectDel({
    //   tagsObject: tagsObject.filter(el => el._id !== id)
    // })


  };


  const handleEdit = async (id: string) => {
    console.log(`in handle edit + ${id}`);


    try {
      const response = await fetch(
        `${proxy}/yearSems/getYearSems/` + id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }

        }
      );

      const responseData = await response.json();

      console.log('me edit eken passe data-------------------------');
      console.log(responseData);


      dispatch(setEditingYearSemId(id));
      dispatch(setEditingYearSem(responseData));
      dispatch(setEditYearSem(true));

      setRenderEdit(true);

    } catch (errors) {
      const errors_ = errors;

      console.log(errors);
    }

  };

  const renderEditTo = () => {
    if (renderEdit) {
      return <Redirect to={routes.YEARSEMS_EDIT}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const yearSemList = () => {
    return yearSemsObject.map(yearSem => {
      return <YearSem yearSem={yearSem} handleDelete={handleDelete} handleEdit={handleEdit} key={yearSem._id}/>;
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
          <h3>Academic Year & Semester Details</h3>
        </Col>
      </Row>
      {yearSemsObject && (
        <Container
          className={`mt-2 p-4 ${styles.yearSemsTopWrapper}`}
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
                  to={routes.YEARSEMS_ADD}
                  style={{color: '#fff'}}
                >
                  Add New Year & Sem
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
                className={`${styles.yearSemsViewTable}`}
              >
                <thead className="thead-light">
                <tr>
                  <th>Year</th>
                  <th>Semester</th>
                  <th>Token</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {yearSemList()}
                </tbody>

              </Table>


            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default YearSemsListView;
