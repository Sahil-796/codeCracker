import React from 'react'

const TotalSolved = ({total}) => {
  return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-xs flex flex-col items-center justify-center">
      <h2 className="text-gray-600 text-sm font-medium mb-1">Total Solved</h2>
      <span className="text-4xl font-bold text-indigo-600">{total}</span>
    </div>
  )
}

export default TotalSolved