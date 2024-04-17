import React from 'react'
import Room_info from './components/room_info'
import Room_bid from './components/room_bid'

import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function auction_room() {
  const [item, setItem] = useState({})

  const params = useParams();
  // console.log(params);

  // fetch item info
  useEffect(() => {
    const fetchItem = async (id) => {
      try {
        const res = await fetch(`/api/listing/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json();
        // console.log(data);
        setItem(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItem(params.id);
  }, [])
  
  // console.log(item);
  const host = item.owner ? item.owner.firstname + ' ' + item.owner.lastname : '';

  return (
    <div className='flex w-screen h-screen p-2 gap-2'>
        <div className="flex basis-1/2 bg-base-200 rounded-md">
          <Room_info
            name={item.productName}
            host={host}
            start={item.createdAt}
            end={item.createdAt}
            startingPrice={item.initialPrice}
            priceStep={item.priceStep}
            info={item.description}   
          ></Room_info>
        </div>
        <div className="flex basis-1/2 bg-base-200 rounded-md">
          <Room_bid 
            initTime={100} 
            budget={100000} 
            startingPrice={10000} 
            priceStep={5000}
          ></Room_bid>
        </div>
    </div>
  )
}
