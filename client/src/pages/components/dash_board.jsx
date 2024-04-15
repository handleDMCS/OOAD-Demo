import React, { useEffect, useState } from 'react'
import Pagination_bar from './pagination_bar'
import Product_card from './product_card'
import Item_panel from './item_panel'

function Auction_Panel() {
  const [listings, setListings] = useState([]);

  // get auctions list
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch('/api/listing/listings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json();
        setListings(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAuctions();
  }, [])

  return (
    <div className="flex flex-grow flex-col bg-base-200">
      <Pagination_bar></Pagination_bar>        
      <div className="flex flex-grow flex-col relative">
        <div className="h-full w-full overflow-auto absolute">
          <div className="grid grid-cols-4 gap-0">
            {/* {[...Array(12)].map((_, index) => (
              <Product_card handleClick={() => {document.getElementById('item-info').showModal();}} 
              canDelete
              handleDelete={(e) => {e.stopPropagation(); document.getElementById('delete-item').showModal();}}
              />
            ))} */}

            {
              listings && listings.map(listing => (
                <Product_card 
                  key={listing._id}
                  handleClick={() => {}} 
                  canDelete
                  handleDelete={(e) => {e.stopPropagation(); document.getElementById('delete-item').showModal();}}
                  name={listing.productName}
                  owner={listing.owner.firstname + ' ' + listing.owner.lastname}
                  description={listing.description}
                  highestBid={listing.currentPrice}
                  duration={listing.timer}
                  image={listing.image}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

function Item_Panel() {
  return (
    <div className="flex flex-grow flex-col bg-base-200">
      <Item_panel></Item_panel>
    </div>
  )
}


export default function dash_board() {
  return (
    <div className='flex flex-grow pt-2 pr-2 pb-2'>
      <div className="flex flex-grow flex-col bg-base-200">
        <ul className="menu menu-horizontal menu-sm">
          <li><a>Upcoming</a></li>
          <li><a>Active</a></li>
          <li><a>Pinned</a></li>
        </ul>
        
        <Auction_Panel></Auction_Panel>

      </div>
    </div>
  )
}
