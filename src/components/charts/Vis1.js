import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import DATA from '../../data/vis1/vis1.json'
import zoomPlugin from 'chartjs-plugin-zoom'
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
  parsing: {
    xAxisKey: 'Time',
    yAxisKey: 'Anomaly (deg C)',
  },
  scales: {
    x: {
      type: 'time',
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Temperature ℃',
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

function Vis1() {
  const [data, setData] = useState([])
  const [datasets, setDatasets] = useState([])
  const [annual, setAnnual] = useState(true)

  useEffect(() => {
    setData(DATA)
    generateDatasets()
  }, [data])

  function toggleAnnual() {
    setAnnual(!annual)
    generateDatasets()
  }

  function generateDatasets() {
    const tempDatasets = [
      {
        label: 'Northern Hemisphere Temperature',
        data: data.filter(
          (item) =>
            item['Hemisphere'] === 'Northern' && item['Annual'] === annual
        ),
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Southern Hemisphere Temperature',
        data: data.filter(
          (item) =>
            item['Hemisphere'] === 'Southern' && item['Annual'] === annual
        ),
        showLine: true,
        borderColor: 'rgb(99, 255, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Global Temperature',
        data: data.filter(
          (item) => item['Hemisphere'] === 'Global' && item['Annual'] === annual
        ),
        showLine: true,
        borderColor: 'rgb(99, 99, 255)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    setDatasets(tempDatasets)
  }

  return (
    <>
      <h2>Vis1</h2>
      <button onClick={() => toggleAnnual()}>
        {annual ? 'Annual' : 'Monthly'}
      </button>
      <Line data={{ datasets: datasets }} options={options} />
    </>
  )
}

export default Vis1
