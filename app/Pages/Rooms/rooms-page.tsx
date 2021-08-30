import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import NavBar from '../../components/NavBar/NavBar'
import RoomsList from './rooms-list'
import RoomsEdit from './rooms-edit'
import RoomsAdd from './rooms-add'
import {setRoomUnavailability, setUnavailableRoom} from '../RoomsUnavailability/rooms-unavailability-slice'
import {
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding
} from '../Buildings/buildings-slice'

const RoomsPage: React.FC = () => {
  const dispatch = useDispatch()

  dispatch(setEditBuilding(false))
  dispatch(setEditingBuildingId(''))
  dispatch(setEditingBuilding(null))
  dispatch(setExistingBuilding(false))
  dispatch(setExistingRoomsForBuilding(false))

  dispatch(setRoomUnavailability(false))
  dispatch(setUnavailableRoom(null))

  let route: any

  const editRoom = useSelector(
    (state: {
      rooms: any
      editRoom: boolean
    }) => state.rooms.editRoom
  )

  if (editRoom)
    route = (<RoomsEdit/>)
  else
    route = (<RoomsAdd/>)

  return (
    <div style={{
      minWidth: 'max-content',
      overflowX: 'hidden',
      marginBottom: '3%'
    }}>
      <NavBar/>
      <Row className='text-center mb-5'>
        <Col className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>Rooms</h1>
        </Col>
      </Row>
      <div className='container'>
        <Row>
          <Col sm='4'
               style={{
                 marginTop: '115px'
               }}>
            <div>
              {
                route
              }
            </div>
          </Col>
          <Col sm='8'>
            <div>
              <RoomsList/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default RoomsPage
