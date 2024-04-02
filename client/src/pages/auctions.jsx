import React from 'react'
import Navbar from './components/nav_bar'
import Dashboard from './components/dash_board'

function auctions() {
  return (
    <div className='flex flex-row'>
      <Navbar></Navbar>
      <Dashboard></Dashboard>
    </div>
  )
}

export default auctions
