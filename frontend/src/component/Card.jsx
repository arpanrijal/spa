import React from 'react'
import { TrendingUp } from 'lucide-react'
const Card = () => {
  return (
    <>
    <div className='rounded-2xl min-w-2xl w-auto max-w-3xl h-auto p-3 bg-[#112732]'>
        <div className='w-full flex justify-between text-green-300 text-sm'><h2 className='flex gap-2'><TrendingUp className="text-green-500" size={20} />+NPR 8.00 (2.84%)</h2><h2 className='text-gray-400'>80% Confidence</h2></div>
        <div className='text-green-400 font-semibold flex justify-between'><h1>ADBL</h1><h1 className='pr-3'>NPR. 290.00</h1></div>
        <div className='text-green-300 font-semibold flex justify-between pr-4'><h3 className='text-gray-400'>Current Price:<span> NPR. 282.00</span></h3></div>
    </div>
    </>
  )
}

export default Card