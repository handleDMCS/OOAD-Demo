import React from 'react'
import Room_info from './components/room_info'
import Room_bid from './components/room_bid'
import openSocket from 'socket.io-client'

import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function auction_room() {
  const item = useSelector(state => state.listing.listing);
  const user = useSelector(state => state.user.user);
  const params = useParams();
  console.log(user);

  // socket params

  // // For listing room
  // useEffect(() => {
  //   const socket = openSocket('localhost:3000', {
  //     path: '/socket/listing'
  //   });

  //   socket.emit('join', { room: params.id });
  //   socket.on('start', (data) => {
  //     console.log(data);
  //   });
  // }, [params.id])
  
  const host = item.owner.firstname + ' ' + item.owner.lastname;

  let start = new Date(item.createdAt);
  start = start.toLocaleString();
  let end = new Date(item.createdAt);
  end.setSeconds(end.getSeconds() + item.duration);
  end = end.toLocaleString();

  return (
    <div className='flex w-screen h-screen p-2 gap-2'>
        <div className="flex basis-1/2 bg-base-200 rounded-md">
          <Room_info
            name={item.productName}
            host={host}
            start={start}
            end={end}
            startingPrice={item.initialPrice}
            priceStep={item.jump}
            info={item.description}   
          ></Room_info>
        </div>
        <div className="flex basis-1/2 bg-base-200 rounded-md">
          <Room_bid 
            auctionID={params.id}
            duration={item.duration}
            startingTime={item.startTime} 
            budget={user.balance} 
            startingPrice={item.initialPrice} 
            priceStep={item.jump}
          ></Room_bid>
        </div>
    </div>
  )
}
