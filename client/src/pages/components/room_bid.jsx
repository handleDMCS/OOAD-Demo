import React, { useState } from "react";
import { useEffect } from "react";
import { User } from "react-feather";
import { Volume2 } from "react-feather";
import { DollarSign } from "react-feather";
import { Plus } from "react-feather";
import { Minus } from "react-feather";
import { CreditCard } from "react-feather";
import { ShoppingCart } from "react-feather";
import { useRef } from "react";
import { useParams } from "react-router-dom";

function SubmitBid(
  { auctionID, currentBid }
) {
  const handleSubmit = async () => {
    console.log(currentBid);
    try {
      const res = await fetch(`/api/listing/bid/${auctionID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bid: currentBid,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <dialog id="Submit-bid" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure ?</h3>
        <p className="py-4">You won't be able to revert this</p>
        <div className="modal-action">
          <form onSubmit={handleSubmit} method="dialog">
            <button className="btn btn-primary mr-2">
              Yes, submit my bid!
            </button>
            <button className="btn">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

function CountDown({ remTime, setRemTime, initTime }) {
  const toSec = {
    day: 86400,
    hour: 3600,
    min: 60,
  };
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemTime((prev) => {
        return prev - 1;
      }); // Using a function to update remTime
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remTime < 0) {
      return;
    }
    const tday = Math.floor(remTime / toSec.day);
    const thour = Math.floor((remTime % toSec.day) / toSec.hour);
    const tmin = Math.floor((remTime % toSec.hour) / toSec.min);
    const tsec = remTime % toSec.min;

    setDay(tday);
    setHour(thour);
    setMin(tmin);
    setSec(tsec);
    setPercent(((initTime - remTime) * 100) / initTime);
  }, [remTime]);

  return (
    <div className="flex flex-col items-center gap-2">
      <progress className="progress w-96" value={percent} max="100"></progress>
      <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
        <div className="timer">
          <span className="countdown font-mono text-xl">
            <span style={{ "--value": day }}></span>
          </span>
          days
        </div>
        <div className="timer">
          <span className="countdown font-mono text-xl">
            <span style={{ "--value": hour }}></span>
          </span>
          hours
        </div>
        <div className="timer">
          <span className="countdown font-mono text-xl">
            <span style={{ "--value": min }}></span>
          </span>
          mins
        </div>
        <div className="timer">
          <span className="countdown font-mono text-xl">
            <span style={{ "--value": sec }}></span>
          </span>
          secs
        </div>
      </div>
    </div>
  );
}

function LeaderBoard({ Bids, include, setCurrentBid, inputRef }) {
  const [topBids, setTopBids] = useState(Bids);

  useEffect(() => {
    const sorted = [...Bids].sort((a, b) => b.bid - a.bid);
    const newTopBids = Array(include)
      .fill({ name: "user", bid: "-1", profileLink: "#" })
      .map((element, index) => {
        if (index >= sorted.length) return element;
        return sorted[index];
      });

    setTopBids(newTopBids);
  }, [Bids]);

  return (
    <div className="bg-white rounded-box flex flex-col p-2 gap-2 shadow-md">
      {topBids.map((user, index) => (
        <div
          className="flex flex-row gap-2"
          style={{ visibility: user.bid === "-1" ? "hidden" : "visible" }}
        >
          <a
            href={`${user.profileLink}`}
            className={`btn ${
              index === 0 ? "btn-warning" : "btn-default"
            }  basis-1/12`}
          >
            <User></User>
          </a>
          <div
            className={`flex flex-row rounded-box bg-base-200 ${
              index === 0 && "bg-warning"
            } basis-11/12 justify-between items-center p-2`}
          >
            <span className={`text-lg font-bold`}>
              {`${user.name}`} 
              <Volume2 className="inline"></Volume2>{" "}
              {`${user.bid}`}
            </span>
            {index === 0 && (
              <button
                className="btn btn-neutral btn-sm basis-1/6"
                onClick={() => {
                  setCurrentBid(user.bid);
                  inputRef.current.focus();
                }}
              >
                Copy
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function NewBid({
  auctionID,
  userID,
  budget,
  startingPrice,
  priceStep,
  currentBid,
  setCurrentBid,
  maxBid,
  inputRef,
}) {
  const nxt = () => {
    inputRef.current.focus();
    if (currentBid.length == 0) {
      return;
    }
    if (currentBid < startingPrice) {
      setCurrentBid(startingPrice);
      return;
    }
    setCurrentBid(
      (prev) =>
        Math.floor((parseInt(prev, 10) + priceStep) / priceStep) * priceStep
    );
  };

  const prev = () => {
    inputRef.current.focus();
    if (currentBid.length == 0 || currentBid <= startingPrice) {
      return;
    }
    setCurrentBid((prev) =>
      Math.max(
        Math.floor((parseInt(prev, 10) - 1) / priceStep) * priceStep,
        startingPrice
      )
    );
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    console.log(value);
    if (!value.startsWith("0")) {
      setCurrentBid(value);
    }
  };

  

  return (
    <div className="flex flex-col gap-2">
      <SubmitBid
        auctionID={auctionID}
        currentBid={currentBid}
      ></SubmitBid>
      <div className="stats shadow-md">
        <div className="stat">
          <div className="stat-title">
            <CreditCard className="inline"></CreditCard> My Budget
          </div>
          <div className="stat-value">${budget}</div>
          <a href="#" className="link link-primary">
            Budget Management
          </a>
        </div>

        <div className="stat">
          <div className="stat-title">
            <ShoppingCart className="inline"></ShoppingCart> Maximum Bid
          </div>
          <div className="stat-value">${maxBid}</div>
          <a href="#" className="invisible">
            ???
          </a>
        </div>
      </div>

      <form className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <label className="input input-bordered flex items-center gap-2 basis-4/6 shadow-md">
            <DollarSign></DollarSign>
            <input
              ref={inputRef}
              min={startingPrice}
              step={priceStep}
              type="number"
              value={currentBid}
              className="grow"
              placeholder="Bid Amount"
              onChange={handleInputChange}
              required
            />
          </label>
          <button
            type="button"
            className="btn btn-neutral basis-1/6"
            onClick={nxt}
          >
            <Plus></Plus>
          </button>
          <button
            type="button"
            className="btn btn-neutral basis-1/6"
            onClick={prev}
          >
            <Minus></Minus>
          </button>
        </div>
        <button
          type="button"
          className="btn btn-neutral"
          onClick={() => {
            document.getElementById("Submit-bid").showModal();
          }}
        >
          <span className="text-lg">Submit</span>
        </button>
      </form>
    </div>
  );
}

const sampleTopBids = [
  { name: "user_1", bid: "10000", profileLink: "#" },
  { name: "user_5", bid: "50000", profileLink: "#" },
  { name: "user_2", bid: "20000", profileLink: "#" },
  { name: "user_3", bid: "20100", profileLink: "#" },
  { name: "user_4", bid: "40000", profileLink: "#" },
  { name: "user_3", bid: "20100", profileLink: "#" },
  { name: "user_3", bid: "20100", profileLink: "#" },
  { name: "user_3", bid: "20100", profileLink: "#" },
  { name: "user_4", bid: "40000", profileLink: "#" },
];

export default function room_bid({
  auctionID,
  userID,
  budget,
  startingPrice,
  priceStep,
  initTime,
}) {
  const inputRef = useRef(null);
  const [remTime, setRemTime] = useState(initTime); // number of seconds remaining
  const [currentBid, setCurrentBid] = useState("");
  const [Bids, setBids] = useState([]);
  // const params = useParams();

  // fetch bid
  useEffect(() => {
    const fetchBids = async (id) => {
      try {
        const res = await fetch(`/api/listing/bids/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await res.json();
        console.log(data);
        setBids(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBids(auctionID);
  }, []);

  return (
    <div className="flex flex-col w-full p-2 gap-4">
      <CountDown
        remTime={remTime}
        setRemTime={setRemTime}
        initTime={initTime}
      ></CountDown>
      <LeaderBoard
        inputRef={inputRef}
        Bids={Bids ? Bids : sampleTopBids}
        include={5}
        currentBid={currentBid}
        setCurrentBid={setCurrentBid}
      ></LeaderBoard>
      <NewBid
        inputRef={inputRef}
        maxBid={budget * 5}
        setCurrentBid={setCurrentBid}
        currentBid={currentBid}
        auctionID={auctionID}
        userID={userID}
        budget={budget}
        startingPrice={startingPrice}
        priceStep={priceStep}
      ></NewBid>
    </div>
  );
}
