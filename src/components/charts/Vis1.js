import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-luxon'
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
  Legend
)
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
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
}

const URL = 'http://localhost:3000/api/visualization1'

function Vis1() {
  const [data, setData] = useState({ vis1: [], vis2: [] })
  const [datasets, setDatasets] = useState([])
  const [annual, setAnnual] = useState(true)

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        let data = response.data || []
        setData({ vis1: data, vis2: [] })
        generateDatasets()
      })
      .catch((e) => {
        alert(e)
      })
  }, [])

  function toggleAnnual() {
    setAnnual(!annual)
    generateDatasets()
  }

  function generateDatasets() {
    const tempDatasets = [
      {
        label: 'Northern Hemisphere Temperature',
        data: data.vis1.filter(
          (item) => item['hemisphere'] === 1 && item['annual'] === annual
        ),
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Southern Hemisphere Temperature',
        data: data.vis1.filter(
          (item) => item['hemisphere'] === 2 && item['annual'] === annual
        ),
        showLine: true,
        borderColor: 'rgb(99, 255, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Global Temperature',
        data: data.vis1.filter(
          (item) => item['hemisphere'] === 0 && item['annual'] === annual
        ),
        showLine: true,
        borderColor: 'rgb(99, 99, 255)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Northern Hemisphere 2,000-year temperature reconstruction',
        data: data.vis2,
        showLine: true,
        borderColor: 'rgb(225, 225, 255)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    // console.log(tempDatasets[0].data.length)
    setDatasets(tempDatasets)
  }

  return (
    <>
      <h2>Vis1</h2>
      <h3>Datalength {data.vis1.length}</h3>
      <h3>Datasetlength {datasets.length ? datasets[0].length : 0}</h3>
      <button onClick={() => toggleAnnual()}>
        {annual ? 'Annual' : 'Monthly'}
      </button>
      <Line data={{ datasets: datasets }} options={options} />
    </>
  )
}

export default Vis1
