import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import DATA from '../../data/vis4/vis4.json'
import co2data from '../../data/vis3/annualMeanCO2.json'
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
  /*   parsing: {
    xAxisKey: 'analysisDate',
    yAxisKey: 'CO2MixingRatioPpm',
    }, */
    scales: {
        x: {
            type: 'time',
            title: {
                display: true,
                text: 'Years',
            },
        },
        y: {
            title: {
                display: true,
                text: 'CO2 Mixing Ratio Ppm',
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

function Vis4() {
    const [data, setData] = useState({iceData:[], co2Data:[]});
    const [datasets, setDatasets] = useState([])

    useEffect(() => {
        // setData(DATA)
        setData({iceData:DATA, co2Data:co2data})
        generateDatasets()
    }, [data])

    function generateDatasets() {
        const tempDatasets = [
            {
                label: 'DE08 Ice Core',
                data: data.iceData.filter(
                    (item) =>
                      item['iceId'] === 'DE08' 
                  ),
                showLine: true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                parsing: {
                    xAxisKey: 'airAgeAD',
                    yAxisKey: 'CO2MixingRatioPpm',
                },
            },
            {
                label: 'DE08-2 Ice Core',
                data:data.iceData.filter(
                    (item) =>
                      item['iceId'] === 'DE08-2'
                  ),
                showLine: true,
                borderColor: 'rgb(99, 255, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                parsing: {
                    xAxisKey: 'airAgeAD',
                    yAxisKey: 'CO2MixingRatioPpm',
                },
            },
            {
                label: 'DSS Ice Core',
                data: data.iceData.filter(
                    (item) =>
                      item['iceId'] === 'DSS'
                  ),
                showLine: true,
                borderColor: 'rgb(99, 99, 255)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                parsing: {
                    xAxisKey: 'airAgeAD',
                    yAxisKey: 'CO2MixingRatioPpm',
                },
            },
            {   
                label: 'Mauna Loa measurements',
                data: data.co2Data,
                showLine: true,
                borderColor: 'rgb(99, 99, 255)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                parsing: {
                    xAxisKey: 'year',
                    yAxisKey: 'mean',
                },
            },

        ]
        setDatasets(tempDatasets)
    }

    return (
        <>
            <h2>Vis4</h2>
            <div>Data Length: {data.length}</div>
            <Line data={{ datasets: datasets }} options={options} />
        </>
    )
}

export default Vis4

