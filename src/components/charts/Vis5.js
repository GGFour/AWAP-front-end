import React, { useEffect, useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom'
import axios from 'axios'
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
  scales: {
    x: {
      title: {
        display: true,
        text: 'Mean age of the air (yr BP)',
      },
    },
    y: {
      title: {
        display: true,
        text: 'CO2 concentration',
      },
    },
  },
  responsive: true,
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

const URL = 'http://localhost:3000/api/visualization5'
function Vis5() {
  const [data, setData] = useState([])
  const [datasets, setDatasets] = useState([])

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        let data = response.data.data
        setData(data)
      })
      .catch((e) => {
        alert(e)
      })
  }, [])

  useEffect(() => {
    setDatasets(generateCo2Data(data))
  }, [data])

  function generateCo2Data(data) {
    const cO2Datasets = [
      {
        label: 'Vostok Ice Core CO2 measurements',
        data: data,
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    return cO2Datasets
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
