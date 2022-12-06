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
    reverse: true,
    title: {
      display: true,
      text: 'Mean age of the air, yr BP',
    },
  },
  y: {
    title: {
      display: true,
      text: 'CO2 Mixing Ratio (ppm)',
    },
  },
}

const URL = 'http://localhost:3000/api/visualization?id=5'
const STD = { data: [] }

function Vis5() {
  const [data, setData] = useState(STD)
  const [datasets, setDatasets] = useState([])

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        let data = response.data
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
        data: data.data,
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    return cO2Datasets
  }

  return (
    <div className="container">
      <h2>{data.name}</h2>
      <div className="chart">
        <Scatter
          data={{ datasets: datasets }}
          options={getOptions(data.name, scales)}
        />
      </div>
      <h3>Description</h3>
      <text>{data.description}</text>
      <h3>Sources:</h3>
      <a href={data.source}>{data.name}</a>
      <br />
      <br />
    </div>
  )
}

export default Vis5
