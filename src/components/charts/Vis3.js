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

const URL = 'http://localhost:3000/api/visualization3'
function Vis3() {
  const [show, setShow] = useState(true)
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
  function toggleData() {
    generateMunaData()
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
        // data: data,
        data: data.filter((item) => item['annual'] === show),
        showLine: true,
        borderColor: `${show ? 'rgb(99, 255, 132)' : 'rgb(255, 99, 132)'}`,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    setDatasets(datasets)
  }

  const options = {
    type: 'line',
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'DD T',
        },
        title: {
          display: true,
          text: 'date',
        },
      },
      y: {
        title: {
          display: true,
          text: `${show ? 'monthly average' : 'mean'}`,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${
          show
            ? 'Mauna Loa CO2 monthy mean data'
            : 'Mauna Loa CO2 annual mean data'
        }`,
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

  return (
    <>
      <div>Vis3</div>
      <div>Data length: {data.length}</div>
      <button onClick={() => toggleData()}>
        {' '}
        {show ? 'Show Annual Data' : 'Show Monthly Data'}
      </button>
      <Scatter
        data={{ datasets: datasets }}
        options={show ? options : options}
      />
    </>
  )
}

export default Vis3
