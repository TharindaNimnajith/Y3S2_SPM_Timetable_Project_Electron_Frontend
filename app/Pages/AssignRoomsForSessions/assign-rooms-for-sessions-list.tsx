import React, {useEffect, useState} from 'react'
import {Button, Form, Modal, Spinner, Table} from 'react-bootstrap'
import {FaEdit, FaPlusCircle} from 'react-icons/fa'
import {proxy} from '../../conf'

let errors_: string = ''

const AssignSessionsForRoomsList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<boolean>(true)
  const [show, setShow] = useState<boolean>(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [room, setRoom] = useState<string>('')
  const [sessions, setSessionsList] = useState<any>([])
  // const [rooms, setRoomsList] = useState<any>([])
  const [possibleRooms, setPossibleRoomsList] = useState<any>([])

  const getSessions = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/roomsForSessions/roomsForSessions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setSessionsList(responseData)
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  // const getRooms = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await fetch(`${proxy}/roomsForSessions/rooms`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     const responseData = await response.json()
  //     setRoomsList(responseData)
  //     setLoading(false)
  //   } catch (errors) {
  //     errors_ = errors
  //     setLoading(false)
  //     console.log(errors)
  //   }
  // }

  const setPossibleRoomsForSessions = async () => {
    setRefresh(false)
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/roomsForSessions/setPossibleRoomsForSessions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response.json()
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getSessions().then(() => {
    })
    // getRooms().then(() => {
    // })
    if (refresh) {
      setPossibleRoomsForSessions().then(() => {
      })
    }
  }, [sessions])

  const editSession = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/roomsForSessions/addRoomForSession`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId,
          room
        })
      })
      const responseData = await response.json()
      if (responseData.exists) {
        errors_ = responseData.message
        // alert(errors_)
        let errorNotification = new Notification('Error!', {
          body: errors_
        })
        // @ts-ignore
        errorNotification.show()
      }
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const getPossibleRoomsForSession = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/roomsForSessions/getPossibleRoomsForSession/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      // if (responseData.length === 0)
      //   setPossibleRoomsList(rooms)
      // else
      setPossibleRoomsList(responseData)
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const handleChangeRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setRoom(e.target.value)
    setLoading(false)
  }

  const handleClose = () => {
    setLoading(true)
    setShow(false)
    setLoading(false)
  }

  const handleSubmit = () => {
    setLoading(true)
    editSession().then(() => setShow(false))
    setLoading(false)
  }

  const handleShow = (sessionId: string, roomRef: any) => {
    setLoading(true)
    setRoom(roomRef)
    setSessionId(sessionId)
    getPossibleRoomsForSession(sessionId).then(() => {
    })
    setShow(true)
    setLoading(false)
  }

  return (
    <div>
      <div style={{
        marginTop: '4%'
      }}>
        <Modal show={show}
               onHide={handleClose}
               sessionId={sessionId}>
          <Modal.Header closeButton>
            <Modal.Title style={{
              textTransform: 'uppercase',
              marginLeft: '36%'
            }}>
              Add Room
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{
              marginLeft: '10%'
            }}>
              <Form.Row style={{
                marginTop: '3%'
              }}>
                <Form.Group controlId='formSessionId'>
                  <Form.Label>Session ID</Form.Label>
                  <Form.Control type='text'
                                value={sessionId}
                                disabled
                                size='lg'/>
                </Form.Group>
              </Form.Row>
              <Form.Row style={{
                marginTop: '3%'
              }}>
                <Form.Group controlId='formRoomName'>
                  <Form.Label>Room Name</Form.Label>
                  <Form.Control as='select'
                                value={room}
                                onChange={handleChangeRoom}
                                title='Please select the room.'
                                required
                                size='lg'>
                    <option value="">Select Room</option>
                    {
                      possibleRooms && possibleRooms.map((room: any) => {
                        return (
                          <option key={room._id}
                                  value={room.roomName}>
                            {room.roomName}
                          </option>
                        )
                      })
                    }
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary'
                    onClick={handleClose}
                    style={{
                      textTransform: 'uppercase'
                    }}>
              Close
            </Button>
            <Button variant='success'
                    onClick={handleSubmit}
                    style={{
                      textTransform: 'uppercase'
                    }}>
              Submit
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
            Session ID
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Lecturers
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Subject Code
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Tag
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Group ID / Sub Group ID
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Student Count
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Room
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
            sessions && sessions.map((session: any) => {
              return (
                <tr key={session._id}>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {session.sessionId}
                  </td>
                  {
                    session.lecturers.length > 0 ? (
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {session.lecturers[0].lecturerRef}
                      </td>
                    ) : (
                      <td style={{
                        textAlign: 'center'
                      }}>
                        null
                      </td>
                    )
                  }
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {session.subjectCodeRef}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {session.tagRef}
                  </td>
                  {
                    session.groupRef !== null ? (
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {session.groupRef}
                      </td>
                    ) : session.subGroupRef !== null ? (
                      <td style={{
                        textAlign: 'center'
                      }}>
                        {session.subGroupRef}
                      </td>
                    ) : (
                      <td style={{
                        textAlign: 'center'
                      }}>
                        null
                      </td>
                    )
                  }
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {session.studentCount}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {session.roomRef}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {
                      session.roomRef !== null ? (
                        <button onClick={() => handleShow(session.sessionId, session.roomRef)}
                                style={{
                                  color: 'darkgreen',
                                  backgroundColor: 'transparent',
                                  border: 'none'
                                }}>
                          <FaEdit size={20}/>
                        </button>
                      ) : (
                        <button onClick={() => handleShow(session.sessionId, null)}
                                style={{
                                  color: 'blue',
                                  backgroundColor: 'transparent',
                                  border: 'none'
                                }}>
                          <FaPlusCircle size={20}/>
                        </button>
                      )
                    }
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </Table>
        {/*{*/}
        {/*  errors_ && (*/}
        {/*    <div style={{*/}
        {/*      color: 'red',*/}
        {/*      fontSize: '18px',*/}
        {/*      marginTop: '7px',*/}
        {/*      textAlign: 'center'*/}
        {/*    }}>*/}
        {/*      {*/}
        {/*        errors_*/}
        {/*      }*/}
        {/*    </div>*/}
        {/*  )*/}
        {/*}*/}
      </div>
    </div>
  )
}

export default AssignSessionsForRoomsList
