import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import routes from '../../constants/routes.json';
import styles from './tags.css';
import {setEditingTag, setEditingTagId, setEditTag, setTags} from './tagsSlice';
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

const Tag = (props: any) => (
  <tr>
    <td>{props.tag.name}</td>
    <td>{props.tag.tagToken}</td>
    <td>
      <Button onClick={() => {
        props.handleEdit(props.tag._id);
      }} style={{width: '160px', fontSize: '1.3em'}}>
        edit
      </Button>
      <Button
        className="ml-4"
        onClick={() => {
          props.handleDelete(props.tag._id);
        }}
        variant="outline-danger"
        style={{
          width: '160px',
          fontSize: '1.3em',
          borderWidth: '2px'
        }}>
        <NavLink
          to={routes.TAGS_LIST_VIEW}
          style={{color: '#fff'}}>
          delete
        </NavLink>
      </Button>
    </td>
  </tr>
);

const TagsListView: React.FC = () => {
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

  const editingTagId = useSelector(
    (state: {
      tags: any
      editingTagId: string
    }) => state.tags.editingTagId
  );

  const editingTag = useSelector(
    (state: {
      tags: any
      editingTagId: any
    }) => state.tags.editingTag
  );

  const [tagsObject, setTagsObject] = useState<any>([]);
  const [renderEdit, setRenderEdit] = useState<boolean | null>(false);

  useEffect(() => {
    fetchData().then(() => {
    });
  });

  console.log('me edit ekata kalin 22222222-------------------------');
  console.log(editingTag);
  console.log(editingTagId);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${proxy}/tags/getTags`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const responseData = await response.json();
      setTagsObject(responseData.tags);
      dispatch(setTags(responseData.tags));
      console.log(responseData.tags);
      if (!responseData) {
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
        `${proxy}/tags/deleteTags`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id})
        }
      );
      const responseData = await response.json();
      fetchData();
      if (!responseData) {
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
        `http://localhost:5000/tags/getTags/` + id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const responseData = await response.json();
      await dispatch(setEditingTagId(id));
      await dispatch(setEditingTag(responseData));
      await dispatch(setEditTag(true));
      setRenderEdit(true);
      console.log('me edit eken passe data-------------------------');
      console.log(responseData);
    } catch (errors) {
      const errors_ = errors;
      console.log(errors);
    }
  };

  const renderEditTo = () => {
    if (renderEdit) {
      return <Redirect to={routes.TAGS_EDIT}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const tagList = () => {
    return tagsObject.map(tag => {
      return <Tag tag={tag} handleDelete={handleDelete} handleEdit={handleEdit} key={tag._id}/>;
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
          <h3>Tag Details</h3>
        </Col>
      </Row>
      {tagsObject && (
        <Container
          className={`mt-2 p-4 ${styles.tagsTopWrapper}`}
          style={{
            border: '3px solid white',
            borderRadius: '8px',
            color: 'white'
          }}
        >
          <Row className="mt-3 mb-4 justify-content-md-left">
            <Col xs={12} md={12} className="mt-auto">
              <Button style={{width: '160px', fontSize: '1.2em'}}>
                <NavLink
                  to={routes.TAGS_ADD}
                  style={{color: '#fff'}}
                >
                  Add New Tag
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
                className={`${styles.tagsViewTable}`}
              >
                <thead className="thead-light">
                <tr>
                  <th>Real Name</th>
                  <th>Tag Name</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tagList()}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default TagsListView;
