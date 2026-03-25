import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
const Card = () => {
  const [stockinfo, setstockinfo] = useState([])
  useEffect(() => {
    const fetchStockInfo = async () => {
      const response = await axios.get(`http://localhost:3000/stockinfo`, { withCredentials: true })
      let stockinfos = await response.data.message
      console.log(stockinfos);

      setstockinfo(stockinfos)
      // let priceDifference = stockinfos.predicted_price - stockinfos.current_price;
      // let percentage = ((priceDifference / stockinfos.current_price) * 100).toFixed(2);
      // let uptrend = priceDifference >= 0
    };
    fetchStockInfo()
    const interval = setInterval(fetchStockInfo, 10000)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      {stockinfo.map((stockdetails, index) => {
        const priceDifference = stockdetails.predicted_price - parseFloat(stockdetails.current_price)
        const percentage = ((priceDifference / parseFloat(stockdetails.current_price)) * 100).toFixed(2)
        const uptrend = priceDifference >= 0
        return (
          <div className={`rounded-2xl min-w-xl w-auto max-w-3xl h-auto p-3 bg-linear-to-r ${uptrend ? 'from-[#112732c4] via-[#112732a2] to-[#11273269]' : 'from-[#321a1ac4] via-[#321a1aa2] to-[#321a1a69]'}`} key={index}>
            <div className='w-full flex justify-between text-[#10B981] text-sm'><h2 className='flex gap-2'>{uptrend ? <TrendingUp className="text-[#10B981]" size={20} /> : <TrendingDown className="text-red-500" size={20} />} <span className={uptrend ? "text-[#10B981]" : "text-red-500"}>{uptrend ? "+" : "-"}NPR {priceDifference.toFixed(2)} ({percentage}%)</span></h2></div>
            <div className={`${uptrend ? "text-[#10B981]" : "text-red-500"} font-semibold flex justify-between`}><h1>{stockdetails.stockname.toUpperCase()}</h1><h1 className='pr-3'>{stockdetails.predicted_price.toFixed(2)}</h1></div>
            <div className='text-[#10B981] font-semibold flex justify-between pr-4'><h3 className='text-gray-400'>Current Price:<span> {Number(stockdetails.current_price).toFixed(2)}</span></h3></div>
          </div>
        )
      })}
    </>
  )
}

export default Card