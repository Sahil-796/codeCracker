import React from 'react'
import TotalSolved from './TotalSolved'

const Leetcode = ({data}) => {
  // data.stats.calendar
  // data.username
  // data.stats.totalSolved

  

  return (
        <div>

<TotalSolved total={data.stats.totalSolved}/>

        </div>
  )
}

export default Leetcode