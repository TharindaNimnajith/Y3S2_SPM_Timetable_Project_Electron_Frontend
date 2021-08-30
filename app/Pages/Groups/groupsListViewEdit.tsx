/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import {Link, NavLink, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import NavBar from '../../components/NavBar/NavBar';
import styles from './groups.css';
import routes from '../../constants/routes.json';
import {setEditGroup, setEditingGroup, setEditingGroupId, setGroups} from './groupsSlice';
import {proxy} from '../../conf'


const Group = (props) => (
  <tr>
    <td><Link to={routes.GROUPS_SINGLE_VIEW} onClick={() => {
      props.singleView();
    }}>{props.group.groupId} </Link>
      <Button
        className="ml-4"
        onClick={() => {
          props.handleDelete(props.group._id);
        }}
        variant="outline-danger"
        style={{
          width: '100px',
          fontSize: '0.7em',
          borderWidth: '2px'
        }}
      >
        <NavLink
          to={routes.GROUPS_LIST_VIEW}
          style={{color: '#fff'}}
        >
          delete
        </NavLink>
      </Button>
    </td>

    <td>
      <div>{`${props.group.groupId}.1`}
        <Button
          className="ml-4"
          onClick={() => {
            props.handleDelete(props.group._id);
          }}
          variant="outline-danger"
          style={{
            width: '100px',
            fontSize: '0.7em',
            borderWidth: '2px'
          }}
        >
          <NavLink
            to={routes.GROUPS_LIST_VIEW}
            style={{color: '#fff'}}
          >
            delete
          </NavLink>
        </Button></div>

      <br/>
      <div>{`${props.group.groupId}.2`}
        <Button
          className="ml-4"
          onClick={() => {
            props.handleDelete(props.group._id);
          }}
          variant="outline-danger"
          style={{
            width: '100px',
            fontSize: '0.7em',
            borderWidth: '2px'
          }}
        >
          <NavLink
            to={routes.GROUPS_LIST_VIEW}
            style={{color: '#fff'}}
          >
            delete
          </NavLink>
        </Button></div>

      <br/><br/>
      <div>

        <Button style={{width: '95px', fontSize: '0.9em'}}>
          <NavLink
            to={routes.GROUPS_EDIT}
            style={{color: '#fff'}}
          >
            Add
          </NavLink>
        </Button></div>

    </td>

  </tr>
);


// noinspection DuplicatedCode
const GroupsListViewEdit: React.FC = () => {
  const dispatch = useDispatch();

  const editingGroupId = useSelector(
    (state: {
      groups: any
      editingGroupId: string
    }) => state.groups.editingGroupId
  );

  const editingGroup = useSelector(
    (state: {
      groups: any
      editingGroupId: any
    }) => state.groups.editingGroup
  );

  const [groupsObject, setGroupsObject] = useState<any>([]);

  const [renderEdit, setRenderEdit] = useState<boolean | null>(false);
  const [renderSingle, setRenderSingle] = useState<boolean | null>(false);

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    fetchData();


  });

  console.log('me edit ekata kalin 22222222-------------------------');
  console.log(editingGroup);
  console.log(editingGroupId);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${proxy}/groups/getGroups`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const responseData = await response.json();

      setGroupsObject(responseData.groups);
      dispatch(setGroups(responseData.groups));
      console.log(responseData.groups);

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
        `${proxy}/groups/deleteGroups`,
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
        `${proxy}/groups/getGroups/` + id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }

        }
      );

      const responseData = await response.json();
      setRenderEdit(true);
      console.log('me edit eken passe data-------------------------');
      console.log(responseData);


      dispatch(setEditingGroupId(id));
      dispatch(setEditingGroup(responseData));
      dispatch(setEditGroup(true));

    } catch (errors) {
      const errors_ = errors;

      console.log(errors);
    }

  };

  const singleView = () => {
    console.log('menna single ekata cick kala333333333333333333333333333333333333');
    setRenderSingle(true);

  };

  const singleViewTo = () => {
    if (renderSingle) {
      return <Redirect to={routes.GROUPS_SINGLE_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const renderEditTo = () => {
    if (renderEdit) {
      return <Redirect to={routes.GROUPS_EDIT}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const groupList = () => {
    return groupsObject.map(group => {
      return <Group group={group} handleDelete={handleDelete} handleEdit={handleEdit} singleView={singleView}
                    key={group._id}/>;
    });
  };

  return (
    <div style={{backgroundColor: '#37474F', height: '100vh'}}>
      {renderEditTo()}
      {singleViewTo()}

      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Student Group Details</h3>
        </Col>
      </Row>
      {groupsObject && (
        <Container
          className={`mt-2 p-4 ${styles.groupsTopWrapper}`}
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
                  to={routes.GROUPS_ADD}
                  style={{color: '#fff'}}
                >
                  Add New Group
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
                variant="white"
                className={`${styles.groupsViewTable}`}
              >
                <thead className="thead-light">
                <tr>
                  <th>Group ID</th>
                  <th>Sub Group ID</th>

                </tr>
                </thead>
                <tbody>
                {groupList()}
                </tbody>

              </Table>


            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default GroupsListViewEdit;
