import React, { useEffect, useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import DATA from '../../data/vis1/vis1.json'
import zoomPlugin from 'chartjs-plugin-zoom'
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
  Legend,
  zoomPlugin
)
export const options = {
  type: 'line',
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
  const [data, setData] = useState([])
  const [datasets, setDatasets] = useState([])

  useEffect(() => {
    setData(DATA)
    setDatasets(generateAnnualData(data))
  }, [data])

  function generateAnnualData(data) {
    const tempDatasets = [
      {
        label: 'Northern Hemisphere Temperature',
        data: data.filter(
          (item) =>
            item['Hemisphere'] === 'Northen' && item['Annual'] === 'TRUE'
        ),
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Southern Hemisphere Temperature',
        data: data.filter(
          (item) =>
            item['Hemisphere'] === 'Southern' && item['Annual'] === 'TRUE'
        ),
        showLine: true,
        borderColor: 'rgb(99, 255, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    // console.log(tempDatasets[0].data.length)
    return tempDatasets
  }

  return (
    <>
      <div>Vis1</div>
      <div>Data length: {data.length}</div>
      <Scatter data={{ datasets: datasets }} options={options} />
    </>
  )
}

export default Vis1
