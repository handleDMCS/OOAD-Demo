import React from 'react'
import Filter from './filter'

export default function nav_bar() {
  return (
    <div class="flex flex-col justify-between w-72 h-screen p-2">
      <ul className="menu bg-base-200 rounded-box">
        <li><a>Home</a></li>
        <li>
          <h2 class="menu-title">Auctions</h2>
          <ul>
            <li><a>All Auctions</a></li>
            <li><a>My Auctions</a></li>
          </ul>
        </li>
        <li><a>My Items</a></li>
      </ul>      

      <Filter></Filter>
    </div>
  )
}
