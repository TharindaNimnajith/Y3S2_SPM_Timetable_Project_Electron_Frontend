import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Row, Spinner, Table} from 'react-bootstrap'
import {Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, Tooltip, XAxis, YAxis} from 'recharts'
import {proxy} from '../../conf'
import {setLecturersFacultyStatistics} from './lecturers-statistics-slice'

let errors_: string = ''
let data: any = []

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#D0ED57',
  '#8884D8',
  '#8DD1E1',
  '#50fa00'
]

const LecturersFacultyStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [lecturersFacultyStatisticsArray, setLecturersFacultyStatisticsArray] = useState<any>([])

  const getLecturersFacultyStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/lecturersStatistics/lecturerCountByFaculty`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setLecturersFacultyStatisticsArray(responseData)
      await dispatch(setLecturersFacultyStatistics(responseData))
      data = []
      for (let i = 0; i < responseData.length; i++) {
        data = [...data,
          {
            name: responseData[i]._id.faculty,
            value: responseData[i].lecturersCount,
            count: responseData[i].lecturersCount
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
    getLecturersFacultyStatistics().then(() => {
    })
  }, [])

  return (
    <div>
      <h5 className='text-center'>
        Number of Lecturers per Faculty
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
      <div>
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
            Faculty
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
            Count
          </th>
          </thead>
          <tbody>
          {
            lecturersFacultyStatisticsArray && lecturersFacultyStatisticsArray.map((lecturersFacultyStatisticsArrayElement: any) => {
              return (
                <tr key={lecturersFacultyStatisticsArrayElement._id.faculty}>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {lecturersFacultyStatisticsArrayElement._id.faculty}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {lecturersFacultyStatisticsArrayElement.lecturersCount}
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </Table>
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
      <div style={{
        marginTop: '20px'
      }}>
        <div>
          <Row>
            <BarChart width={500}
                      height={300}
                      data={data}>
              <CartesianGrid strokeDasharray='3 3'/>
              <XAxis dataKey='name'/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey='count'
                   fill='#8884d8'
                   label={{
                     position: 'center',
                     color: 'black'
                   }}>
                {
                  data.map((_entry: any, index: number) => (
                    <Cell key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}/>
                  ))
                }
              </Bar>
            </BarChart>
          </Row>
        </div>
        <div>
          <Row>
            <PieChart width={550}
                      height={400}>
              <Pie data={data}
                   cx={280}
                   cy={200}
                   outerRadius={150}
                   fill='#8884d8'
                   dataKey='value'
                   isAnimationActive={true}
                   labelLine={false}
                   label>
                {
                  data.map((_entry: any, index: number) => (
                    <Cell key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}/>
                  ))
                }
              </Pie>
              <Tooltip/>
            </PieChart>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default LecturersFacultyStatistics
