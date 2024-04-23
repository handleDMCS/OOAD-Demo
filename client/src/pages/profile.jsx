import React from 'react'
import Profile_card from './components/profile_card'
import Navbar from './components/nav_bar'

export default function profile() {
  return (
    <div className='w-screen h-screen flex flex-row'>
      <Navbar currentPage='Home' showFilter={false}></Navbar>
      <div className='flex flex-grow pt-2 pr-2 pb-2'>
        <Profile_card view='user' admin></Profile_card>
      </div>
    </div>
  )
}
