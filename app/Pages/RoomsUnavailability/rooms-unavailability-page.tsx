import React from 'react'
import {useDispatch} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import NavBar from '../../components/NavBar/NavBar'
import RoomsUnavailabilityAdd from '../RoomsUnavailability/rooms-unavailability-add'
import RoomsUnavailabilityList from '../RoomsUnavailability/rooms-unavailability-list'
import {setEditingRoom, setEditingRoomId, setEditRoom, setExistingRoom} from '../Rooms/rooms-slice'
import {
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding
} from '../Buildings/buildings-slice'

const RoomsUnavailabilityPage: React.FC = () => {
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
          <h1>Rooms Unavailability</h1>
        </Col>
      </Row>
      <div className='container'>
        <Row>
          <Col sm='4'>
            <div>
              <RoomsUnavailabilityAdd/>
            </div>
          </Col>
          <Col sm='8'>
            <div>
              <RoomsUnavailabilityList/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default RoomsUnavailabilityPage
