import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Spinner} from 'react-bootstrap'
import {Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis} from 'recharts'
import {proxy} from '../../conf'
import {setStudentsYearSemesterStatistics} from './students-statistics-slice'

let errors_: string = ''
let data: any = []

const StudentsYearSemesterStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)

  const getStudentsYearSemesterStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/studentsStatistics/groupsCountByAcademicYearAndSemester`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      await dispatch(setStudentsYearSemesterStatistics(responseData))
      data = []
      for (let i = 0; i < responseData.length; i++) {
        data = [...data,
          {
            academicYearAndSemester: responseData[i].academicYearAndSemester,
            groupsCount: responseData[i].groupsCount,
            subGroupsCount: responseData[i].subGroupsCount,
            Groups: responseData[i].groupsCount,
            SubGroups: responseData[i].subGroupsCount
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
    getStudentsYearSemesterStatistics().then(() => {
    })
  }, [])

  return (
    <div>
      <h5 className='text-center'
          style={{
            marginLeft: '-15%'
          }}>
        Number of Groups and Sub Groups per Academic Semester
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
        <BarChart width={900}
                  height={320}
                  data={data}>
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis dataKey='academicYearAndSemester'/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey='Groups'
               fill='#8884d8'
               label={{
                 position: 'center',
                 color: 'black'
               }}>
            {
              data.map((_entry: any, index: number) => (
                <Cell key={`cell-${index}`}/>
              ))
            }
          </Bar>
          <Bar dataKey='SubGroups'
               fill='#82ca9d'
               label={{
                 position: 'center',
                 color: 'black'
               }}>
            {
              data.map((_entry: any, index: number) => (
                <Cell key={`cell-${index}`}/>
              ))
            }
          </Bar>
        </BarChart>
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey='academicYearAndSemester'/>
        <YAxis/>
        <Tooltip/>
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

export default StudentsYearSemesterStatistics
