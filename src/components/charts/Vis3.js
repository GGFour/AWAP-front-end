import React, { useEffect, useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom'
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
        zoom: {
          wheel: {
            enabled: true,
          },
          pan: {
            enabled: true,
            mode: 'x',
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

const URL = 'http://localhost:3000/api/visualization?id=3'
const STD = { data: [] }

function Vis3() {
  const [show, setShow] = useState(true)
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

  function toggleShow() {
    setShow(!show)
  }

  useEffect(() => {
    generateMunaData()
  }, [data, show])

  function generateMunaData() {
    const datasets = [
      {
        label: `${
          show
            ? 'Mauna Loa CO2 annual mean data'
            : 'Mauna Loa CO2 monthly mean data'
        }`,
        data: data.data.filter((item) => item['annual'] === show),
        showLine: true,
        borderColor: `${show ? 'rgb(99, 255, 132)' : 'rgb(255, 99, 132)'}`,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    setDatasets(datasets)
  }

  const scales = {
    x: {
      type: 'time',
      time: {
        unit: 'year',
        tooltipFormat: `yyyy${show ? '' : ' MMM'}`,
      },
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      title: {
        display: true,
        text: `${
          show ? 'Monthly mean' : 'Annual mean'
        } CO2 concentration (ppm)`,
      },
    },
  }

  return (
    <div className="container">
      <h2>{data.name}</h2>
      <button onClick={() => toggleShow()}>
        {show ? 'Show Monthly Data' : 'Show Annual Data'}
      </button>
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

export default Vis3
