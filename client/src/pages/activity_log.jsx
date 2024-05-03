import React from 'react'
import Admin_navbar from './components/admin_navbar'
import Pagination_bar from './components/pagination_bar'
import { useState } from 'react'
import { useEffect } from 'react'

function Action_modal({action, date, note, admin, snapshot}) {

  return (
    <dialog id="action-modal" className="modal">
      <div className="modal-box w-1/2 max-w-5xl">
        <div className="flex flex-col gap-3">
          <span>
            {date} : <span className="font-bold">{admin}</span> {action} this item
          </span>
      
          <div className="flex w-2/3">
            <img className='rounded-box' src={snapshot} alt="Shoes" />
          </div>

          <div className="flex flex-col bg-base-200 p-2 overflow-scroll h-40 w-full">
            <span>Note : </span>
            <div className="flex">
              {note}
            </div>
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

function Action_card({action='', date='', note='', admin='', snapshot='', handleClick=()=>{}}) {
  return (
    <div className="flex flex-row bg-white rounded-md p-2 text-lg shadow-lg justify-between" onClick={handleClick}>
      <div>{action}</div>
      <div>{date}</div>
    </div>
  )
}


export default function activity_log() {
  const [modal_action, setAction] = useState(0)
  const [modal_date, setDate] = useState(0)
  const [modal_note, setNote] = useState(0)
  const [modal_admin, setAdmin] = useState(0)
  const [modal_snapshot, setSnapshot] = useState(0)

  return (
    <div className="flex flex-row w-screen h-screen">
        <Action_modal action={modal_action} date={modal_date} note={modal_note} admin={modal_admin} snapshot={modal_snapshot}></Action_modal>
        <Admin_navbar currentPage='Activity-Log'></Admin_navbar>
        <div className="flex flex-grow pt-2 pr-2 pb-2">
            <div className="flex flex-col flex-grow bg-base-200 rounded-md overflow-hidden">
                <Pagination_bar></Pagination_bar>
                <div className="flex flex-col gap-3 p-3 overflow-scroll flex-grow">
                  <Action_card action='Delete' date='1/2/2024' handleClick={
                    (action, date, admin, note) => {
                      setAction('deleted')
                      setAdmin('Dmcs')
                      setDate('1/2/2024')
                      setNote('(this is a sample note)')
                      setSnapshot('https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg')
                      document.getElementById('action-modal').showModal();
                    }
                  }></Action_card>

                  <Action_card action='Approve' date='1/1/2024' handleClick={
                    (action, date, admin, note) => {
                      setAction('approved')
                      setAdmin('Dmcs')
                      setDate('1/1/2024')
                      setNote('cac')
                      setSnapshot('https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg')
                      document.getElementById('action-modal').showModal();
                    }
                  }></Action_card>
                </div>
            </div>
        </div>
    </div>
  )
}
