import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form, Spinner} from 'react-bootstrap'
import {FaPlusCircle} from 'react-icons/fa'
import {proxy} from '../../conf'
import {setBuildings, setCenters, setExistingBuilding, setExistingRoomsForBuilding} from './buildings-slice'

let errors_: string = ''

const BuildingsAdd: React.FC = () => {
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

  const [loading, setLoading] = useState<boolean>(false)
  const [centers, setCentersList] = useState<any>([])
  const [building, setBuilding] = useState<{
    buildingName: string,
    centerName: string
  }>({
    buildingName: '',
    centerName: ''
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
    getCenters().then(() => {
    })
  }, [])

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
        const response = await fetch(`${proxy}/buildings/buildings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(building)
        })
        const responseData = await response.json()
        buildingList = {...buildingList, responseData}
        await dispatch(setBuildings(buildingList))
        if (responseData.exists) {
          errors_ = responseData.message
          await dispatch(setExistingBuilding(true))
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

  const resetValues = async () => {
    setLoading(true)
    building.buildingName = ''
    building.centerName = ''
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
        <Form.Row>
          <Form.Group>
            <Button variant='success'
                    type='submit'
                    onClick={handleSubmit}
                    style={{
                      marginLeft: '25%',
                      marginTop: '10%',
                      fontSize: 'large',
                      textTransform: 'uppercase'
                    }}>
              <FaPlusCircle style={{
                marginRight: '4px',
                marginBottom: '-2px'
              }}/>
              Add Building
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

export default BuildingsAdd
