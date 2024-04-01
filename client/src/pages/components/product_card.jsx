import React from 'react' 
import { X } from 'react-feather'

export default function product_card({handleClick=()=>{}, canDelete=false, handleDelete=() => {}}) {
  return (
    <div className="p-3 card-spacing">
      <div className="card card-compact bg-base-100 shadow-xl relative" onClick={handleClick}>
        {canDelete && <button className="bg-base-100 btn btn-sm btn-circle absolute right-2 top-2" onClick={(e) => {handleDelete(e)}}>
          <X></X>
        </button>}
        <figure><img className='rounded-box' src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
        <div className="card-body card-compact">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>
    </div>
  )
}
