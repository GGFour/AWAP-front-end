import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom'
import axios from 'axios'
import 'chartjs-adapter-luxon'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
  Tooltip,
  Legend,
  zoomPlugin
)

export const options = {
  responsive: true,
  scales: {
    x: {
      type: 'time',
      title: {
        display: true,
        text: 'Years',
      },
    },
    y: {
      title: {
        display: true,
        text: 'CO2 Mixing Ratio Ppm',
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Temperature in hemisphere',
    },
    zoom: {
      pan: {
        enabled: true,
        mode: 'x',
      },
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
const URL1 = 'http://localhost:3000/api/visualization?id=4'
const URL2 = 'http://localhost:3000/api/visualization?id=3'
function Vis4() {
  const [data, setData] = useState({ iceData: [], co2Data: [] })
  const [datasets, setDatasets] = useState([])
  useEffect(() => {
    const req1 = axios.get(URL1)
    const req2 = axios.get(URL2)
    axios
      .all([req1, req2])
      .then(
        axios.spread((...response) => {
          let data1 = response[0].data.data
          data1.filter((item) => item['annual'] === true)
          let data2 = response[1].data.data
          setData({ iceData: data1, co2Data: data2 })
        })
      )
      .catch((e) => {
        alert(e)
      })
  }, [])
  useEffect(() => {
    generateDatasets()
  }, [data])

  function generateDatasets() {
    const tempDatasets = [
      {
        label: 'DE08 Ice Core',
        data: data.iceData.filter((item) => item['sample_id'] === 'DE08'),
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        parsing: {
          xAxisKey: 'airAgeAD',
          yAxisKey: 'CO2MixingRatioPpm',
        },
      },
      {
        label: 'DE08-2 Ice Core',
        data: data.iceData.filter((item) => item['sample_id'] === 'DE08-2'),
        showLine: true,
        borderColor: 'rgb(99, 255, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'DSS Ice Core',
        data: data.iceData.filter((item) => item['sample_id'] === 'DSS'),
        showLine: true,
        borderColor: 'rgb(99, 99, 255)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Mauna Loa measurements',
        data: data.co2Data,
        showLine: true,
        borderColor: 'rgb(99, 99, 255)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    setDatasets(tempDatasets)
  }

  return (
    <>
      <h2>Vis4</h2>
      <div>Data Length: {data.length}</div>
      <Line data={{ datasets: datasets }} options={options} />
    </>
  )
}

export default Vis4
