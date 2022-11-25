import React, { useEffect, useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import DATA from '../../data/vis8/vis8.json'
//import zoomPlugin from 'chartjs-plugin-zoom'
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
  //zoomPlugin
)

export const options = {
  responsive: true,
  parsing: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'CO2 emissions by country',
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

function Vis8() {
  const [data, setData] = useState([])
  const [countries, setCountries] = useState([])
  const [datasets, setDatasets] = useState([])

  useEffect(() => {
    setCountries(
      DATA.map((e) => e.country).filter((value, index, self) => {
        return self.indexOf(value) === index
      })
    )
    setData(DATA)
  }, [])

  useEffect(() => {
    setDatasets(generateDatasets())
  }, [data])

  function generateDatasets() {
    const datasets = countries.map((country, idx) => {
      return {
        label: country,
        data: data
          .filter((item) => item.country == country)
          .map((item) => ({
            x: Number.parseInt(item.year),
            y: item['CO2_Mt'],
          })),
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
    // alert('datasets generated ' + data.length + ' ' + countries.length)
    return datasets
  }

  return (
    <>
      <div>Vis6</div>
      <div>Data length: {data.length}</div>
      <div>countries length: {countries.length}</div>
      <div>Datasets length: {datasets.length}</div>
      <Scatter data={{ datasets: datasets }} options={options} />
    </>
  )
}

export default Vis8
