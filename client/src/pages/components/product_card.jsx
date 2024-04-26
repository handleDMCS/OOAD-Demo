import React from 'react' 
import { X } from 'react-feather'

export default function product_card({
  handleClick,
  canDelete, 
  handleDelete,
  name,
  description,
  owner,
  highestBid,
  duration,
  image,
}) {
  return (
    <div className="p-3 card-spacing">
      <div className="card card-compact bg-base-100 shadow-xl relative" onClick={handleClick}>
        {canDelete && <button className="bg-base-100 btn btn-sm btn-circle absolute right-2 top-2" onClick={handleDelete}>
          <X></X>
        </button>}
        <figure>
          <img 
            className='rounded-box'
            // src= {image ? image : 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'} 
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" 
            alt="Shoes" 
          />
        </figure>
        <div className="card-body card-compact">
          {/* Item name */}
          <h2 className="card-title" id='item-name'>
            {name ? name : 'Shoes!'}
          </h2>
          {/* Description */}
          <p>
            {description ? description : 'If a dog chews shoes whose shoes does he choose?'}
          </p>
          {/* Owner */}
          <p>
            Owner: {owner ? owner : 'John Doe'}
          </p>
          {/* Highest bidder */}
          <p>
            Current bid: {highestBid}
          </p>
          {/* Timer */}
          <p>
            Remaining: {duration}
          </p>
        </div>
      </div>
    </div>
  )
}
