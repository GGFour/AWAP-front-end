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

function getOptions(title, scales) {
  return {
    maintainAspectRatio: false,
    // responsive: true,
    scales: scales,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
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
}

const scales = {
  x: {
    type: 'time',
    time: {
      tooltipFormat: 'DD T',
    },
    title: {
      display: true,
      text: 'Years',
    },
  },
  y: {
    title: {
      display: true,
      text: 'CO2 Mixing Ratio (ppm)',
    },
  },
}

const URL1 = 'http://localhost:3000/api/visualization?id=4'
const URL2 = 'http://localhost:3000/api/visualization?id=3'
const STD = { data: [] }

function Vis4() {
  const [iceData, setIceData] = useState(STD)
  const [co2Data, setCo2Data] = useState(STD)
  const [datasets, setDatasets] = useState([])

  useEffect(() => {
    const req1 = axios.get(URL1)
    const req2 = axios.get(URL2)
    axios
      .all([req1, req2])
      .then(
        axios.spread((...response) => {
          let data1 = response[0].data
          let data2 = response[1].data
          data2.data = data2.data.filter((item) => item['annual'] === true)
          setIceData(data1)
          setCo2Data(data2)
        })
      )
      .catch((e) => {
        alert(e)
      })
  }, [])

  useEffect(() => {
    generateDatasets()
  }, [iceData, co2Data])

  function generateDatasets() {
    const tempDatasets = [
      {
        label: 'DE08 Ice Core',
        data: iceData.data.filter((item) => item['sample_id'] === 'DE08'),
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'DE08-2 Ice Core',
        data: iceData.data.filter((item) => item['sample_id'] === 'DE08-2'),
        showLine: true,
        borderColor: 'rgb(99, 255, 132)',
      },
      {
        label: 'DSS Ice Core',
        data: iceData.data.filter((item) => item['sample_id'] === 'DSS'),
        showLine: true,
        borderColor: 'rgb(99, 99, 255)',
      },
      {
        label: 'Mauna Loa measurements',
        data: co2Data.data,
        showLine: true,
        borderColor: 'rgb(255, 99, 255)',
      },
    ]
    setDatasets(tempDatasets)
  }

  return (
    <>
      <h2>{iceData.name}</h2>
      <div className="chart">
        <Line
          data={{ datasets: datasets }}
          options={getOptions(iceData.name, scales)}
        />
      </div>
      <h3>Description</h3>
      <text>{iceData.description}</text>
      <h3>Sources:</h3>
      <a href={iceData.source}>{iceData.name}</a>
      <br />
      <br />
    </>
  )
}

export default Vis4
