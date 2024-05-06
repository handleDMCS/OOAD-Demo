import React, { useEffect } from 'react'

function Begin({link=''}) {
  return (
    <dialog id="begin-alert" className="modal">
      <div className="modal-box w-1/2 max-w-5xl flex-col">
        <span className='flex'>
          An auction room just went live. Click here to join 
        </span>
        <a href={link} className='link link-primary'>{link}</a>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

function End() {
  return (
    <dialog id="end-alert" className="modal">
      <div className="modal-box w-1/2 max-w-5xl flex-col">
        <span className='flex'>
          Attention: This auction has ended. Thank you for your participation! Stay tuned for future updates and upcoming events
        </span>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

function Approved({link = ''}) {
    return (
      <dialog id="approved-alert" className="modal">
        <div className="modal-box w-1/2 max-w-5xl flex-col">
          <span className='flex'>
            Congratulations! Your item has been accepted for bidding. Here's the link to your auction room
          </span>
          <a href={link} className='link link-primary'>{link}</a>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    )
}

function TopBid({link = ''}) {
  return (
    <dialog id="topbid-alert" className="modal">
      <div className="modal-box w-1/2 max-w-5xl flex-col">
        <span className='flex'>
          Status Update: You are no longer the top bidder. Access your auction room here
        </span>
        <a href={link} className='link link-primary'>{link}</a>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}


export default function alert({showAlert, mode, link=''}) {
  useEffect((
    () => {
      if(showAlert == true) {
        document.getElementById(`${mode}-alert`).showModal();
      }
    }
  ), [showAlert])

  return (
    <div>
      {(mode == 'end') && <End></End>}
      {(mode == 'approved') && <Approved link={link}></Approved>}
      {(mode == 'topbid') && <TopBid link={link}></TopBid>}
      {(mode == 'begin') && <Begin link={link}></Begin>}
    </div>
  )
}
