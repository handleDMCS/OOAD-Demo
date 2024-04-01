import React, { useEffect } from 'react'
import Filter from './filter'
import { useRef } from 'react'

export default function nav_bar({showFilter=true, currentPage='Home'}) {
  const refMap = {
    'Home': useRef(null),
    'All-Auctions': useRef(null),
    'My-Auctions': useRef(null),
    'My-Items': useRef(null)
  }

  useEffect(() => {
    const element = refMap[currentPage].current;
    element.classList.add('bg-neutral')
    element.classList.add('text-neutral-content')
    element.classList.add('rounded-lg')
  }, [])

  return (
    <div className="flex flex-col justify-between w-72 h-screen p-2">
      <ul className="menu bg-base-200 rounded-box">
        <li id='Home' ref={refMap['Home']} className='mb-0.5'><a>Home</a></li>
        <li>
          <h2 className='Menu-title mb-0.5'>Auctions</h2>
          <ul>
            <li id='All-Auctions' ref={refMap['All-Auctions']} className='mb-0.5'><a>All Auctions</a></li>
            <li id='My-Auctions' ref={refMap['My-Auctions']} className='mb-0.5'><a>My Auctions</a></li>
          </ul>
        </li>
        <li id='My-Items' ref={refMap['My-Items']}><a>My Items</a></li>
      </ul>      

      {(showFilter == true) && <Filter></Filter>}
    </div>
  )
}
