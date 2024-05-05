import React, { useEffect } from 'react'
import Filter from './filter'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function nav_bar({showFilter=true, currentPage='Home'}) {
  const refMap = {
    'Home': useRef(null),
    'All-Auctions': useRef(null),
    'My-Auctions': useRef(null),
    'My-Items': useRef(null)
  }

  const currentUser = useSelector(state => state.user.user);
  // console.log(currentUser)
  const profileLink = `/profile/${currentUser._id}`

  useEffect(() => {
    const element = refMap[currentPage].current;
    element.classList.add('bg-neutral')
    element.classList.add('text-neutral-content')
    element.classList.add('rounded-lg')
  }, [])

  return (
    <div className="flex flex-col justify-between w-64 h-screen p-2 flex-shrink-0">
      <ul className="menu bg-base-200 rounded-box">
        <Link to={profileLink}>
          <li id='Home' ref={refMap['Home']} className='mb-0.5'>
            <h2 className='Menu-title mb-0.5'>Home</h2>
          </li>
        </Link>
        <Link to='/'>
          <li id='All-Auctions' ref={refMap['All-Auctions']} className='mb-0.5'>
            <h2 className='Menu-title mb-0.5'>Auctions</h2>
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
