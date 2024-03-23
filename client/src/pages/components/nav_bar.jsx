// import React from 'react'
import { Link } from 'react-router-dom'
import Filter from './filter'

export default function nav_bar() {
  return (
    <div className="flex flex-col justify-between w-72 h-screen p-2">
      <ul className="menu bg-base-200 rounded-box">
        <Link to="/profile">
          <li><a>Profile</a></li>
        </Link>
        <li>
          <Link>
            <h2 className="menu-title">Auctions</h2>
          </Link>
          <ul>
            <Link to="/my">
              <li><a>My Auctions</a></li>
            </Link>
            <Link to="/">
              <li><a>All Auctions</a></li>
            </Link>
          </ul>
        </li>
        <Link to="/items/my">
          <li><a>My Items</a></li>
        </Link>
      </ul>      

      <Filter></Filter>
    </div>
  )
}
