import React from "react";
import Auction_panel from "./components/auction_panel";
import Admin_navbar from "./components/admin_navbar";
import Product_card from "./components/product_card";
import { useRef, useEffect } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingStart, fetchPendingSuccess, fetchPendingFailure,
  verifyItemFailure, verifyItemStart, verifyItemSuccess,
  fetchVerifiedStart, fetchVerifiedSuccess, fetchVerifiedFailure,
} from "../redux/slice/itemSlice";
import { useNavigate } from "react-router-dom";

function Admin_modal({
  name,
  host,
  time,
  startingPrice,
  priceStep,
  info,
  mode,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const item = useSelector(state => state.item.item);

  const handleVerify = async () => {
    try {
      const res = await fetch(`/api/item/verify/${item._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(verifyItemFailure(data.error));
        return;
      }
      dispatch(verifyItemSuccess(data));
      navigate('/admin');
    } catch(error) {
      dispatch(verifyItemFailure(error));
    }
  }

  const handleRevert = async () => {
    try {
      const res = await fetch(`/api/item/revert/${item._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(verifyItemFailure(data.error));
      }
      dispatch(verifyItemSuccess(data));
      navigate('/admin')
    } catch (error) {
      dispatch(verifyItemFailure(error));
    }
  }

  const handleDecline = async () => {
    try {
      const res = await fetch(`/api/item/decline/${item._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(verifyItemFailure(data.error));
      }
      dispatch(verifyItemSuccess(date));
      navigate('/admin')
    } catch (error) {
      dispatch(verifyItemFailure(error));
    }
  }

  return (
    <dialog id="admin-modal" className="modal">
      <div className="modal-box w-1/2 max-w-5xl">
        <form className="flex flex-col gap-2">
          <label className="form-input-file">Proposal details</label>

          <label className="form-input">
            Proposed By
            <input type="text" readOnly value={host} />
          </label>
          <label className="form-input">
            Item
            <input type="text" readOnly value={name} />
          </label>
          <label className="form-input">
            Starting Price
            <input type="number" readOnly value={startingPrice} />
          </label>
          <label className="form-input">
            Price Step
            <input type="number" readOnly value={priceStep} />
          </label>
          <label className="form-input">
            Active During
            <input type="text" readOnly value={time} />
          </label>
          <textarea
            className="textarea textarea-bordered min-h-48 input-lg resize-none"
            placeholder="Description"
            readOnly
            value={info}
          ></textarea>
          {mode == "pending" && (
            <button onClick={handleVerify} type="submit" className="btn btn-success w-full text-white">
              Accept
            </button>
          )}
          {mode == "approved" && (
            <button onClick={handleRevert} type="submit" className="btn btn-info w-full text-white">
              Revert To Pending
            </button>
          )}
          <button onClick={handleDecline} type="submit" className="btn btn-error w-full text-white">
            Decline
          </button>
        </form>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default function admin() {
  // product card 
  const [modal_name, setName] = useState(0);
  const [modal_host, setHost] = useState(0);
  const [modal_time, setTime] = useState(0);
  const [modal_info, setInfo] = useState(0);
  const [modal_startingPrice, setStartingPrice] = useState(0);
  const [modal_priceStep, setPriceStep] = useState(0);
  const [modal_mode, setMode] = useState(0);
  
  const dispatch = useDispatch();

  // item fetching
  const pendingItems = useSelector(state => state.item.pendings);
  const verifiedItems = useSelector(state => state.item.verified);

  useEffect(() => {
    const fetchPendingItems = async () => {
      try {
        dispatch(fetchPendingStart())
        const res = await fetch("/api/item/pending", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if(data.success == false) {
          dispatch(fetchPendingFailure(data.error));
          return;
        }
        dispatch(fetchPendingSuccess(data));
      } catch {
        dispatch(fetchPendingFailure());
      }
    }
    fetchPendingItems();
    console.log(pendingItems);
  }, []);

  useEffect(() => {
    const fetchVerifiedItems = async () => {
      try {
        dispatch(fetchVerifiedStart())
        const res = await fetch("/api/item/verified", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success == false) {
          dispatch(fetchVerifiedFailure(data.error));
          return;
        }
        dispatch(fetchVerifiedSuccess(data));
      } catch {
        dispatch(fetchVerifiedFailure());
      }
    }
    fetchVerifiedItems();
    console.log(verifiedItems);
  }, []);

  
  return (
    <div className="flex flex-row w-screen h-screen">
      <Admin_modal
        name={modal_name}
        host={modal_host}
        time={modal_time}
        info={modal_info}
        startingPrice={modal_startingPrice}
        priceStep={modal_priceStep}
        mode={modal_mode}
      ></Admin_modal>

      <Admin_navbar currentPage="Admin"></Admin_navbar>
      
      <div className="flex flex-row gap-2 flex-grow pt-2 pb-2 pr-2">
        <div className="flex basis-1/2 bg-base-200 rounded-md flex-col overflow-hidden">
          <div className="flex content-center justify-center p-1 bg-info text-info-content">
            Pending
          </div>
          <Auction_panel
            item_per_row={2}
            content={pendingItems ? pendingItems.map(data => (
              <Product_card
                handleClick={() => {
                  setName(data.productName);
                  setHost(data.owner.firstname + " " + data.owner.lastname);
                  setTime(new Date(data.startTime).toLocaleString());
                  setInfo(data.description);
                  setStartingPrice(data.initialPrice);
                  setPriceStep(data.jump);
                  setMode("pending");
                  dispatch(verifyItemStart(data));
                  console.log(data);
                  document.getElementById("admin-modal").showModal();
                }}
              />
            )) : 
              <div className="flex mt-5 content-center justify-center text-lg text-black">
                No pending items
              </div>
            }
          ></Auction_panel>
        </div>
        <div className="flex basis-1/2 bg-base-200 rounded-md flex-col overflow-hidden">
          <div className="flex content-center justify-center p-1 bg-success text-success-content">
            Approved
          </div>
          <Auction_panel
            item_per_row={2}
            content={verifiedItems ? verifiedItems.map(data => (
              <Product_card
                name={data.productName}
                owner={data.owner.firstname + " " + data.owner.lastname}
                description={data.description}
                image={data.image}
                handleClick={() => {
                  setMode("approved");
                  dispatch(verifyItemStart(data));
                  document.getElementById("admin-modal").showModal();
                }}
              />
            )) : 
              <div className="flex mt-5 content-center justify-center text-lg text-black">
                No approved items
              </div>
            }
          ></Auction_panel>
        </div>
      </div>
    </div>
  );
}
