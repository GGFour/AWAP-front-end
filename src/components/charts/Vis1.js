import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import DATA1 from '../../data/vis1/vis1.json'
import DATA2 from '../../data/vis2.json'
import 'chartjs-adapter-luxon'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
export const options = {
  responsive: true,
  parsing: {
    xAxisKey: 'Time',
    yAxisKey: 'Anomaly (deg C)',
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: 'x',
      },
    },
  },
}

function Vis1() {
  const [data, setData] = useState({ vis1: [], vis2: [] })
  const [datasets, setDatasets] = useState([])

  useEffect(() => {
    let processedVis2 = DATA2.map((item) => ({
      Time: String(item.Year).padStart(4, '0'),
      'Anomaly (deg C)': item.T,
    }))
    setData({ vis1: DATA1, vis2: processedVis2 })
    generateDatasets()
    console.log('useEffect')
  }, [data])

  function generateAnnualData(data) {
    const tempDatasets = [
      {
        label: 'Northern Hemisphere Temperature',
        data: data.vis1.filter(
          (item) =>
            item['Hemisphere'] === 'Northen' && item['Annual'] === 'TRUE'
        ),
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Southern Hemisphere Temperature',
        data: data.vis1.filter(
          (item) =>
            item['Hemisphere'] === 'Southern' && item['Annual'] === 'TRUE'
        ),
        showLine: true,
        borderColor: 'rgb(99, 255, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Global Temperature',
        data: data.vis1.filter(
          (item) => item['Hemisphere'] === 'Global' && item['Annual'] === annual
        ),
        showLine: true,
        borderColor: 'rgb(99, 99, 255)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Northern Hemisphere 2,000-year temperature reconstruction',
        data: data.vis2,
        showLine: true,
        borderColor: 'rgb(225, 225, 255)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    // console.log(tempDatasets[0].data.length)
    return tempDatasets
  }

  return (
    <>
      <h2>Vis1</h2>
      <div>data length: {data.vis1.length + data.vis2.length}</div>
      <button onClick={() => toggleAnnual()}>
        {annual ? 'Annual' : 'Monthly'}
      </button>
      <Line data={{ datasets: datasets }} options={options} />
    </>
  )
}

export default Vis1
