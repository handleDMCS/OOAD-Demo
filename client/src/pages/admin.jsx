import React from 'react'
import Auction_panel from './components/auction_panel'
import Admin_navbar from './components/admin_navbar'
import Product_card from './components/product_card'
import { useRef, useEffect } from 'react'
import { useState } from 'react'

function Admin_modal({name, host, time, startingPrice, priceStep, info, mode}) {
  return (
    <dialog id="admin-modal" className="modal">
      <div className="modal-box w-1/2 max-w-5xl">
        <form className='flex flex-col gap-2'>
          <label className="form-input-file">Proposal details
          </label>

          <label className="form-input">
            Proposed By
            <input type="text" readOnly value={host}/>
          </label>
          <label className="form-input">
            Item
            <input type="text" readOnly value={name}/>
          </label>
          <label className="form-input">
            Starting Price
            <input type="number" readOnly value={startingPrice}/>
          </label>
          <label className="form-input">
            Price Step
            <input type="number" readOnly value={priceStep}/>
          </label>
          <label className="form-input">
            Active During
            <input type="text" readOnly value={time}/>
          </label>
          <textarea className="textarea textarea-bordered min-h-48 input-lg resize-none" placeholder="Description" readOnly value={info}></textarea>
          {(mode == 'pending') && <button type="submit" className="btn btn-success w-full">Accept</button>}
          {(mode == 'approved') && <button type="submit" className="btn btn-info w-full">Revert To Pending</button>}
          <button type="submit" className="btn btn-error w-full">Decline</button>
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


export default function admin() {
    const [modal_name, setName] = useState(0);
    const [modal_host, setHost] = useState(0);
    const [modal_time, setTime] = useState(0);
    const [modal_info, setInfo] = useState(0);
    const [modal_startingPrice, setStartingPrice] = useState(0);
    const [modal_priceStep, setPriceStep] = useState(0);
    const [modal_mode, setMode] = useState(0)

  return (
    <div className="flex flex-row w-screen h-screen">
        <Admin_modal name={modal_name} host={modal_host} time={modal_time} info={modal_info} startingPrice={modal_startingPrice} priceStep={modal_priceStep} mode={modal_mode}></Admin_modal>
        <Admin_navbar></Admin_navbar>
        <div className="flex flex-row gap-2 flex-grow pt-2 pb-2 pr-2">
            <div className="flex basis-1/2 bg-base-200 rounded-md flex-col overflow-hidden">
                <div className="flex content-center justify-center p-1 bg-info text-info-content">Pending</div>
                <Auction_panel item_per_row={2} content={[...Array(12)].map((_, index) => (
                    <Product_card handleClick={() =>{
                        setName('shoe')
                        setHost('dmcs')
                        setTime('1/1/2024-1/1/2025')
                        setInfo('(sample description)')
                        setStartingPrice(5000)
                        setPriceStep(500)
                        setMode('pending')
                        document.getElementById('admin-modal').showModal();
                    }}/>
                ))}></Auction_panel>
            </div>
            <div className="flex basis-1/2 bg-base-200 rounded-md flex-col overflow-hidden">
                <div className="flex content-center justify-center p-1 bg-success text-success-content">Approved</div>
                <Auction_panel item_per_row={2} content={[...Array(12)].map((_, index) => (
                    <Product_card handleClick={() =>{
                        setName('shoe')
                        setHost('dmcs')
                        setTime('1/1/2024-1/1/2025')
                        setInfo('(sample description)')
                        setStartingPrice(5000)
                        setPriceStep(500)
                        setMode('approved')
                        document.getElementById('admin-modal').showModal();
                    }}/>
                ))}></Auction_panel>
            </div>
        </div>
    </div>
    )
}
