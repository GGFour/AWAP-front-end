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
  parsing: false,
  responsive: true,

  scales: {
    x: {
      type: 'linear',
      title: {
        display: true,
        text: 'Year',
      },
    },
    y: {
      type: 'linear',
      position: 'left',
      title: {
        display: true,
        text: 'Co2 ppm',
      },
    },
    y2: {
      type: 'linear',
      position: 'right',
      title: {
        display: true,
        text: 'Surface Temperature Change',
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Evolution of global temperature over the past two',
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

const URL1 = 'http://localhost:3000/api/visualization6'
const URL2 = 'http://localhost:3000/api/visualization7'
function Vis7() {
  const [data, setData] = useState({ tempData: [], co2Data: [] })
  const [datasets, setDatasets] = useState([])

  useEffect(() => {
    const req1 = axios.get(URL1)
    const req2 = axios.get(URL2)
    axios
      .all([req1, req2])
      .then(
        axios.spread((...response) => {
          let data1 = response[0].data.data
          let data2 = response[1].data.data
          setData({ tempData: data1, co2Data: data2 })
        })
      )
      .catch((e) => {
        alert(e)
      })
  }, [])

  useEffect(() => {
    generateAnnualData()
  }, [data])

  function generateAnnualData() {
    const datasets = [
      {
        yAxisID: 'y',
        label: 'co2 ppm',
        data: data.tempData,
        showLine: true,
        borderColor: ' rgb(0, 0, 255) ',
        backgroundColor: 'rgb(255,0,0)',
        parsing: false,
      },
      {
        yAxisID: 'y2',
        label: 'surface temperature change',
        data: data.co2Data,
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        parsing: false,
      },
    ]
    setDatasets(datasets)
  }

  return (
    <>
      <div>Vis7</div>
      <div>Data2 length: {data.tempData.length}</div>
      <div>Data3 length: {data.co2Data.length}</div>
      <Scatter data={{ datasets: datasets }} options={options} />
    </>
  )
}

export default Vis7
