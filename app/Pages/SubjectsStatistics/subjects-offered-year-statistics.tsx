import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Spinner, Table} from 'react-bootstrap'
import {Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, Tooltip, XAxis, YAxis} from 'recharts'
import {proxy} from '../../conf'
import {setSubjectsOfferedYearStatistics} from './subjects-statistics-slice'

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

const SubjectsOfferedYearStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [subjectsOfferedYearStatisticsArray, setSubjectsOfferedYearStatisticsArray] = useState<any>([])

  const getSubjectsOfferedYearStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/subjectsStatistics/subjectsCountByOfferedYear`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setSubjectsOfferedYearStatisticsArray(responseData)
      await dispatch(setSubjectsOfferedYearStatistics(responseData))
      data = []
      for (let i = 0; i < responseData.length; i++) {
        data = [...data,
          {
            name: 'Year ' + responseData[i]._id.offeredYear,
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
    getSubjectsOfferedYearStatistics().then(() => {
    })
  }, [])

  return (
    <div>
      <h5 className='text-center'>
        Number of Subjects by Offered Year
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
            Offered Year
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
            subjectsOfferedYearStatisticsArray && subjectsOfferedYearStatisticsArray.map((subjectsOfferedYearStatisticsArrayElement: any) => {
              return (
                <tr key={subjectsOfferedYearStatisticsArrayElement._id.offeredYear}>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    Year {subjectsOfferedYearStatisticsArrayElement._id.offeredYear}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {subjectsOfferedYearStatisticsArrayElement.subjectsCount}
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
        marginLeft: '-45px'
      }}>
        <BarChart width={460}
                  height={320}
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
      <div>
        <PieChart width={360}
                  height={340}>
          <Pie data={data}
               cx={200}
               cy={160}
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
    </div>
  )
}

export default SubjectsOfferedYearStatistics
