import React from 'react'
import {useDispatch} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import NavBar from '../../components/NavBar/NavBar'
import StudentsYearStatistics from './students-year-statistics'
import StudentsYearSemesterStatistics from './students-year-semester-statistics'
import StudentsYearSemesterProgrammeStatistics from './students-year-semester-programme-statistics'
import {setRoomUnavailability, setUnavailableRoom} from '../RoomsUnavailability/rooms-unavailability-slice'
import {setEditingRoom, setEditingRoomId, setEditRoom, setExistingRoom} from '../Rooms/rooms-slice'
import {
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding
} from '../Buildings/buildings-slice'

const StudentsStatisticsPage: React.FC = () => {
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
          <h1>Statistics of Students</h1>
        </Col>
      </Row>
      <div style={{
        marginLeft: '5%',
        marginRight: '5%'
      }}>
        <Row>
          <Col sm='8'>
            <div>
              <StudentsYearStatistics/>
            </div>
            <div style={{
              marginTop: '40px'
            }}>
              <StudentsYearSemesterStatistics/>
            </div>
          </Col>
          <Col sm='4'>
            <div>
              <StudentsYearSemesterProgrammeStatistics/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default StudentsStatisticsPage
