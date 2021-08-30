import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form, Spinner} from 'react-bootstrap'
import {FaPlusCircle} from 'react-icons/fa'
import {proxy} from '../../conf'
import {setBuildings, setExistingRoom, setRooms} from './rooms-slice'

let errors_: string = ''

const roomTypes = [
  'Lecture Hall',
  'Laboratory'
]

const RoomsAdd: React.FC = () => {
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

  const [loading, setLoading] = useState<boolean>(false)
  const [buildings, setBuildingsList] = useState<any>([])
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
  }, [])

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
    } else if (room.roomCapacity.trim() === '') {
      errors_ = 'Please enter a value for the room capacity.'
      await dispatch(setExistingRoom(true))
      setLoading(false)
    } else if (isNaN(Number(room.roomCapacity.trim()))) {
      errors_ = 'Please enter a numerical value for the room capacity.'
      await dispatch(setExistingRoom(true))
      setLoading(false)
    }
    if (room.roomName.trim() !== '' && room.buildingName.trim() !== '' && room.roomCapacity.trim() !== ''
      && room.roomType.trim() !== '' && !isNaN(Number(room.roomCapacity.trim()))) {
      try {
        const response = await fetch(`${proxy}/rooms/rooms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(room)
        })
        const responseData = await response.json()
        roomList = {...roomList, responseData}
        await dispatch(setRooms(roomList))
        if (responseData.exists) {
          errors_ = responseData.message
          await dispatch(setExistingRoom(true))
        }
        await resetValues()
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

  const resetValues = async () => {
    setLoading(true)
    room.roomName = ''
    room.buildingName = ''
    room.roomType = ''
    room.roomCapacity = ''
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
        <Form.Row>
          <Form.Group>
            <Button variant='success'
                    type='submit'
                    onClick={handleSubmit}
                    style={{
                      marginLeft: '40%',
                      marginTop: '10%',
                      fontSize: 'large',
                      textTransform: 'uppercase'
                    }}>
              <FaPlusCircle style={{
                marginRight: '4px',
                marginBottom: '-2px'
              }}/>
              Add Room
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

export default RoomsAdd
