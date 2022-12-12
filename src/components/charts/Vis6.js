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
      text: 'Age, gas, calendar years before present (y)',
    },
  },
  y: {
    title: {
      display: true,
      text: 'CO2 Mixing Ratio (ppm)',
    },
  },
}

const URL = process.env.REACT_APP_API_ADDRESS + '/api/visualization?id=6'
const STD = { data: [] }

function Vis6() {
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
    setDatasets(generateIceCoreData(data))
  }, [data])

  function generateIceCoreData(data) {
    const iceCoreDatasets = [
      {
        label: 'Ice core 800k year composite study CO2 measurements',
        data: data.data,
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    return iceCoreDatasets
  }

  return (
    <>
      <h2>{data.name}</h2>
      <div className="chart">
        <Scatter
          data={{ datasets: datasets }}
          options={getOptions('', scales)}
        />
      </div>
      <h3>Description</h3>
      <text>{data.description}</text>
      <h3>Sources:</h3>
      <a href={data.source}>{data.name}</a>
      <br />
      <br />
    </>
  )
}

export default Vis6
