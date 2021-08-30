import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form, Modal, Spinner, Table} from 'react-bootstrap'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import {proxy} from '../../conf'
import {setEditingRoom, setEditingRoomId, setEditRoom, setExistingRoom, setRooms} from './rooms-slice'
import {setBuildings} from '../Buildings/buildings-slice'

let errors_: string = ''

const RoomsList: React.FC = () => {
  const dispatch = useDispatch()

  let roomList = useSelector(
    (state: {
      rooms: any
    }) => state.rooms.rooms
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<string>('')
  const [buildings, setBuildingsList] = useState<any>([])
  const [rooms, setRoomsList] = useState<any>([])
  const [room, setRoom] = useState<{
    roomName: string,
    buildingName: string,
    roomType: string,
    roomCapacity: string
  }>({
    roomName: '',
    buildingName: '',
    roomType: '',
    roomCapacity: ''
  })

  const getRooms = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/rooms/searchRooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
      })
      const responseData = await response.json()
      setRoomsList(responseData)
      await dispatch(setRooms(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const getBuildings = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/buildings/buildings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setBuildingsList(responseData)
      await dispatch(setBuildings(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getBuildings().then(() => {
    })
    getRooms().then(() => {
    })
  }, [rooms])

  const handleChangeRoomNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setRoom({...room, roomName: e.target.value})
    setLoading(false)
  }

  const handleChangeBuildingNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setRoom({...room, buildingName: e.target.value})
    setLoading(false)
  }

  const handleChangeRoomTypeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setRoom({...room, roomType: e.target.value})
    setLoading(false)
  }

  const handleClose = () => {
    setLoading(true)
    setShow(false)
    setLoading(false)
  }

  const handleDelete = () => {
    setLoading(true)
    deleteRoom(deleteId).then(() => setShow(false))
    setLoading(false)
  }

  const handleShow = (id: string) => {
    setLoading(true)
    setShow(true)
    setDeleteId(id)
    setLoading(false)
  }

  const editRoom = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/rooms/rooms/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      await dispatch(setExistingRoom(false))
      await dispatch(setEditingRoomId(id))
      await dispatch(setEditingRoom(responseData))
      await dispatch(setEditRoom(true))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const deleteRoom = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/rooms/rooms/` + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response.json()
      roomList = roomList.filter((room: any) => room._id !== id)
      await dispatch(setRooms(roomList))
      await dispatch(setEditRoom(false))
      await dispatch(setExistingRoom(false))
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
        <Form>
          <Form.Row>
            <Form.Group controlId='formRoomName'>
              <Form.Label>Room Name</Form.Label>
              <Form.Control type='text'
                            value={room.roomName}
                            onChange={handleChangeRoomNameSearch}
                            placeholder='Search by Room Name'
                            title='Search by room name.'/>
            </Form.Group>
            <Form.Group controlId='formLocatedBuilding'
                        style={{
                          marginLeft: '3%'
                        }}>
              <Form.Label>Located Building</Form.Label>
              <Form.Control as='select'
                            value={room.buildingName}
                            onChange={handleChangeBuildingNameSearch}
                            title='Search by located building.'>
                <option value="">Search by Located Building</option>
                {
                  buildings && buildings.map((building: any) => {
                    return (
                      <option key={building._id}
                              value={building.buildingName}>
                        {building.buildingName}
                      </option>
                    )
                  })
                }
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='formRoomType'
                        style={{
                          marginLeft: '3%'
                        }}>
              <Form.Label>Room Type</Form.Label>
              <Form.Control as='select'
                            value={room.roomType}
                            onChange={handleChangeRoomTypeSearch}
                            title='Search by room type.'>
                <option value="">Search by Room Type</option>
                <option value="Lecture Hall">Lecture Hall</option>
                <option value="Laboratory">Laboratory</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
      <div style={{
        marginTop: '4%'
      }}>
        <Modal show={show}
               onHide={handleClose}
               deleteId={deleteId}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this room?</Modal.Body>
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
            Room Name
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Located Building
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Room Type
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Room Capacity
          </th>
          <th colSpan={2}
              style={{
                borderBottom: 'solid darkblue 1px',
                borderRight: 'solid darkblue 1px',
                borderTop: 'solid darkblue 1px'
              }}/>
          </thead>
          <tbody>
          {
            rooms && rooms.map((room: any) => {
              return (
                <tr key={room._id}>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {room.roomName}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {room.buildingName}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {room.roomType}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {room.roomCapacity}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    <button onClick={() => editRoom(room._id)}
                            style={{
                              color: 'darkgreen',
                              backgroundColor: 'transparent',
                              border: 'none'
                            }}>
                      <FaEdit size={20}/>
                    </button>
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    <button onClick={() => handleShow(room._id)}
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

export default RoomsList
