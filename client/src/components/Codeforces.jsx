import React from 'react'
import TotalSolved from './TotalSolved'
import {Chart} from "react-google-charts"


const Codeforces = ({data}) => {
 

// totalSolved : responseCf.data.total_solved, 
// lastContest: response3Cf.data.(last)
// rating: responseCf.data.rating,
// rank: responseCf.data.rank,
// calendar: response2Cf.solved_per_day
const lastContest = Array.isArray(data.stats.contestData) && data.stats.contestData.length > 0
  ? data.stats.contestData[data.stats.contestData.length-1]
  : null


const chartData = [
    ["Date", "Rating"],
  ...data.stats.contestData.map(entry=>[
    new Date(entry.ratingUpdateTimeSeconds*1000),
    entry.newRating
  ])
]

const options = {
  // title: "Codeforces Rating Over Time",
  // titleTextStyle:{
  //   bold: true,
  //   color: "#4b5465",
  //   fontSize: 20
  // },
  curveType: "none",
  legend: { position: "right"},
  hAxis: {
    title: "Date",
    format: "MMM yyyy",
    gridlines:{
    color: "transparent"
    }
  },
  vAxis: {
    title: "Rating",
    minValue: 0,
    
  },
  colors: ["#3366cc"],
  pointSize: 6,
  lineWidth: 2,
  chartArea:{
    top:50,
    bottom: 70,
    
  }
}

  return (
    <div className="flex flex-col gap-5 bg-gray">
      <h2 className="font-bold text-2xl text-blue-700"><span className='italic'>{data.username}</span> - Codeforces </h2>
      

      <div className="grid grid-cols-4 gap-5">

        <div className="flex flex-col w-2xs gap-5 h-full">
          
          <TotalSolved total={data.stats.totalSolved} />
          

          <div className="bg-white rounded-2xl shadow-md p-4 w-2xs flex flex-col items-center justify-center h-[150px]">

            <span className="text-gray-600 text-md font-bold mb-1">Rating </span>
            <span className="text-3xl font-bold text-yellow-500">{data.stats.rating}</span>
           
          </div>


        </div>

        
          <div className='col-span-2 shadow-md bg-white rounded-2xl h-[500px] flex flex-col items-center justify-center p-4'>
            <h2 className='text-gray-600 text-md font-bold'>Codeforces Rating over Time</h2>
            <Chart 
              chartType="LineChart"
              width="100%"
              height="100%"
              
              data={chartData}
              options={options}
            
            />
          </div>
          
          <div className='flex flex-col w-2xs gap-5 h-full'>
            
            <ContestCard contest={lastContest}/>
          
            <div className="bg-white rounded-2xl shadow-md p-4 w-2xs flex flex-col items-center justify-center h-[150px]">

            <span className="text-gray-600 text-md font-bold mb-1">Ranking </span>
            <span className="text-3xl font-bold text-yellow-500">{data.stats.rank}</span>
          </div>
          
          </div>
       
      </div>
    </div>
  )
}

const ContestCard = ({ contest }) => {
  if (!contest) return null;

  // Format date from seconds
  const date = new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString();

  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col items-center justify-center p-4 w-auto ">

      <h2 className='text-gray-600 text-md font-bold mb-2'>Last Contest</h2>

      <div className='flex flex-row gap-1 text-blue-700 font-bold text-md'>
            
            <div className='text-center'><span className='text-yellow-500'>{contest.contestId} : </span>{contest.contestName}</div>
        </div>
      
      <div className='text-blue-700 font-semibold text-md'>

      <div><span className='font-bold text-yellow-500'>Rank : </span> {contest.rank}</div>
      <div><span className='font-bold text-yellow-500'>Old rating : </span>{contest.oldRating}</div>
      <div><span className='font-bold text-yellow-500'>New rating : </span>{contest.newRating}</div>
      </div>


    </div>
  );
};

export default Codeforces


// {
// "contestId": 2033,
// "contestName": "Codeforces Round 981 (Div. 3)",
// "handle": "AlgoMancer_P",
// "rank": 20189,
// "ratingUpdateTimeSeconds": 1729788600,
// "oldRating": 0,
// "newRating": 367
// },