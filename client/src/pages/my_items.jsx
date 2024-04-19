import React from 'react'
import Navbar from './components/nav_bar'
import Item_panel from './components/item_panel'

export default function my_items() {
  return (
    <div>
      <div className='flex flex-row'>
        <Navbar currentPage='My-Items'></Navbar>
        <div className="flex flex-grow pt-2 pr-2 pb-2">
          <Item_panel></Item_panel>
        </div>
      </div>
    </div>
  )
}
