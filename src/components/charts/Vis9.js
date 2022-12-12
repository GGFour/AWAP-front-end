import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
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
  ArcElement,
} from 'chart.js'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  maintainAspectRatio: false,
  // responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Global greenhouse gas emissions by sector',
    },
  },
}

const URL = process.env.REACT_APP_API_ADDRESS + '/api/visualization?id=9'

function Vis9() {
  const [rawData, setRawData] = useState({ data: [] })
  const [data, setData] = useState({ labels: [], datasets: [] })

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        let data = response.data
        data.data = data.data.sort((a, b) => {
          if (a.sector > b.sector) {
            return 1
          }
          if (a.sector < b.sector) {
            return -1
          }
          return 0
        })
        setRawData(data)
      })
      .catch((e) => {
        alert(e)
      })
  }, [])

  useEffect(() => {
    generateDatasets()
  }, [rawData])

  function getSectorData(data) {
    let res = Object.values(
      data.reduce((prev, curr) => {
        if (curr.sector in prev) {
          prev[curr.sector] += curr['val']
        } else {
          prev[curr.sector] = curr['val']
        }
        return prev
      }, {})
    )

    return res
  }

  function generateDatasets() {
    const labels = rawData.data
      .map((e) => e.sector)
      .filter((value, index, self) => {
        return self.indexOf(value) === index
      })
    const sublabels = rawData.data.map((e) => e['subsector'])

    const data = {
      labels: labels.concat(sublabels),
      datasets: [
        {
          label: 'Sub-sectors',
          data: labels.map(() => 0).concat(rawData.data.map((e) => e['val'])),
          backgroundColor: [
            // Agriculture
            'rgba(71, 106, 31, 0.8)',
            'rgba(71, 106, 31, 0.1)',
            'rgba(71, 106, 31, 0.2)',
            'rgba(71, 106, 31, 0.3)',
            'rgba(71, 106, 31, 0.4)',
            'rgba(71, 106, 31, 0.5)',
            'rgba(71, 106, 31, 0.6)',
            'rgba(71, 106, 31, 0.7)',
            'rgba(71, 106, 31, 0.8)',
            'rgba(71, 106, 31, 1)',
            'rgba(71, 106, 31, 0.4)',
            //Energy
            'rgba(250, 0, 5, 0.6)',
            'rgba(245, 0, 10, 0.6)',
            'rgba(240, 0, 15, 0.6)',
            'rgba(235, 0, 20, 0.6)',
            'rgba(230, 0, 25, 0.6)',
            'rgba(225, 0, 30, 0.6)',
            'rgba(220, 0, 35, 0.6)',
            'rgba(215, 0, 40, 0.6)',
            'rgba(210, 0, 45, 0.6)',
            'rgba(205, 0, 50, 0.6)',
            'rgba(200, 0, 55, 0.6)',
            'rgba(195, 0, 60, 0.6)',
            'rgba(190, 0, 65, 0.6)',
            'rgba(185, 0, 70, 0.6)',
            'rgba(180, 0, 75, 0.6)',
            'rgba(250, 0, 80, 0.6)',
            'rgba(250, 0, 85, 0.6)',
            'rgba(255, 0, 90, 0.8)',
            //Industry
            'rgba(31, 50, 176, 0.3)',
            'rgba(31, 50, 176, 0.5)',
            //Waste
            'rgba(109, 121, 138, 0.8)',
            'rgba(109, 121, 138, 0.5)',
          ],
        },
        {
          label: 'Sectors',
          data: getSectorData(rawData.data),
          backgroundColor: [
            'rgba(71, 176, 31, 0.8)',
            'rgba(255, 0, 0, 0.8)',
            'rgba(31, 50, 176, 0.8)',
            'rgba(109, 121, 138, 0.8)',
          ],
        },
      ],
    }
    setData(data)
  }

  return (
    <div className="vis-div">
      <h2>{rawData.name}</h2>
      <div className="chart">
        <Pie options={options} data={data} />
      </div>
      <h3>Description</h3>
      <text>{rawData.description}</text>
      <h3>Sources:</h3>
      <a href={rawData.source}>{rawData.name}</a>
      <br />
      <br />
    </div>
  )
}

export default Vis9
