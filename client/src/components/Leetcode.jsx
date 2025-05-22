import React from 'react'
import TotalSolved from './TotalSolved'
import {Chart} from "react-google-charts"


const Leetcode = ({data}) => {
  // data.stats.calendar
  // data.username
  // data.stats.totalSolved

  
const subs = Object.entries(data.stats.totalSubmissions).map(([num, submissions]) => ([
  submissions.difficulty,
  submissions.count
]));

const chartdata = [
  ["Difficulty", "Solved"], ...subs.slice(1,4)
]

const options = {
    title: "Difficulty Wise Solved",
    pieHole: 0.4, // donut style
    legend: { position: 'bottom' },
    slices: [
       
      { color: '#06b2b0' }, 
      { color: '#fab533' }, 
      { color: '#f9333d' }, 
    ],
    chartArea: { width: '80%', height: '70%' },
   
    titleTextStyle: { fontSize: 16, bold: true },
    legendTextStyle: { fontSize: 14, bold: true },
  };



  return (
    <div className="flex flex-col gap-3 bg-gray">
       <h2 className="font-bold text-2xl text-blue-700"><span className='italic'>{data.username}</span> - Leetcode </h2>

      <div className="grid grid-cols-4 gap-5">

        <div className="flex flex-col justify-between w-2xs h-full">
          
          <TotalSolved total={data.stats.totalSolved} />

          <div className="bg-white rounded-2xl shadow-md p-4 w-2xs flex flex-col items-center justify-center h-[150px]">

            <span className="text-gray-600 text-md font-bold mb-1">Ranking </span>
            <span className="text-3xl font-bold text-yellow-500">{data.stats.ranking}</span>
          </div>


        </div>

        <div className="rounded-2xl bg-white shadow-md overflow-hidden p-4 h-full col-span-2 ">
          <Chart
            chartType="PieChart"
            data={chartdata}
            options={options}
            height={"100%"}
            width={"100%"}
            style={{ minHeight: 300 }}
          />
        </div>
      </div>
    </div>
  )
}

export default Leetcode