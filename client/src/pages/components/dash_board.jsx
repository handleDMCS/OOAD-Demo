import React, { useEffect } from 'react'
import Auction_panel from './auction_panel'

export default function dash_board() {
  return (
    <div className='flex flex-grow pt-2 pr-2 pb-2'>
      <div className="flex flex-grow flex-col bg-base-200">
        <ul className="menu menu-horizontal menu-sm">
          <li><a>Upcoming</a></li>
          <li><a>Active</a></li>
          <li><a>Pinned</a></li>
        </ul>

        <Auction_panel></Auction_panel>
      </div>
    </div>
  )
}
