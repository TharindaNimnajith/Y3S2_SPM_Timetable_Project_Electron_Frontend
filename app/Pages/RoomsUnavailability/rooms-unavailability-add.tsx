import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form, Spinner} from 'react-bootstrap'
import {FaPlusCircle} from 'react-icons/fa'
import Select from 'react-select'
import {proxy} from '../../conf'
import {setExistingRoom, setRooms} from '../Rooms/rooms-slice'
import {setRoomUnavailability, setUnavailableRoom} from './rooms-unavailability-slice'

let errors_: string = ''
let data: any = []

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const RoomsUnavailabilityAdd: React.FC = () => {
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

  let unavailableRoom = useSelector(
    (state: {
      roomsUnavailability: any
      unavailableRoom: any
    }) => state.roomsUnavailability.unavailableRoom
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [unavailableRoomObject, setUnavailableRoomObject] = useState<any>(null)
  const [room, setRoom] = useState<{
    roomName: string,
    day: string,
    startTime: string,
    endTime: string
  }>({
    roomName: '',
    day: '',
    startTime: '',
    endTime: ''
  })

  const getRooms = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/rooms/rooms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      await dispatch(setRooms(responseData))
      data = []
      for (let i = 0; i < responseData.length; i++) {
        data = [...data,
          {
            value: responseData[i].roomName,
            label: responseData[i].roomName
          }
        ]
      }
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getRooms().then(() => {
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
    } else if (room.day.trim() === '') {
      errors_ = 'Please enter a value for the unavailable day.'
      await dispatch(setExistingRoom(true))
      setLoading(false)
    } else if (room.startTime.trim() === '') {
      errors_ = 'Please enter a value for the start time.'
      await dispatch(setExistingRoom(true))
      setLoading(false)
    } else if (room.endTime.trim() === '') {
      errors_ = 'Please enter a value for the end time.'
      await dispatch(setExistingRoom(true))
      setLoading(false)
    }
    if (room.roomName.trim() !== '' && room.day.trim() !== '' &&
      room.startTime.trim() !== '' && room.endTime.trim() !== '') {
      let unavailability = {
        day: room.day,
        startTime: room.startTime,
        endTime: room.endTime
      }
      try {
        const response = await fetch(`${proxy}/unavailableRooms/unavailableRooms/`
          + unavailableRoomObject._id, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            unavailability
          })
        })
        await response.json()
        let unavailableTimes = []
        unavailableTimes.push(...unavailableRoom.unavailability, unavailability)
        let room = {...unavailableRoom, unavailability: unavailableTimes}
        await dispatch(setUnavailableRoom(room))
        roomList = roomList.map((room_: any) => room_._id === unavailableRoomObject._id ? room : room_)
        await dispatch(setRooms(roomList))
        await resetValues()
        setLoading(false)
      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }
    }
  }

  const getRoom = async (roomName: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/rooms/roomByRoomName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          roomName
        })
      })
      const responseData = await response.json()
      setUnavailableRoomObject(responseData[0])
      await dispatch(setUnavailableRoom(responseData[0]))
      await dispatch(setRoomUnavailability(true))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const handleChangeRoomName = (e: any) => {
    setLoading(true)
    setRoom({...room, roomName: e.value})
    getRoom(e.value).then(() => {
    })
    dispatch(setExistingRoom(false))
    setLoading(false)
  }

  const handleChangeDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setRoom({...room, day: e.target.value})
    dispatch(setExistingRoom(false))
    setLoading(false)
  }

  const handleChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setRoom({...room, startTime: e.target.value})
    dispatch(setExistingRoom(false))
    setLoading(false)
  }

  const handleChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setRoom({...room, endTime: e.target.value})
    dispatch(setExistingRoom(false))
    setLoading(false)
  }

  const resetValues = async () => {
    setLoading(true)
    room.day = ''
    room.startTime = ''
    room.endTime = ''
    setLoading(false)
  }

  return (
    <div style={{
      borderRadius: '8px',
      padding: '10% 25% 10% 25%',
      border: '2px solid #007bff',
      width: '100%'
    }}>
      <Form>
        <Form.Row style={{
          marginTop: '5%'
        }}>
          <Form.Group controlId='formRoomName'>
            <Form.Label>Room Name</Form.Label>
            <div style={{
              width: '200%',
              fontSize: 'larger'
            }}>
              <Select className='basic-single'
                      classNamePrefix='select'
                      defaultValue={null}
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name='roomName'
                      options={data}
                      onChange={roomName => handleChangeRoomName(roomName)}/>
            </div>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formDay'>
            <Form.Label>Day</Form.Label>
            <Form.Control as='select'
                          value={room.day}
                          onChange={handleChangeDay}
                          title='Please select the unavailable day.'
                          required
                          size='lg'>
              <option value="">Select Day</option>
              {
                days.map((day: string) => {
                  return (
                    <option key={day}
                            value={day}>
                      {day}
                    </option>
                  )
                })
              }
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formStartTime'>
            <Form.Label>From</Form.Label>
            <Form.Control type='time'
                          value={room.startTime}
                          onChange={handleChangeStartTime}
                          title='Please enter a start time.'
                          required
                          size='lg'/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formEndTime'>
            <Form.Label>To</Form.Label>
            <Form.Control type='time'
                          value={room.endTime}
                          onChange={handleChangeEndTime}
                          title='Please enter a end time.'
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
                      marginLeft: '45%',
                      marginTop: '25%',
                      fontSize: 'large',
                      textTransform: 'uppercase'
                    }}>
              <FaPlusCircle style={{
                marginRight: '4px',
                marginBottom: '-2px'
              }}/>
              Add
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

export default RoomsUnavailabilityAdd
