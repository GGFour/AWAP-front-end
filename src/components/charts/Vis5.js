import React, { useEffect, useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import DATA from './vis5.json'
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
    xAxisKey: 'Mean age of the air (yr BP)',
    yAxisKey: 'CO2 concentration',
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Vostok Ice Core CO2 measurements, 417160 - 2342 years',
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
    pan: {
      enabled: true,
      mode: 'x',
    },
  },
}

function Vis5() {
  const [data, setData] = useState([])
  const [datasets, setDatasets] = useState([])

  useEffect(() => {
    setData(DATA)
    setDatasets(generateCo2Data(data))
  }, [data])

  function generateCo2Data(data) {
    const CO2Datasets = [
      {
        label: 'Vostok Ice Core CO2 measurements',
        data: data.filter((item) => item['CO2 concentration']),
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    return CO2Datasets
  }

  return (
    <>
      <div>Vis5</div>
      <div>Data length: {data.length}</div>
      <Scatter data={{ datasets: datasets }} options={options} />
    </>
  )
}

export default Vis5
