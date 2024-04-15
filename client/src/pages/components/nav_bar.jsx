import React, { useEffect } from 'react'
import Filter from './filter'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

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
        <Link to='/profile'>
          <li id='Home' ref={refMap['Home']} className='mb-0.5'>
            <h2 className='Menu-title mb-0.5'>Home</h2>
          </li>
        </Link>
        <Link to='/'>
          <li id='All-Auctions' ref={refMap['All-Auctions']} className='mb-0.5'>
            <h2 className='Menu-title mb-0.5'>Auctions</h2>
            {/* <ul>
              <Link to='/'>
                <li id='All-Auctions' ref={refMap['All-Auctions']} className='mb-0.5'><a>All Auctions</a></li>
              </Link>
              <Link to='auctions/my'>
                <li id='My-Auctions' ref={refMap['My-Auctions']} className='mb-0.5'><a>My Auctions</a></li>
              </Link>
            </ul> */}
          </li>
        </Link>
        
        <Link to='/items/my'>
          <li id='My-Items' ref={refMap['My-Items']}>
          <h2 className='Menu-title mb-0.5'>My Items</h2>
          </li>
        </Link>
      </ul>      

      {(showFilter == true) && <Filter></Filter>}
    </div>
  )
}
