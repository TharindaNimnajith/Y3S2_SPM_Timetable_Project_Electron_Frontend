import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Modal, Spinner, Table} from 'react-bootstrap'
import {FaTrashAlt} from 'react-icons/fa'
import {proxy} from '../../conf'
import {setExistingRoom, setRooms} from '../Rooms/rooms-slice'
import {setUnavailableRoom} from './rooms-unavailability-slice'

let errors_: string = ''

const RoomsUnavailabilityList: React.FC = () => {
  const dispatch = useDispatch()

  let roomList = useSelector(
    (state: {
      rooms: any
    }) => state.rooms.rooms
  )

  let unavailableRoom = useSelector(
    (state: {
      roomsUnavailability: any
      unavailableRoom: any
    }) => state.roomsUnavailability.unavailableRoom
  )

  let roomUnavailability = useSelector(
    (state: {
      roomsUnavailability: any
      roomUnavailability: boolean
    }) => state.roomsUnavailability.roomUnavailability
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [unavailabilityId, setUnavailabilityId] = useState<string>('')
  const [unavailableRoomObject, setUnavailableRoomObject] = useState<any>(null)

  useEffect(() => {
    setUnavailableRoomObject(unavailableRoom)
  }, [unavailableRoom])

  const handleClose = () => {
    setLoading(true)
    setShow(false)
    setLoading(false)
  }

  const handleDelete = () => {
    setLoading(true)
    deleteRoomUnavailability(unavailabilityId).then(() => setShow(false))
    setLoading(false)
  }

  const handleShow = (unavailabilityId: string) => {
    setLoading(true)
    setShow(true)
    setUnavailabilityId(unavailabilityId)
    setLoading(false)
  }

  const deleteRoomUnavailability = async (unavailabilityId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/unavailableRooms/unavailableRooms/`
        + unavailableRoomObject._id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          unavailabilityId
        })
      })
      await response.json()
      let unavailableTimes = []
      unavailableTimes.push(...unavailableRoomObject.unavailability)
      unavailableTimes = unavailableTimes.filter((unavailableTime: any) => unavailableTime._id !== unavailabilityId)
      let room = {...unavailableRoomObject, unavailability: unavailableTimes}
      await dispatch(setUnavailableRoom(room))
      roomList = roomList.map((room_: any) => room_._id === unavailableRoomObject._id ? room : room_)
      await dispatch(setRooms(roomList))
      dispatch(setExistingRoom(false))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  return (
    <div>
      <div>
        <Modal show={show}
               onHide={handleClose}
               unavailabilityId={unavailabilityId}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Room Unavailability</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this room unavailable time?</Modal.Body>
          <Modal.Footer>
            <Button variant='success'
                    onClick={handleClose}
                    style={{
                      textTransform: 'uppercase'
                    }}>
              Close
            </Button>
            <Button variant='danger'
                    onClick={handleDelete}
                    style={{
                      textTransform: 'uppercase'
                    }}>
              Delete
            </Button>
          </Modal.Footer>
          {
            loading && (
              <Spinner animation='border'
                       style={{
                         textAlign: 'center',
                         marginLeft: '50%'
                       }}/>
            )
          }
        </Modal>
      </div>
      <div>
        <Table responsive
               striped
               bordered
               hover
               size='sm'
               style={{
                 border: 'solid darkblue 1px'
               }}>
          <thead style={{
            backgroundColor: '#0350a2'
          }}>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderLeft: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Day
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            From
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            To
          </th>
          <th colSpan={2}
              style={{
                borderBottom: 'solid darkblue 1px',
                borderRight: 'solid darkblue 1px',
                borderTop: 'solid darkblue 1px'
              }}/>
          </thead>
          {
            unavailableRoomObject !== null ? (
              <tbody>
              {
                roomUnavailability && unavailableRoomObject.unavailability.map((unavailableTimes: any) => {
                  return (
                    <tr key={unavailableTimes._id}>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {unavailableTimes.day}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {unavailableTimes.startTime}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {unavailableTimes.endTime}
                      </td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        <button onClick={() => handleShow(unavailableTimes._id)}
                                style={{
                                  color: 'indianred',
                                  backgroundColor: 'transparent',
                                  border: 'none'
                                }}>
                          <FaTrashAlt size={20}/>
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            ) : <tbody/>
          }
        </Table>
      </div>
      {
        errors_ && (
          <div style={{
            color: 'red',
            fontSize: '18px',
            marginTop: '7px',
            textAlign: 'center'
          }}>
            {
              errors_
            }
          </div>
        )
      }
    </div>
  )
}

export default RoomsUnavailabilityList
