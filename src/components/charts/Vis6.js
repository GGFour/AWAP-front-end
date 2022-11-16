import React, { useEffect, useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import DATA from './vis6.json'
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
    xAxisKey: 'Age, gas, calendar years before present (y)',
    yAxisKey: 'CO2 concentration (ppm)',
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

function Vis6() {
  const [data, setData] = useState([])
  const [datasets, setDatasets] = useState([])

  useEffect(() => {
    setData(DATA)
    setDatasets(generateIceCoreData(data))
  }, [data])

  function generateIceCoreData(data) {
    const IceCoreDatasets = [
      {
        label: 'Ice core 800k year composite study CO2 measurements',
        data: data.filter((item) => item['CO2 concentration (ppm)']),
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    return IceCoreDatasets
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
