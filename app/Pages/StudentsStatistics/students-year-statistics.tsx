import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Spinner} from 'react-bootstrap'
import {Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis} from 'recharts'
import {proxy} from '../../conf'
import {setStudentsYearStatistics} from './students-statistics-slice'

let errors_: string = ''
let data: any = []

const StudentsYearStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)

  const getStudentsYearStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/studentsStatistics/groupsCountByAcademicYear`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      await dispatch(setStudentsYearStatistics(responseData))
      data = []
      for (let i = 0; i < responseData.length; i++) {
        data = [...data,
          {
            academicYear: 'Year ' + responseData[i]._id.academicYear,
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
    getStudentsYearStatistics().then(() => {
    })
  }, [])

  return (
    <div>
      <h5 className='text-center'
          style={{
            marginLeft: '-15%'
          }}>
        Number of Groups and Sub Groups per Academic Year
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
          <XAxis dataKey='academicYear'/>
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
        <XAxis dataKey='academicYear'/>
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

export default StudentsYearStatistics
