import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Spinner, Table} from 'react-bootstrap'
import {proxy} from '../../conf'
import {setStudentsYearSemesterProgrammeStatistics} from './students-statistics-slice'

let errors_: string = ''
let data: any = []

const StudentsYearSemesterProgrammeStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [studentsYearSemesterProgrammeStatisticsArray, setStudentsYearSemesterProgrammeStatisticsArray] = useState<any>([])

  const getStudentsYearSemesterProgrammeStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/studentsStatistics/groupsCountByAcademicYearSemesterAndProgramme`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setStudentsYearSemesterProgrammeStatisticsArray(responseData)
      await dispatch(setStudentsYearSemesterProgrammeStatistics(responseData))
      setLoading(false)
      data = []
      for (let i = 0; i < responseData.length; i++) {
        data = [...data,
          {
            academicYearSemesterAndProgramme: responseData[i].academicYearSemesterAndProgramme,
            groupsCount: responseData[i].groupsCount,
            subGroupsCount: responseData[i].subGroupsCount
          }
        ]
      }
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getStudentsYearSemesterProgrammeStatistics().then(() => {
    })
  }, [])

  return (
    <div>
      <h5 className='text-center'>
        Number of Groups and Sub Groups per Programme
      </h5>
      {
        loading && (
          <Spinner animation='border'
                   style={{
                     textAlign: 'center',
                     marginLeft: '50%'
                   }}/>
        )
      }
      <div style={{
        marginTop: '20px'
      }}>
        <Table responsive
               striped
               bordered
               hover
               size='sm'
               style={{
                 border: 'solid darkblue 1px',
                 marginTop: '10px'
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
            Programme Name
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Groups Count
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            borderRight: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Sub Groups Count
          </th>
          </thead>
          <tbody>
          {
            studentsYearSemesterProgrammeStatisticsArray && studentsYearSemesterProgrammeStatisticsArray.map((studentsYearSemesterProgrammeStatisticsArrayElement: any) => {
              return (
                <tr key={studentsYearSemesterProgrammeStatisticsArrayElement.academicYearSemesterAndProgramme}>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {studentsYearSemesterProgrammeStatisticsArrayElement.academicYearSemesterAndProgramme}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {studentsYearSemesterProgrammeStatisticsArrayElement.groupsCount}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {studentsYearSemesterProgrammeStatisticsArrayElement.subGroupsCount}
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

export default StudentsYearSemesterProgrammeStatistics
