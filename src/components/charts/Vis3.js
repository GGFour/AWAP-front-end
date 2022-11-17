import React, { useEffect, useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import DATA from './annualMeanCO2.json'
import DATA2 from './monthlyMeanCO2.json'
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

function Vis3() {
  const [show, setShow] = useState(true)
  const [data, setData] = useState([])
  const [datasets, setDatasets] = useState([])

  useEffect(() => {
    {
      generateAnnualData()
    }
  }, [data])

  function toggleData() {
    setShow(!show)
    generateAnnualData()
    setData(show ? DATA : DATA2)
  }

  function generateAnnualData() {
    const datasets = [
      {
        label: `${
          show
            ? 'Mauna Loa CO2 annual mean data'
            : 'Mauna Loa CO2 monthly mean data'
        }`,
        data: data,
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

    parsing: {
      xAxisKey: `${show ? 'decimal date' : 'year'}`,
      yAxisKey: `${show ? 'monthly average' : 'mean'}`,
    },

    scales: {
      x: {
        title: {
          display: true,
          text: `${show ? 'decimal date' : 'year'}`,
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
        {show ? 'Show Monthly Data' : 'Show Annual Data'}
      </button>
      <Scatter
        data={{ datasets: datasets }}
        options={show ? options : options}
      />
    </>
  )
}

export default Vis3
