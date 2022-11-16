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

export const options = {
  type: 'line',
  responsive: true,
  parsing: {
    xAxisKey: 'decimal date',
    yAxisKey: 'monthly average',
  },
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
export const options2 = {
  type: 'line',
  responsive: true,
  parsing: {
    xAxisKey: 'year',
    yAxisKey: 'mean',
  },
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

function Vis3() {
  const [show, setShow] = useState(true)
  const [data, setData] = useState([])
  const [datasets, setDatasets] = useState([])

  useEffect(() => {
    {
      show ? setData(DATA) : setData(DATA2)
      show
        ? setDatasets(generateAnnualData(data))
        : setDatasets(generateMonthyData(data))
    }
  }, [show, datasets, data])

  function generateAnnualData(data) {
    const MeanDatasets = [
      {
        label: 'Mauna Loa CO2 annual mean data',
        data: data.filter((item) => item['mean']),
        showLine: true,
        borderColor: 'rgb(99, 255, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    return MeanDatasets
  }
  function generateMonthyData(data) {
    const datasets = [
      {
        label: 'Mauna Loa CO2 monthly mean data',
        data: data.filter((item) => item['monthly average']),
        showLine: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    return datasets
  }

  return (
    <>
      <div>Vis3</div>
      <div>Data length: {data.length}</div>
      <button onClick={() => setShow(!show)}>
        {' '}
        {show ? 'Annual' : 'Monthly'}
      </button>
      <Scatter
        data={{ datasets: datasets }}
        options={show ? options : options2}
      />
    </>
  )
}

export default Vis3
