import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Col, Row, Spinner, Table} from 'react-bootstrap'
import {Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, Tooltip, XAxis, YAxis} from 'recharts'
import {proxy} from '../../conf'
import {setSubjectsOfferedYearSemesterStatistics} from './subjects-statistics-slice'

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

const SubjectsOfferedYearSemesterStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [subjectsOfferedYearSemesterStatisticsArray, setSubjectsOfferedYearSemesterStatisticsArray] = useState<any>([])

  const getSubjectsOfferedYearSemesterStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/subjectsStatistics/subjectsCountByOfferedYearAndSemester`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setSubjectsOfferedYearSemesterStatisticsArray(responseData)
      await dispatch(setSubjectsOfferedYearSemesterStatistics(responseData))
      data = []
      for (let i = 0; i < responseData.length; i++) {
        data = [...data,
          {
            name: responseData[i].yearAndSemester,
            value: responseData[i].subjectsCount,
            count: responseData[i].subjectsCount
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
    getSubjectsOfferedYearSemesterStatistics().then(() => {
    })
  }, [])

  return (
    <div>
      <h5 className='text-center'>
        Number of Subjects by Offered Semester
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
            Offered Semester
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
            subjectsOfferedYearSemesterStatisticsArray && subjectsOfferedYearSemesterStatisticsArray.map((subjectsOfferedYearSemesterStatisticsArrayElement: any) => {
              return (
                <tr key={subjectsOfferedYearSemesterStatisticsArrayElement._id.offeredYear}>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {subjectsOfferedYearSemesterStatisticsArrayElement.yearAndSemester}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {subjectsOfferedYearSemesterStatisticsArrayElement.subjectsCount}
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
        marginLeft: '-40px',
        marginTop: '20px'
      }}>
        <Row>
          <Col sm='7'>
            <div>
              <BarChart width={460}
                        height={450}
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
            </div>
          </Col>
          <Col sm='5'>
            <div>
              <PieChart width={370}
                        height={380}>
                <Pie data={data}
                     cx={180}
                     cy={220}
                     outerRadius={130}
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
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default SubjectsOfferedYearSemesterStatistics
