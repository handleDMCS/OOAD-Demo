import React from 'react'
import Room_info from './components/room_info'
import Room_bid from './components/room_bid'

export default function auction_room() {
  return (
    <div className='flex w-screen h-screen p-2 gap-2'>
        <div className="flex basis-1/2 bg-base-200 rounded-md">
          <Room_info></Room_info>
        </div>
        <div className="flex basis-1/2 bg-base-200 rounded-md">
          <Room_bid initTime={10} budget={100000} startingPrice={10000} priceStep={5000}></Room_bid>
        </div>
    </div>
  )
}
