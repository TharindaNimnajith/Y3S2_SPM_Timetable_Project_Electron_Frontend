import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Card, Spinner} from 'react-bootstrap'
import {proxy} from '../../conf'
import {setSubjectsTotalCountStatistics} from './subjects-statistics-slice'

let errors_: string = ''

const SubjectsTotalCountStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [subjectsTotalCountStatisticsObject, setSubjectsTotalCountStatisticsObject] = useState<any>([])

  const getSubjectsTotalCountStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/subjectsStatistics/totalSubjectsCount`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setSubjectsTotalCountStatisticsObject(responseData)
      await dispatch(setSubjectsTotalCountStatistics(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getSubjectsTotalCountStatistics().then(() => {
    })
  }, [])

  return (
    <div>
      {
        loading && (
          <Spinner animation='border'
                   style={{
                     textAlign: 'center',
                     marginLeft: '50%'
                   }}/>
        )
      }
      {
        [
          'Info'
        ].map((variant, idx) => (
          <Card bg={variant.toLowerCase()}
                key={idx}
                text={
                  variant.toLowerCase() === 'light' ? 'dark' : 'white'
                }
                style={{
                  width: '16rem'
                }}
                className='mb-2'>
            <Card.Body>
              <Card.Title className='text-center'
                          style={{
                            fontSize: '28px',
                            textTransform: 'uppercase'
                          }}>
                Total Subjects Count
              </Card.Title>
              <Card.Text className='text-center'
                         style={{
                           marginTop: '5px',
                           fontSize: '110px'
                         }}>
                {subjectsTotalCountStatisticsObject.totalSubjectsCount}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      }
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

export default SubjectsTotalCountStatistics
