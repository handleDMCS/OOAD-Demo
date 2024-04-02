import React, { useEffect, useState } from 'react'
import Pagination_bar from './pagination_bar'
import Product_card from './product_card'

// note
// items is not mapped 
// listings currently have no element

export default function dash_board() {
  const [auctions, setAuctions] = useState(null);
  const [items, setItems] = useState(null);
  // get auctions list
  const fetchAuctions = async () => {
    try {
      const res = await fetch('/api/listing/listings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchAuctions().then(auctions =>
      setAuctions(auctions)
    )
  }, [])

  // get items list
  const fetchItems = async () => {
    try {
      const res = await fetch('/api/item/items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchItems().then(items =>
      setItems(items)
    )
  }, [])

  return (
    <div className='flex flex-grow pt-2 pr-2 pb-2'>
      <div className="flex flex-grow flex-col bg-base-200">
        <ul className="menu menu-horizontal menu-sm">
          <li><a>Upcoming</a></li>
          <li><a>Active</a></li>
          <li><a>Pinned</a></li>
        </ul>

        <div className="flex flex-grow flex-col bg-base-200">
          <Pagination_bar></Pagination_bar>        
          <div className="flex flex-grow flex-col relative">
            <div className="h-full w-full overflow-auto absolute">
              <div className="grid grid-cols-4 gap-0">
                {[...Array(12)].map((_, index) => (
                  <Product_card/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
