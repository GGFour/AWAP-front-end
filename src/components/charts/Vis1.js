import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-luxon'
import ZoomPlugin from 'chartjs-plugin-zoom'
import axios from 'axios'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
  Tooltip,
  Legend,
  ZoomPlugin
)

function getOptions(title, scales) {
  const options = {
    // responsive: true,
    maintainAspectRatio: false,
    showLine: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
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
    scales: scales,
  }

  return options
}

const scales = {
  x: {
    type: 'time',
    time: {
      tooltipFormat: 'DD T',
    },
    title: {
      display: true,
      text: 'Date',
    },
  },
  y: {
    title: {
      display: true,
      text: 'Temperature Anomaly ℃',
    },
  },
}

const URL1 = 'http://localhost:3000/api/visualization?id=1'
const URL2 = 'http://localhost:3000/api/visualization?id=2'
const STD = { data: [] }

function Vis1() {
  const [vis1Data, setVis1Data] = useState(STD)
  const [vis2Data, setVis2Data] = useState(STD)
  const [datasets, setDatasets] = useState([])
  const [annual, setAnnual] = useState(true)

  useEffect(() => {
    getData(URL1, setVis1Data, STD)
    getData(URL2, setVis2Data, STD)
  }, [])

  function getData(URL, setFunction, std) {
    axios
      .get(URL)
      .then((response) => {
        let data = response.data || std
        setFunction(data)
      })
      .catch((e) => {
        alert(e)
      })
  }

  function toggleAnnual() {
    setAnnual(!annual)
  }

  useEffect(() => {
    generateDatasets()
  }, [vis1Data, vis2Data, annual])

  function generateDatasets() {
    const tempDatasets = [
      {
        label: 'Northern Hemisphere Temperature',
        data: vis1Data.data.filter(
          (item) => item['hemisphere'] === 1 && item['annual'] === annual
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Southern Hemisphere Temperature',
        data: vis1Data.data.filter(
          (item) => item['hemisphere'] === 2 && item['annual'] === annual
        ),
        borderColor: 'rgb(99, 255, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Global Temperature',
        data: vis1Data.data.filter(
          (item) => item['hemisphere'] === 0 && item['annual'] === annual
        ),
        borderColor: 'rgb(99, 99, 255)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: false,
      },
      {
        label: 'Northern Hemisphere 2,000-year temperature reconstruction',
        data: vis2Data.data,
        borderColor: 'rgb(225, 225, 255)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: false,
      },
    ]
    setDatasets(tempDatasets)
  }

  return (
    <div className="vis-div">
      <h2>{vis1Data.name}</h2>
      <button onClick={() => toggleAnnual()}>
        {annual ? 'Annual' : 'Monthly'}
      </button>
      <div className="chart">
        <Line
          data={{ datasets: datasets }}
          options={getOptions(`${vis1Data.name}`, scales)}
        />
      </div>
      <h3>Description</h3>
      <text>{vis1Data.description}</text>
      <text>{vis2Data.description}</text>
      <h3>Sources:</h3>
      <a href={vis1Data.source}>{vis1Data.name}</a>
      <a href={vis2Data.source}>{vis2Data.name}</a>
      <br />
      <br />
    </div>
  )
}

export default Vis1
