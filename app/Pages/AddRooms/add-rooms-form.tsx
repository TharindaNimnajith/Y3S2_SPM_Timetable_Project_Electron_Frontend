import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Button, Col, Form, Modal, Row, Spinner} from 'react-bootstrap'
import Select from 'react-select'
import {proxy} from '../../conf'
import {setGroups, setLecturers, setRooms, setSubGroups, setSubjects, setTags} from './add-rooms-slice'

let errors_: string = ''

let tagData: any = []
let subjectData: any = []
let lecturerData: any = []
let groupData: any = []
let subGroupData: any = []

const AddRoomsForm: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [rooms, setRoomsList] = useState<any>([])
  const [disabled, setDisabled] = useState<boolean>(true)
  const [possibleRoomsObject, setPossibleRoomsObject] = useState<any>([])
  const [possibleRooms, setPossibleRooms] = useState<any>([])
  const [tagDisabled, setTagDisabled] = useState<boolean>(true)
  const [subjectDisabled, setSubjectDisabled] = useState<boolean>(true)
  const [subjectTagDisabled, setSubjectTagDisabled] = useState<boolean>(true)
  const [lecturerDisabled, setLecturerDisabled] = useState<boolean>(true)
  const [groupDisabled, setGroupDisabled] = useState<boolean>(true)
  const [subGroupDisabled, setSubGroupDisabled] = useState<boolean>(true)
  const [tag, setTag] = useState<{
    label: string
  }>({
    label: 'Select Tag'
  })
  const [subject, setSubject] = useState<{
    label: string
  }>({
    label: 'Select Subject'
  })
  const [subjectTag, setSubjectTag] = useState<{
    label: string
  }>({
    label: 'Select Tag'
  })
  const [lecturer, setLecturer] = useState<{
    label: string
  }>({
    label: 'Select Lecturer'
  })
  const [group, setGroup] = useState<{
    label: string
  }>({
    label: 'Select Group'
  })
  const [subGroup, setSubGroup] = useState<{
    label: string
  }>({
    label: 'Select Sub Group'
  })

  const getRooms = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/addRooms/rooms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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

  const getTags = async () => {
    tagData = []
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/addRooms/tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      await dispatch(setTags(responseData))
      for (let i = 0; i < responseData.length; i++) {
        tagData = [...tagData,
          {
            value: responseData[i].name,
            label: responseData[i].name
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

  const getSubjects = async () => {
    subjectData = []
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/addRooms/subjects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      await dispatch(setSubjects(responseData))
      for (let i = 0; i < responseData.length; i++) {
        subjectData = [...subjectData,
          {
            value: responseData[i].subjectCode,
            label: responseData[i].subjectCode
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

  const getLecturers = async () => {
    lecturerData = []
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/addRooms/lecturers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      await dispatch(setLecturers(responseData))
      for (let i = 0; i < responseData.length; i++) {
        lecturerData = [...lecturerData,
          {
            value: responseData[i].lecturerName,
            label: responseData[i].lecturerName
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

  const getGroups = async () => {
    groupData = []
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/addRooms/groups`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      await dispatch(setGroups(responseData))
      for (let i = 0; i < responseData.length; i++) {
        groupData = [...groupData,
          {
            value: responseData[i].groupId,
            label: responseData[i].groupId
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

  const getSubGroups = async () => {
    subGroupData = []
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/addRooms/subGroups`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      await dispatch(setSubGroups(responseData))
      for (let i = 0; i < responseData.length; i++) {
        subGroupData = [...subGroupData,
          {
            value: responseData[i].subGroupId,
            label: responseData[i].subGroupId
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
    getTags().then(() => {
    })
    getSubjects().then(() => {
    })
    getLecturers().then(() => {
    })
    getGroups().then(() => {
    })
    getSubGroups().then(() => {
    })
    getRooms().then(() => {
    })
  }, [possibleRooms])

  const getPossibleRoomsByTag = async (tag: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/addRooms/getPossibleRoomsByTag`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tag
        })
      })
      const responseData = await response.json()
      setPossibleRooms(responseData.possibleRooms)
      setPossibleRoomsObject(responseData.possibleRoomsObject)
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const getPossibleRoomsBySubjectAndTag = async (subject: string, tag: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/addRooms/getPossibleRoomsBySubjectAndTag`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject,
          tag
        })
      })
      const responseData = await response.json()
      setPossibleRooms(responseData.possibleRooms)
      setPossibleRoomsObject(responseData.possibleRoomsObject)
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const getPossibleRoomsByLecturer = async (lecturer: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/addRooms/getPossibleRoomsByLecturer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lecturer
        })
      })
      const responseData = await response.json()
      setPossibleRooms(responseData.possibleRooms)
      setPossibleRoomsObject(responseData.possibleRoomsObject)
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const getPossibleRoomsByGroup = async (group: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/addRooms/getPossibleRoomsByGroup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group
        })
      })
      const responseData = await response.json()
      setPossibleRooms(responseData.possibleRooms)
      setPossibleRoomsObject(responseData.possibleRoomsObject)
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const getPossibleRoomsBySubGroup = async (subGroup: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/addRooms/getPossibleRoomsBySubGroup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subGroup
        })
      })
      const responseData = await response.json()
      setPossibleRooms(responseData.possibleRooms)
      setPossibleRoomsObject(responseData.possibleRoomsObject)
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const handleChangeTag = (e: any) => {
    setLoading(true)
    setTag({
      label: e.value
    })
    getPossibleRoomsByTag(e.value).then(() => {
    })
    setDisabled(false)
    setLoading(false)
  }

  const handleChangeSubject = (e: any) => {
    setLoading(true)
    setSubject({
      label: e.value
    })
    if (subjectTag.label !== 'Select Tag') {
      getPossibleRoomsBySubjectAndTag(e.value, subjectTag.label).then(() => {
      })
      setDisabled(false)
    }
    setLoading(false)
  }

  const handleChangeSubjectTag = (e: any) => {
    setLoading(true)
    setSubjectTag({
      label: e.value
    })
    if (subject.label !== 'Select Subject') {
      getPossibleRoomsBySubjectAndTag(subject.label, e.value).then(() => {
      })
      setDisabled(false)
    }
    setLoading(false)
  }

  const handleChangeLecturer = (e: any) => {
    setLoading(true)
    setLecturer({
      label: e.value
    })
    getPossibleRoomsByLecturer(e.value).then(() => {
    })
    setDisabled(false)
    setLoading(false)
  }

  const handleChangeGroup = (e: any) => {
    setLoading(true)
    setGroup({
      label: e.value
    })
    getPossibleRoomsByGroup(e.value).then(() => {
    })
    setDisabled(false)
    setLoading(false)
  }

  const handleChangeSubGroup = (e: any) => {
    setLoading(true)
    setSubGroup({
      label: e.value
    })
    getPossibleRoomsBySubGroup(e.value).then(() => {
    })
    setDisabled(false)
    setLoading(false)
  }

  const handleSelectTag = () => {
    setDisabled(true)
    setPossibleRooms([])
    setPossibleRoomsObject([])
    setTagDisabled(false)
    setSubjectDisabled(true)
    setSubjectTagDisabled(true)
    setLecturerDisabled(true)
    setGroupDisabled(true)
    setSubGroupDisabled(true)
    setTag({
      label: 'Select Tag'
    })
    setSubject({
      label: 'Select Subject'
    })
    setSubjectTag({
      label: 'Select Tag'
    })
    setLecturer({
      label: 'Select Lecturer'
    })
    setGroup({
      label: 'Select Group'
    })
    setSubGroup({
      label: 'Select Sub Group'
    })
  }

  const handleSelectSubjectAndTag = () => {
    setDisabled(true)
    setPossibleRooms([])
    setPossibleRoomsObject([])
    setTagDisabled(true)
    setSubjectDisabled(false)
    setSubjectTagDisabled(false)
    setLecturerDisabled(true)
    setGroupDisabled(true)
    setSubGroupDisabled(true)
    setTag({
      label: 'Select Tag'
    })
    setSubject({
      label: 'Select Subject'
    })
    setSubjectTag({
      label: 'Select Tag'
    })
    setLecturer({
      label: 'Select Lecturer'
    })
    setGroup({
      label: 'Select Group'
    })
    setSubGroup({
      label: 'Select Sub Group'
    })
  }

  const handleSelectLecturer = () => {
    setDisabled(true)
    setPossibleRooms([])
    setPossibleRoomsObject([])
    setTagDisabled(true)
    setSubjectDisabled(true)
    setSubjectTagDisabled(true)
    setLecturerDisabled(false)
    setGroupDisabled(true)
    setSubGroupDisabled(true)
    setTag({
      label: 'Select Tag'
    })
    setSubject({
      label: 'Select Subject'
    })
    setSubjectTag({
      label: 'Select Tag'
    })
    setLecturer({
      label: 'Select Lecturer'
    })
    setGroup({
      label: 'Select Group'
    })
    setSubGroup({
      label: 'Select Sub Group'
    })
  }

  const handleSelectGroup = () => {
    setDisabled(true)
    setPossibleRooms([])
    setPossibleRoomsObject([])
    setTagDisabled(true)
    setSubjectDisabled(true)
    setSubjectTagDisabled(true)
    setLecturerDisabled(true)
    setGroupDisabled(false)
    setSubGroupDisabled(true)
    setTag({
      label: 'Select Tag'
    })
    setSubject({
      label: 'Select Subject'
    })
    setSubjectTag({
      label: 'Select Tag'
    })
    setLecturer({
      label: 'Select Lecturer'
    })
    setGroup({
      label: 'Select Group'
    })
    setSubGroup({
      label: 'Select Sub Group'
    })
  }

  const handleSelectSubGroup = () => {
    setDisabled(true)
    setPossibleRooms([])
    setPossibleRoomsObject([])
    setTagDisabled(true)
    setSubjectDisabled(true)
    setSubjectTagDisabled(true)
    setLecturerDisabled(true)
    setGroupDisabled(true)
    setSubGroupDisabled(false)
    setTag({
      label: 'Select Tag'
    })
    setSubject({
      label: 'Select Subject'
    })
    setSubjectTag({
      label: 'Select Tag'
    })
    setLecturer({
      label: 'Select Lecturer'
    })
    setGroup({
      label: 'Select Group'
    })
    setSubGroup({
      label: 'Select Sub Group'
    })
  }

  const handleRoomsSelect = (e: any, roomName: string) => {
    if (e.target.checked) {
      setPossibleRoomsObject([...possibleRoomsObject, {
        roomRef: roomName
      }])
      setPossibleRooms([...possibleRooms, roomName])
    } else {
      setPossibleRoomsObject(possibleRoomsObject.filter((room: any) => room.roomRef !== roomName))
      setPossibleRooms(possibleRooms.filter((room: any) => room !== roomName))
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    if (!tagDisabled && tag.label !== 'Select Tag') {
      try {
        const response = await fetch(`${proxy}/addRooms/addRoomsToTag`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'tag': tag.label,
            'possibleRooms': possibleRoomsObject
          })
        })
        const responseData = await response.json()
        setMessage(responseData.message)
        setLoading(false)
      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }
    } else if (!subjectDisabled && !subjectTagDisabled && subjectTag.label !== 'Select Tag'
      && subject.label !== 'Select Subject') {
      try {
        const response = await fetch(`${proxy}/addRooms/addRoomsToSubjectAndTag`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'subject': subject.label,
            'subjectTag': subjectTag.label,
            'possibleRooms': possibleRoomsObject
          })
        })
        const responseData = await response.json()
        setMessage(responseData.message)
        setLoading(false)
      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }
    } else if (!lecturerDisabled && lecturer.label !== 'Select Lecturer') {
      try {
        const response = await fetch(`${proxy}/addRooms/addRoomsToLecturer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'lecturer': lecturer.label,
            'possibleRooms': possibleRoomsObject
          })
        })
        const responseData = await response.json()
        setMessage(responseData.message)
        setLoading(false)
      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }
    } else if (!groupDisabled && group.label !== 'Select Group') {
      try {
        const response = await fetch(`${proxy}/addRooms/addRoomsToGroup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'group': group.label,
            'possibleRooms': possibleRoomsObject
          })
        })
        const responseData = await response.json()
        setMessage(responseData.message)
        setLoading(false)
      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }
    } else if (!subGroupDisabled && subGroup.label !== 'Select Sub Group') {
      try {
        const response = await fetch(`${proxy}/addRooms/addRoomsToSubGroup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'subGroup': subGroup.label,
            'possibleRooms': possibleRoomsObject
          })
        })
        const responseData = await response.json()
        setMessage(responseData.message)
        setLoading(false)
      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }
    } else {
      const content = 'Select values from dropdown list properly before submitting and please try again!'
      setMessage(content)
      alert(content)
    }
    setPossibleRooms([])
    setPossibleRoomsObject([])
    setDisabled(true)
    setTagDisabled(true)
    setSubjectDisabled(true)
    setSubjectTagDisabled(true)
    setLecturerDisabled(true)
    setGroupDisabled(true)
    setSubGroupDisabled(true)
    setTag({
      label: 'Select Tag'
    })
    setSubject({
      label: 'Select Subject'
    })
    setSubjectTag({
      label: 'Select Tag'
    })
    setLecturer({
      label: 'Select Lecturer'
    })
    setGroup({
      label: 'Select Group'
    })
    setSubGroup({
      label: 'Select Sub Group'
    })
    setLoading(false)
    handleShow()
  }

  const handleClose = () => {
    setLoading(true)
    setShow(false)
    setLoading(false)
    window.location.reload()
  }

  const handleShow = () => {
    setLoading(true)
    setShow(true)
    setLoading(false)
  }

  return (
    <div style={{
      maxWidth: 'fit-content'
    }}>
      <div className='container'>
        <Row>
          <Col sm='4'>
            <div>
              <div>
                <Form.Check type='radio'
                            label='Tag'
                            name='RadioButton'
                            id='tagRadioBtn'
                            onClick={handleSelectTag}/>
                <div style={{
                  width: '80%',
                  height: '80px',
                  fontSize: 'larger',
                  marginTop: '3%'
                }}>
                  <Select className='basic-single'
                          classNamePrefix='select'
                          defaultValue={null}
                          placeholder='Select Tag'
                          value={tag}
                          isDisabled={tagDisabled}
                          isLoading={false}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          name='tag'
                          options={tagData}
                          onChange={tag => handleChangeTag(tag)}/>
                </div>
              </div>
              <div>
                <Form.Check type='radio'
                            label='Subject & Tag'
                            name='RadioButton'
                            id='subjectAndTagRadioBtn'
                            onClick={handleSelectSubjectAndTag}/>
                <div style={{
                  width: '80%',
                  height: '50px',
                  fontSize: 'larger',
                  marginTop: '3%'
                }}>
                  <Select className='basic-single'
                          classNamePrefix='select'
                          defaultValue={null}
                          placeholder='Select Subject'
                          value={subject}
                          isDisabled={subjectDisabled}
                          isLoading={false}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          name='subject'
                          options={subjectData}
                          onChange={subject => handleChangeSubject(subject)}/>
                </div>
                <div style={{
                  width: '80%',
                  height: '80px',
                  fontSize: 'larger',
                  marginTop: '3%'
                }}>
                  <Select className='basic-single'
                          classNamePrefix='select'
                          defaultValue={null}
                          placeholder='Select Tag'
                          value={subjectTag}
                          isDisabled={subjectTagDisabled}
                          isLoading={false}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          name='subjectTag'
                          options={tagData}
                          onChange={subjectTag => handleChangeSubjectTag(subjectTag)}/>
                </div>
              </div>
              <div>
                <Form.Check type='radio'
                            label='Lecturer'
                            name='RadioButton'
                            id='lecturerRadioBtn'
                            onClick={handleSelectLecturer}/>
                <div style={{
                  width: '80%',
                  height: '80px',
                  fontSize: 'larger',
                  marginTop: '3%'
                }}>
                  <Select className='basic-single'
                          classNamePrefix='select'
                          defaultValue={null}
                          placeholder='Select Lecturer'
                          value={lecturer}
                          isDisabled={lecturerDisabled}
                          isLoading={false}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          name='lecturer'
                          options={lecturerData}
                          onChange={lecturer => handleChangeLecturer(lecturer)}/>
                </div>
              </div>
              <div>
                <Form.Check type='radio'
                            label='Group'
                            name='RadioButton'
                            id='groupRadioBtn'
                            onClick={handleSelectGroup}/>
                <div style={{
                  width: '80%',
                  height: '80px',
                  fontSize: 'larger',
                  marginTop: '3%'
                }}>
                  <Select className='basic-single'
                          classNamePrefix='select'
                          defaultValue={null}
                          placeholder='Select Group'
                          value={group}
                          isDisabled={groupDisabled}
                          isLoading={false}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          name='group'
                          options={groupData}
                          onChange={group => handleChangeGroup(group)}/>
                </div>
              </div>
              <div>
                <Form.Check type='radio'
                            label='Sub Group'
                            name='RadioButton'
                            id='subGroupRadioBtn'
                            onClick={handleSelectSubGroup}/>
                <div style={{
                  width: '80%',
                  height: '375px',
                  fontSize: 'larger',
                  marginTop: '3%'
                }}>
                  <Select className='basic-single'
                          classNamePrefix='select'
                          defaultValue={null}
                          placeholder='Select Sub Group'
                          value={subGroup}
                          isDisabled={subGroupDisabled}
                          isLoading={false}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          name='subGroup'
                          options={subGroupData}
                          onChange={subGroup => handleChangeSubGroup(subGroup)}/>
                </div>
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
          </Col>
          <Col sm='8'>
            <Modal show={show}
                   onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{
                  textTransform: 'uppercase',
                  marginLeft: '36%'
                }}>
                  Add Rooms
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {message}
              </Modal.Body>
              <Modal.Footer>
                <Button variant='success'
                        onClick={handleClose}
                        style={{
                          textTransform: 'uppercase'
                        }}>
                  Close
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
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gridGap: '2rem',
              gridAutoRows: 'minmax(auto, auto)'
            }}>
              {
                rooms && rooms.map((room: any) => {
                  if (possibleRooms.includes(room.roomName)) {
                    return (
                      <Form.Check type='checkbox'
                                  key={room._id}
                                  id={room.roomName}
                                  label={room.roomName}
                                  checked={true}
                                  disabled={disabled}
                                  onChange={(e: any) => handleRoomsSelect(e, room.roomName)}
                                  style={{
                                    width: 'max-content',
                                    marginRight: '30px'
                                  }}/>
                    )
                  } else {
                    return (
                      <Form.Check type='checkbox'
                                  key={room._id}
                                  id={room._id}
                                  label={room.roomName}
                                  disabled={disabled}
                                  onChange={(e: any) => handleRoomsSelect(e, room.roomName)}
                                  style={{
                                    width: 'max-content',
                                    marginRight: '30px'
                                  }}/>
                    )
                  }
                })
              }
            </div>
            <div style={{
              marginTop: '7%',
              marginLeft: '45%'
            }}>
              <Form>
                <Form.Row>
                  <Form.Group>
                    <button onClick={handleSubmit}
                            type='submit'
                            className='btn btn-primary'
                            disabled={disabled}
                            style={{
                              border: 'none',
                              borderRadius: '5px',
                              fontSize: 'x-large',
                              textTransform: 'uppercase',
                              outline: 'none',
                              padding: '4px 12px 4px 12px'
                            }}>
                      Submit
                    </button>
                  </Form.Group>
                </Form.Row>
              </Form>
              {
                loading && (
                  <Spinner animation='border'
                           style={{
                             textAlign: 'center',
                             marginLeft: '50%'
                           }}/>
                )
              }
            </div>
            <div>
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
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AddRoomsForm
