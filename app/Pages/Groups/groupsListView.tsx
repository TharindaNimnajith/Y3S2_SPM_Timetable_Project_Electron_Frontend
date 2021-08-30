import React, {useEffect, useState} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {Button, Col, Container, Row, Table} from 'react-bootstrap'
import NavBar from '../../components/NavBar/NavBar'
import routes from '../../constants/routes.json'
import styles from './groups.css'
import {
  setEditGroup,
  setEditingGroup,
  setEditingGroupId,
  setGroups,
  setShowGroup,
  setShowingGroup,
  setShowingGroupId,
  setShowingSubGroup,
  setShowingSubGroupId,
  setShowSubGroup
} from './groupsSlice'
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

let res: any

const Group = (props: any) => (
  <tr>
    <td>
      <Button
        onClick={() => {
          props.handleDisplaySingleGroup(props.group._id)
        }}
        variant='outline-light'
        style={{
          width: '100px',
          fontSize: '0.9em',
          borderWidth: '0px'
        }}>
        {props.group.groupId}
      </Button>
      <Button className='ml-4'
              onClick={() => {
                props.handleDelete(props.group._id, props.group.groupId)
              }}
              variant='outline-danger'
              style={{
                width: '100px',
                fontSize: '0.7em',
                borderWidth: '2px'
              }}>
        <NavLink to={routes.GROUPS_LIST_VIEW}
                 style={{
                   color: '#fff'
                 }}>
          delete
        </NavLink>
      </Button>
    </td>
    <td>
      {
        props.group.subGroups && props.group.subGroups.map((sub: any) => {
          return (
            <div>
              <Button onClick={() => {
                props.handleDisplaySingleSubGroup(props.group._id, sub._id)
              }}
                      variant='outline-light'
                      style={{
                        width: '100px',
                        fontSize: '0.9em',
                        borderWidth: '0px'
                      }}>
                {sub.subGroupId}
              </Button>
              <Button className='ml-4'
                      onClick={() => {
                        props.handleDeleteSub(sub._id, sub.subGroupId)
                      }}
                      variant='outline-danger'
                      style={{
                        width: '100px',
                        fontSize: '0.7em',
                        borderWidth: '2px'
                      }}>
                <NavLink to={routes.GROUPS_LIST_VIEW}
                         style={{
                           color: '#fff'
                         }}>
                  delete
                </NavLink>
              </Button>
            </div>
          )
        })
      }
      <br/>
      <br/>
      <div>
        <Button
          onClick={() => {
            props.handleAddSub(props.group._id)
          }}
          style={{
            width: '95px',
            fontSize: '0.9em'
          }}>
          Add
        </Button>
      </div>
    </td>
  </tr>
)

const GroupsListView: React.FC = () => {
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

  const [groupsObject, setGroupsObject] = useState<any>([])
  const [renderEdit, setRenderEdit] = useState<boolean | null>(false)
  const [renderSingle, setRenderSingle] = useState<boolean | null>(false)
  const [renderSingleSub, setRenderSingleSub] = useState<boolean | null>(false)

  useEffect(() => {
    fetchData().then(() => {
    })
  })

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
      )
      const responseData = await response.json()
      setGroupsObject(responseData.groups)
      await dispatch(setGroups(responseData.groups))
      if (!responseData) {
        throw new Error(responseData.message)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleDelete = async (id: any, groupId: any) => {
    try {
      const response = await fetch(
        `${proxy}/groups/deleteGroups`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'id': id, 'groupId': groupId})
        }
      )
      const responseData = await response.json()
      await fetchData()
      if (!responseData) {
        throw new Error(responseData.message)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleDeleteSub = async (id: any, subId: any) => {
    try {
      const response = await fetch(
        `${proxy}/groups/deleteSubGroupUpdate`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'subKey': id, 'subId': subId})
        }
      )
      const responseData = await response.json()
      await fetchData()
      if (!responseData) {
        throw new Error(responseData.message)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleDisplaySingleGroup = async (id: string) => {
    await dispatch(setShowGroup(true))
    try {
      const response = await fetch(
        `${proxy}/groups/getGroups/` + id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const responseData = await response.json()
      await dispatch(setShowingGroupId(id))
      await dispatch(setShowingGroup(responseData))
      setRenderSingle(true)
    } catch (errors) {
      console.log(errors)
    }
  }

  const handleDisplaySingleSubGroup = async (id: string, subid: string) => {
    await dispatch(setShowSubGroup(true))
    try {
      const response = await fetch(
        `${proxy}/groups/getGroups/` + id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const responseData = await response.json()
      responseData.subGroups.map((sub: any) => {
        if (sub._id === subid) {
          res = sub
        }
      })
      await dispatch(setShowingSubGroupId(subid))
      await dispatch(setShowingGroup(responseData))
      await dispatch(setShowingSubGroup(res))
      setRenderSingleSub(true)
    } catch (errors) {
      console.log(errors)
    }
  }

  const handleAddSub = async (id: string) => {
    await dispatch(setEditGroup(true))
    try {
      const response = await fetch(
        `${proxy}/groups/getGroups/` + id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const responseData = await response.json()
      await dispatch(setEditingGroupId(id))
      await dispatch(setEditingGroup(responseData))
      setRenderEdit(true)
    } catch (errors) {
      console.log(errors)
    }
  }

  const renderEditTo = () => {
    if (renderEdit) {
      return <Redirect to={routes.GROUPS_EDIT}/>
    }
    return null
  }

  const renderSingleTo = () => {
    if (renderSingle) {
      return <Redirect to={routes.GROUPS_SINGLE_VIEW}/>
    }
    return null
  }

  const renderSingleSubTo = () => {
    if (renderSingleSub) {
      return <Redirect to={routes.GROUPS_SINGLE_SUB_VIEW}/>
    }
    return null
  }

  const groupList = () => {
    return groupsObject.map((group: { _id: any }) => {
      return <Group group={group}
                    handleDelete={handleDelete}
                    handleDeleteSub={handleDeleteSub}
                    handleAddSub={handleAddSub}
                    handleDisplaySingleGroup={handleDisplaySingleGroup}
                    handleDisplaySingleSubGroup={handleDisplaySingleSubGroup}
                    key={group._id}/>
    })
  }

  return (
    <div style={{
      backgroundColor: '#37474F'
    }}>
      {renderEditTo()}
      {renderSingleTo()}
      {renderSingleSubTo()}
      <NavBar/>
      <Row className='text-center mb-5'>
        <Col xs={12}
             md={12}
             className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h3>Student Group Details</h3>
        </Col>
      </Row>
      {groupsObject && (
        <Container className={`mt-2 p-4 ${styles.groupsTopWrapper}`}
                   style={{
                     border: '3px solid white',
                     borderRadius: '8px',
                     color: 'white'
                   }}>
          <Row className='mt-3 mb-4 justify-content-md-left'>
            <Col xs={12}
                 md={12}
                 className='mt-auto'>
              <Button style={{
                width: '160px',
                fontSize: '1.2em'
              }}>
                <NavLink to={routes.GROUPS_ADD}
                         style={{color: '#fff'}}>
                  Add New Group
                </NavLink>
              </Button>
            </Col>
          </Row>
          <Row className='mt-3 mb-4 justify-content-md-center'>
            <Col xs={12} md={12} className='mt-auto'>
              <Table striped
                     bordered
                     hover
                     variant='white'
                     className={`${styles.groupsViewTable}`}>
                <thead className='thead-light'>
                <tr>
                  <th>Group ID</th>
                  <th>Sub Group ID</th>
                </tr>
                </thead>
                <tbody>
                {
                  groupList()
                }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default GroupsListView
