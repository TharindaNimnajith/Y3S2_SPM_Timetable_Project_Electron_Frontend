import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form, Spinner} from 'react-bootstrap'
import {FaArrowAltCircleLeft, FaEdit} from 'react-icons/fa'
import {proxy} from '../../conf'
import {
  setBuildings,
  setCenters,
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding
} from './buildings-slice'

let errors_: string = ''

const BuildingsEdit: React.FC = () => {
  const dispatch = useDispatch()

  let buildingList = useSelector(
    (state: {
      buildings: any
    }) => state.buildings.buildings
  )

  const existingBuilding = useSelector(
    (state: {
      buildings: any
      existingBuilding: boolean
    }) => state.buildings.existingBuilding
  )

  const editingBuildingId = useSelector(
    (state: {
      buildings: any
      editingBuildingId: string
    }) => state.buildings.editingBuildingId
  )

  const editingBuilding = useSelector(
    (state: {
      buildings: any
      editingBuilding: any
    }) => state.buildings.editingBuilding
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [centers, setCentersList] = useState<any>([])
  const [building, setBuilding] = useState<{
    buildingName: string,
    centerName: string
  }>({
    buildingName: editingBuilding.buildingName,
    centerName: editingBuilding.centerName
  })

  const getCenters = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/centers/centers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setCentersList(responseData)
      await dispatch(setCenters(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    setBuilding(editingBuilding)
    getCenters().then(() => {
    })
  }, [editingBuilding])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await dispatch(setExistingBuilding(false))
    await dispatch(setExistingRoomsForBuilding(false))
    if (building.buildingName.trim() === '') {
      errors_ = 'Please enter a value for the building name.'
      await dispatch(setExistingBuilding(true))
      setLoading(false)
    } else if (building.centerName.trim() === '') {
      errors_ = 'Please enter a value for the center.'
      await dispatch(setExistingBuilding(true))
      setLoading(false)
    }
    if (building.buildingName.trim() !== '' && building.centerName.trim() !== '') {
      try {
        await dispatch(setEditBuilding(true))
        const response = await fetch(`${proxy}/buildings/buildings/` + editingBuildingId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(building)
        })
        const responseData = await response.json()
        if (responseData.exists) {
          errors_ = responseData.message
          await dispatch(setExistingBuilding(true))
        } else {
          buildingList = buildingList.map((building_: any) => building_ === editingBuildingId ? building : building_)
          await dispatch(setBuildings(buildingList))
          await dispatch(setEditBuilding(false))
          await dispatch(setEditingBuildingId(''))
          await dispatch(setEditingBuilding(null))
        }
        setLoading(false)
      } catch (errors) {
        errors_ = errors
        setLoading(false)
        console.log(errors)
      }
    }
  }

  const handleChangeBuildingName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setBuilding({...building, buildingName: e.target.value})
    dispatch(setExistingBuilding(false))
    setLoading(false)
  }

  const handleChangeCenterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setBuilding({...building, centerName: e.target.value})
    dispatch(setExistingBuilding(false))
    setLoading(false)
  }

  const handleBack = async () => {
    setLoading(true)
    await dispatch(setEditBuilding(false))
    await dispatch(setEditingBuildingId(''))
    await dispatch(setEditingBuilding(null))
    await dispatch(setExistingRoomsForBuilding(false))
    await dispatch(setExistingBuilding(false))
    setLoading(false)
  }

  return (
    <div style={{
      borderRadius: '8px',
      padding: '9%',
      border: '2px solid #007bff',
      maxWidth: 'fit-content'
    }}>
      <Form>
        <Form.Row style={{
          marginTop: '5%'
        }}>
          <Form.Group controlId='formBuildingName'>
            <Form.Label>Building Name</Form.Label>
            <Form.Control type='text'
                          value={building.buildingName}
                          onChange={handleChangeBuildingName}
                          placeholder='Enter Building Name'
                          pattern='[A-Za-z]{2,32}'
                          title='Please enter a valid building name.'
                          required
                          size='lg'/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId='formLocatedCenter'>
            <Form.Label>Located Center</Form.Label>
            <Form.Control as='select'
                          value={building.centerName}
                          onChange={handleChangeCenterName}
                          title='Please select the located center.'
                          required
                          size='lg'>
              <option value="">Select Located Center</option>
              {
                centers && centers.map((center: any) => {
                  return (
                    <option key={center._id}
                            value={center.centerName}>
                      {center.centerName}
                    </option>
                  )
                })
              }
            </Form.Control>
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
          existingBuilding && errors_ && (
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

export default BuildingsEdit
