import React, {useState} from 'react'
import Navbar from './components/nav_bar';
import Profile_card from './components/profile_card';

export default function Profile () {
  return (
    <div className="flex flex-grow flex-row bg-base-200">
      
      <Navbar currentPage='Home' showFilter={false}></Navbar>
      <div className='flex flex-grow pt-2 pr-2 pb-2'>
        <Profile_card view='user' admin></Profile_card>
      </div>
    </div>
  )
}