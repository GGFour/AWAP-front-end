import React, { useEffect, useState } from 'react'
import { Scatter } from 'react-chartjs-2'
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

function getOptions(title, scales) {
  const options = {
    responsive: true,
    showLine: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: scales,
  }

  return options
}

const scales = {
  x: {
    locale: 'en-US',
    type: 'linear',
    ticks: {
      callback: function (value) {
        return String(parseInt(value))
      },
    },
    title: {
      display: true,
      text: 'Year',
    },
  },
  y: {
    type: 'linear',
    title: {
      display: true,
      text: 'CO2 Mt',
    },
  },
}

const URL = 'http://localhost:3000/api/visualization8'
const STD = { data: [] }

function Vis8() {
  const [data, setData] = useState(STD)
  const [datasets, setDatasets] = useState([])

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => {
        alert(err)
      })
  }, [])

  useEffect(() => {
    setDatasets(generateDatasets())
  }, [data])

  function generateDatasets() {
    const countries = data.data
      .map((e) => e.country)
      .filter((value, index, self) => {
        return self.indexOf(value) === index
      })
    const datasets = countries.map((country, idx) => {
      return {
        label: country,
        data: data.data.filter((item) => item.country == country),
        showLine: true,
        borderColor: `hsl(${idx * (256 / countries.length)}, 50%, 50%)`,
        backgroundColor: 'rgba(256, 256, 256, 0.75)',
        tooltip: {
          enabled: true,
          callbacks: {
            beforeLabel: () => country,
            label: (context) => context.raw.y.toFixed(2) + ' Mt',
          },
        },
      }
    })
    return datasets
  }

  return (
    <>
      <div>Vis8</div>
      <div>Data length: {data.length}</div>
      <div>Datasets length: {datasets.length}</div>
      <Scatter
        data={{ datasets: datasets }}
        options={getOptions(data.name, scales)}
      />
    </>
  )
}

export default Vis8
