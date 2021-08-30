import React from 'react'
import {useDispatch} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import NavBar from '../../components/NavBar/NavBar'
import LecturersLevelStatistics from './lecturers-level-statistics'
import LecturersFacultyStatistics from './lecturers-faculty-statistics'
import LecturersCenterStatistics from './lecturers-center-statistics'
import {setRoomUnavailability, setUnavailableRoom} from '../RoomsUnavailability/rooms-unavailability-slice'
import {setEditingRoom, setEditingRoomId, setEditRoom, setExistingRoom} from '../Rooms/rooms-slice'
import {
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding
} from '../Buildings/buildings-slice'

const LecturersStatisticsPage: React.FC = () => {
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

  return (
    <div style={{
      minWidth: 'max-content',
      marginBottom: '3%'
    }}>
      <NavBar/>
      <Row className='text-center mb-5'>
        <Col xs={12}
             md={12}
             className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>Statistics of Lecturers</h1>
        </Col>
      </Row>
      <div style={{
        marginLeft: '5%',
        marginRight: '5%'
      }}>
        <Row>
          <Col sm='4'>
            <div>
              <LecturersLevelStatistics/>
            </div>
          </Col>
          <Col sm='4'>
            <div>
              <LecturersFacultyStatistics/>
            </div>
          </Col>
          <Col sm='4'>
            <div>
              <LecturersCenterStatistics/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default LecturersStatisticsPage
