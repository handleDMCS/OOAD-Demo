import React from 'react'
import Product_card from './product_card'
import Pagination_bar from './pagination_bar'

export default function auction_panel({item_per_row=4, content=[...Array(12)].map((_, index) => (<Product_card/>))}) {
  return (
    <div className="flex flex-grow flex-col bg-base-200">
      <Pagination_bar></Pagination_bar>        
      <div className="flex flex-grow flex-col relative">
        <div className="h-full w-full overflow-auto absolute">
          <div className={`grid grid-cols-${item_per_row} gap-0`}>
            {/* {[...Array(12)].map((_, index) => (
              <Product_card/>
            ))} */}
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}
