import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form, Spinner} from 'react-bootstrap'
import {FaArrowAltCircleLeft, FaEdit} from 'react-icons/fa'
import {proxy} from '../../conf'
import {setBuildings, setEditingRoom, setEditingRoomId, setEditRoom, setExistingRoom, setRooms} from './rooms-slice'

let errors_: string = ''

const roomTypes = [
  'Lecture Hall',
  'Laboratory'
]

const RoomsEdit: React.FC = () => {
  const dispatch = useDispatch()

  let roomList = useSelector(
    (state: {
      rooms: any
    }) => state.rooms.rooms
  )

  const existingRoom = useSelector(
    (state: {
      rooms: any
      existingRoom: boolean
    }) => state.rooms.existingRoom
  )

  const editingRoomId = useSelector(
    (state: {
      rooms: any
      editingRoomId: string
    }) => state.rooms.editingRoomId
  )

  const editingRoom = useSelector(
    (state: {
      rooms: any
      editingRoom: any
    }) => state.rooms.editingRoom
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [buildings, setBuildingsList] = useState<any>([])
  const [room, setRoom] = useState<{
    roomName: string,
    buildingName: string,
    roomType: string,
    roomCapacity: string
  }>({
    roomName: editingRoom.roomName,
    buildingName: editingRoom.buildingName,
    roomType: editingRoom.roomType,
    roomCapacity: editingRoom.roomCapacity
  })

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
    setRoom(editingRoom)
    getBuildings().then(() => {
    })
  }, [editingRoom])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await dispatch(setExistingRoom(false))
    if (room.roomName.trim() === '') {
      errors_ = 'Please enter a value for the room name.'
      await dispatch(setExistingRoom(true))
      setLoading(false)
    } else if (room.buildingName.trim() === '') {
      errors_ = 'Please enter a value for the building.'
      await dispatch(setExistingRoom(true))
      setLoading(false)
    } else if (room.roomType.trim() === '') {
      errors_ = 'Please enter a value for the room type.'
      await dispatch(setExistingRoom(true))
      setLoading(false)
    } else if (String(room.roomCapacity).trim() === '') {
      errors_ = 'Please enter a value for the room capacity.'
      await dispatch(setExistingRoom(true))
      setLoading(false)
    } else if (isNaN(Number(String(room.roomCapacity).trim()))) {
      errors_ = 'Please enter a numerical value for the room capacity.'
      await dispatch(setExistingRoom(true))
      setLoading(false)
    }
    if (room.roomName.trim() !== '' && room.buildingName.trim() !== '' && String(room.roomCapacity).trim() !== ''
      && room.roomType.trim() !== '' && !isNaN(Number(String(room.roomCapacity).trim()))) {
      try {
        await dispatch(setEditRoom(true))
        const response = await fetch(`${proxy}/rooms/rooms/` + editingRoomId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(room)
        })
        const responseData = await response.json()
        if (responseData.exists) {
          errors_ = responseData.message
          await dispatch(setExistingRoom(true))
        } else {
          roomList = roomList.map((room_: any) => room_ === editingRoomId ? room : room_)
          await dispatch(setRooms(roomList))
          await dispatch(setEditRoom(false))
          await dispatch(setEditingRoomId(''))
          await dispatch(setEditingRoom(null))
        }
        setLoading(false)
      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }
    }
  }

  const handleChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setRoom({...room, roomName: e.target.value})
    dispatch(setExistingRoom(false))
    setLoading(false)
  }

  const handleChangeBuildingName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setRoom({...room, buildingName: e.target.value})
    dispatch(setExistingRoom(false))
    setLoading(false)
  }

  const handleChangeRoomType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setRoom({...room, roomType: e.target.value})
    dispatch(setExistingRoom(false))
    setLoading(false)
  }

  const handleChangeRoomCapacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setRoom({...room, roomCapacity: e.target.value})
    dispatch(setExistingRoom(false))
    setLoading(false)
  }

  const handleBack = async () => {
    setLoading(true)
    await dispatch(setEditRoom(false))
    await dispatch(setEditingRoomId(''))
    await dispatch(setEditingRoom(null))
    await dispatch(setExistingRoom(false))
    setLoading(false)
  }

  return (
    <div style={{
      borderRadius: '8px',
      padding: '3% 9% 3% 9%',
      border: '2px solid #007bff',
      maxWidth: 'fit-content'
    }}>
      <Form>
        <Form.Row style={{
          marginTop: '5%'
        }}>
          <Form.Group controlId='formRoomName'>
            <Form.Label>Room Name</Form.Label>
            <Form.Control type='text'
                          value={room.roomName}
                          onChange={handleChangeRoomName}
                          placeholder='Enter Room Name'
                          pattern='[A-Za-z]{2,32}'
                          title='Please enter a valid room name.'
                          required
                          size='lg'/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formLocatedBuilding'>
            <Form.Label>Located Building</Form.Label>
            <Form.Control as='select'
                          value={room.buildingName}
                          onChange={handleChangeBuildingName}
                          title='Please select the located building.'
                          required
                          size='lg'>
              <option value="">Select Located Building</option>
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
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formRoomType'>
            <Form.Label>Room Type</Form.Label>
            <Form.Control as='select'
                          value={room.roomType}
                          onChange={handleChangeRoomType}
                          title='Please select the room type.'
                          size='lg'>
              <option value="">Select Room Type</option>
              {
                roomTypes.map((roomType: any) => {
                  return (
                    <option key={roomType}
                            value={roomType}>
                      {roomType}
                    </option>
                  )
                })
              }
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formRoomCapacity'>
            <Form.Label>Room Capacity</Form.Label>
            <Form.Control type='text'
                          value={room.roomCapacity}
                          onChange={handleChangeRoomCapacity}
                          placeholder='Enter Room Capacity'
                          pattern='[0-9]'
                          title='Please enter a valid room capacity.'
                          required
                          size='lg'/>
          </Form.Group>
        </Form.Row>
        {
          loading && (
            <Spinner animation='border'
                     style={{
                       textAlign: 'center',
                       marginLeft: '50%'
                     }}/>
          )
        }
        <Form.Row style={{
          marginTop: '10%'
        }}>
          <Form.Group>
            <Button variant='primary'
                    type='button'
                    onClick={handleBack}
                    style={{
                      marginLeft: '30%',
                      fontSize: 'large',
                      textTransform: 'uppercase'
                    }}>
              <FaArrowAltCircleLeft style={{
                marginRight: '4px',
                marginBottom: '-2px'
              }}/>
              Back
            </Button>
          </Form.Group>
          <Form.Group>
            <Button variant='success'
                    type='submit'
                    onClick={handleSubmit}
                    style={{
                      marginLeft: '60%',
                      fontSize: 'large',
                      textTransform: 'uppercase'
                    }}>
              <FaEdit style={{
                marginRight: '4px',
                marginBottom: '-2px'
              }}/>
              Edit
            </Button>
          </Form.Group>
        </Form.Row>
        {
          existingRoom && errors_ && (
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
      </Form>
    </div>
  )
}

export default RoomsEdit
