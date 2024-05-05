import React, { useEffect, useState } from 'react'
import Pagination_bar from './pagination_bar'
import Product_card from './product_card'
import Item_panel from './item_panel'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { 
  joinListingStart, joinListingSuccess, 
  fetchListingsStart, fetchListingsSuccess, fetchListingsFailure
} from '../../redux/slice/listingSlice'

function Auction_Panel() {
  const listings = useSelector(state => state.listing.listings);
  const currentUser = useSelector(state => state.user.user);
  const currentPage = useState(1);
  const itemPerPage = useState(4);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // start auction on time
  useEffect(() => {
    const startAuction = async () => {
      try {
        const res = await fetch('/api/listing/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    startAuction();
  }, [])
  
  // get auctions list
  useEffect(() => {
    dispatch(fetchListingsStart());
    const fetchAuctions = async () => {
      try {
        const res = await fetch('/api/listing/active', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json();
        dispatch(fetchListingsSuccess(data));
        // console.log(data);
      } catch (error) {
        dispatch(fetchListingsFailure(error));
      }
    }
    
    const interval = setInterval(() => {
      fetchAuctions();
    } , 1000);

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <div className="flex flex-grow flex-col bg-base-200">
      <Pagination_bar></Pagination_bar> 
  
      <div className="flex flex-grow flex-col relative">
        <div className="h-full w-full overflow-auto absolute">
          <div className="grid grid-cols-4 gap-0">
            { listings && listings.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map(listing => (
                <Product_card 
                  key={listing._id}
                  handleClick={() => {
                    dispatch(joinListingStart());
                    if (currentUser) {
                      dispatch(joinListingSuccess(listing));
                      navigate(`/auction/${listing._id}`);
                    } else {
                      navigate('/login');
                    }
                  }} 
                  canDelete={false}
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
