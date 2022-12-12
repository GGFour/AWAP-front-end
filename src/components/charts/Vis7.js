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
    type: 'linear',
    reverse: true,
    title: {
      display: true,
      text: 'Thousands of years BP',
    },
  },
  y: {
    type: 'linear',
    position: 'left',
    title: {
      display: true,
      text: 'CO2 Mixing Ratio (ppm)',
    },
  },
  y2: {
    type: 'linear',
    position: 'right',
    title: {
      display: true,
      text: 'Surface Temperature Change ℃',
    },
  },
}

const URL1 = 'http://localhost:3000/api/visualization?id=6'
const URL2 = 'http://localhost:3000/api/visualization?id=7'
const STD = { data: [] }

function Vis7() {
  const [datasets, setDatasets] = useState([])
  const [temperatureData, setTemperatureData] = useState(STD)
  const [co2Data, setCo2Data] = useState(STD)

  useEffect(() => {
    const req1 = axios.get(URL1)
    const req2 = axios.get(URL2)
    axios
      .all([req1, req2])
      .then(
        axios.spread((...response) => {
          let data1 = response[0].data
          data1.data = data1.data.map((item) => {
            item['x'] /= 1000
            return item
          })
          setCo2Data(data1)

          let data2 = response[1].data
          setTemperatureData(data2)
        })
      )
      .catch((e) => {
        alert(e)
      })
  }, [])

  useEffect(() => {
    generateAnnualData()
  }, [temperatureData, co2Data])

  function generateAnnualData() {
    const datasets = [
      {
        yAxisID: 'y',
        label: 'co2 ppm',
        data: co2Data.data,
        showLine: true,
        borderColor: ' rgb(0, 0, 255) ',
        backgroundColor: 'rgb(255,0,0)',
        parsing: false,
        fill: false,
      },
      {
        yAxisID: 'y2',
        label: 'surface temperature change',
        data: temperatureData.data,
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        parsing: false,
        fill: false,
      },
    ]
    setDatasets(datasets)
  }

  return (
    <div className="vis-div">
      <h2>{temperatureData.name}</h2>
      <div className="chart">
        <Scatter
          data={{ datasets: datasets }}
          options={getOptions(temperatureData.name, scales)}
        />
      </div>
      <h3>Description</h3>
      <text>{temperatureData.description}</text>
      <h3>Sources:</h3>
      <a href={temperatureData.source}>{temperatureData.name}</a>
      <br />
      <br />
    </div>
  )
}

export default Vis7
