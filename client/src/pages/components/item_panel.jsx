import React, { useEffect, useState } from 'react'
import Pagination_bar from './pagination_bar'
import Product_card from './product_card'
import { FilePlus } from 'react-feather'

function Item_Info({itemID}) {
  return (
    <dialog id="item-info" className="modal">
      <div className="modal-box w-1/2 max-w-5xl">
        <form className='flex flex-col gap-2'>
          <label className="form-input-file">Product Images
            <input type="file" className="file-input file-input-bordered" multiple/>
          </label>

          <label className="form-input">
            Item
            <input type="text" className="input-lg" placeholder="Name your item" required/>
          </label>
          <label className="form-input">
            Initial Price
            <input type="number" className="input-lg" placeholder="Original price" required/>
          </label>
          <textarea className="textarea textarea-bordered min-h-48 input-lg" placeholder="Description"></textarea>
          <button type="submit" className="btn btn-primary w-full">Save</button>
        </form>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

function Delete_item() {
  return (
    <dialog id="delete-item" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure ?</h3>
        <p className="py-4">You won't be able to revert this</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-primary mr-2">Yes, delete it!</button>
            <button className="btn">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}


function Add_item({setItemID}) {
  return (
    <div className="p-3 card-spacing">
      <div className="card card-compact bg-base-100 shadow-xl h-full">
        <button className="btn h-full w-full flex-col gap-5 noHover" onClick={()=>{document.getElementById('item-info').showModal(); setItemID(-1)}}>
          <FilePlus className='w-12 h-12'></FilePlus>
          <span className="font-lg">New Item</span>
        </button>
      </div>
    </div>
  )
}

export default function item_panel() {
  const [itemID, setItemID] = useState(-1)

  useEffect(() => {
    console.log(itemID)
  }, [itemID])
  
  return (
    <div className="flex flex-grow flex-col bg-base-200">
      <Item_Info itemID={itemID}></Item_Info>
      <Delete_item></Delete_item>
      <Pagination_bar></Pagination_bar>        
      <div className="flex flex-grow flex-col relative">
        <div className="h-full w-full overflow-auto absolute">
          <div className="grid grid-cols-4 gap-0">
            <Add_item setItemID={setItemID}></Add_item>
            {[...Array(12)].map((_, index) => (
              <Product_card handleClick={() => {setItemID(index); document.getElementById('item-info').showModal();}} 
              canDelete
              handleDelete={(e) => {e.stopPropagation(); document.getElementById('delete-item').showModal();}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
