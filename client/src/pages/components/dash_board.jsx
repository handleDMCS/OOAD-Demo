import React, { useEffect } from 'react'
import Product_card from './product_card'
import Pagination_bar from './pagination_bar'

function Auction_Panel() {
  return (
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
  )
}


export default function dash_board() {
  return (
    <div className='flex flex-grow pt-2 pr-2 pb-2'>
      <div className="flex flex-grow flex-col bg-base-200">
        <ul className="menu menu-horizontal menu-sm">
          <li><a>Upcoming</a></li>
          <li><a>Active</a></li>
          <li><a>Pinned</a></li>
        </ul>

        <Auction_Panel></Auction_Panel>
      </div>
    </div>
  )
}
