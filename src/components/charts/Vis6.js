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
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Age, gas, calendar years before present (y)',
      },
    },
    y: {
      title: {
        display: true,
        text: 'CO2 Mixing Ratio PpmCO2 concentration (ppm)',
      },
    },
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
const URL = 'http://localhost:3000/api/visualization6'
function Vis6() {
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
    setDatasets(generateIceCoreData(data))
  }, [data])

  function generateIceCoreData(data) {
    const iceCoreDatasets = [
      {
        label: 'Ice core 800k year composite study CO2 measurements',
        data: data,
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    return iceCoreDatasets
  }

  return (
    <>
      <div>Vis6</div>
      <div>Data length: {data.length}</div>
      <Scatter data={{ datasets: datasets }} options={options} />
    </>
  )
}

export default Vis6
