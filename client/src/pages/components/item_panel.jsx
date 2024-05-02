import React, { useEffect, useState } from "react";
import Pagination_bar from "./pagination_bar";
import Product_card from "./product_card";
import { FilePlus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addItemStart, addItemSuccess, addItemFailure,
  deleteItemStart, deleteItemSuccess, deleteItemFailure,
  fetchItemsStart, fetchItemsSuccess, fetchItemsFailure,
  updateItemStart, updateItemSuccess, updateItemFailure,
} from "../../redux/slice/itemSlice";

function Add_Item_Info() {
  const [item, setItem] = useState({});

  // const { loading, error } = useSelector((state) => state.item);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeAddItem = (e) => {
    setItem({
      ...item,
      [e.target.id]: e.target.value,
    });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    dispatch(addItemStart());
    try {
      const res = await fetch("/api/item/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(addItemFailure(data.message));
        return;
      }
      dispatch(addItemSuccess(data));
      navigate(0);
    } catch (error) {
      setError(error.message);
      dispatch(addItemFailure(error.message));
    }
  };

  return (
    <dialog id="add-item" className="modal">
      <div className="modal-box w-1/2 max-w-5xl">
        <h3 className="font-bold text-2xl mb-5">Add Item</h3>
        <form onSubmit={handleAddItem} className="flex flex-col gap-2">
          <label className="form-input">
            Product Images
            <input
              id="image"
              onChange={handleChangeAddItem}
              type="file"
              className="input-lg"
              required
            />
          </label>

          <label className="form-input">
            Item
            <input
              id="name"
              onChange={handleChangeAddItem}
              type="text"
              className="input-lg"
              placeholder="Name your item"
              required
            />
          </label>
          <label className="form-input">
            Initial Price
            <input
              id="initialprice"
              onChange={handleChangeAddItem}
              type="number"
              className="input-lg"
              placeholder="Original price"
              required
            />
          </label>
          <label className="form-input">
            Price Step
            <input
              id="jump"
              onChange={handleChangeAddItem}
              type="number"
              className="input-lg"
              placeholder="Price step"
              required
            />
          </label>
          <textarea
            id="description"
            onChange={handleChangeAddItem}
            className="textarea textarea-bordered min-h-48 input-lg"
            placeholder="Description"
          ></textarea>
          <label className="form-input">
            Duration
            <input
              id="duration"
              onChange={handleChangeAddItem}
              type="number"
              className="input-lg"
              placeholder="Duration in seconds"
              required
            />
          </label>
          <label className="form-input">
            Start Time
            <input
              id="startTime"
              onChange={handleChangeAddItem}
              type="datetime-local"
              className="input-lg"
              placeholder=""
              required
            />
          </label>
          <button type="submit" className="btn btn-primary w-full">
            Save
          </button>

          {error && <p className="text-red-500">{error}</p>}
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

function Edit_Item_Info() {
  const currentItem = useSelector((state) => state.item.item);
  const [item, setItem] = useState({});
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (currentItem != null)
    useEffect(() => {
      setItem(currentItem);
    }, []);

  console.log("currentItem:", currentItem);
  console.log("item:", item);

  const handleChangeEditItem = (e) => {
    setItem({
      ...item,
      [e.target.id]: e.target.value,
    });
  };

  const handleEditItem = async (e) => {
    e.preventDefault();
    const id = currentItem._id;
    console.log(item);
    try {
      const res = await fetch(`/api/item/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },  
        body: JSON.stringify(item),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateItemFailure(data.message));
        return;
      }
      dispatch(updateItemSuccess(data));
      navigate(0);
    } catch (error) {
      setError(error.message);
      dispatch(updateItemFailure(error.message));
    }
  };

  return (
    <dialog id="item-info" className="modal">
      <div className="modal-box w-1/2 max-w-5xl">
        <h3 className="font-bold text-2xl mb-5">Update Item</h3>
        <form onSubmit={handleEditItem} className="flex flex-col gap-2">
          <label className="form-input">
            Product Images
            <input
              id="image"
              onChange={handleChangeEditItem}
              type="file"
              className="input-lg"
            />
          </label>

          <label className="form-input">
            Item name
            <input
              id="productName"
              onChange={handleChangeEditItem}
              type="text"
              className="input-lg"
              placeholder="Name your item"
              defaultValue={item.productName}
              required
            />
          </label>
          <label className="form-input">
            Initial Price
            <input
              id="initialPrice"
              onChange={handleChangeEditItem}
              type="number"
              className="input-lg"
              placeholder="Original price"
              defaultValue={item.initialPrice}
              required
            />
          </label>
          <label className="form-input">
            Price Step
            <input
              id="jump"
              onChange={handleChangeEditItem}
              type="number"
              className="input-lg"
              placeholder="Price step"
              defaultValue={item.jump}
              required
            />
          </label>
          <textarea
            id="description"
            onChange={handleChangeEditItem}
            className="textarea textarea-bordered min-h-48 input-lg"
            placeholder="Description"
            defaultValue={item.description}
          ></textarea>
          <label className="form-input">
            Duration
            <input
              id="duration"
              onChange={handleChangeEditItem}
              type="number"
              className="input-lg"
              placeholder="Duration in seconds"
              defaultValue={item.duration}
              required
            />
          </label>
          <button type="submit" className="btn btn-primary w-full">
            Update
          </button>

          {error && <p className="text-red-500">{error}</p>}
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

function Delete_item() {
  const currentItem = useSelector((state) => state.item.item);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   setItem(currentItem);
  // }, [item]);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/item/delete/${currentItem._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(deleteItemFailure(data.message));
        return;
      }
      dispatch(deleteItemSuccess(data));
      navigate(0);
    } catch (error) {
      dispatch(deleteItemFailure(error.message));
    }
  };

  return (
    <dialog id="delete-item" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure ?</h3>
        <p className="py-4">You won't be able to revert this</p>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={handleDelete} className="btn btn-primary mr-2">
              Yes, delete it!
            </button>
            <button className="btn">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

function Add_item() {
  return (
    <div className="p-3 card-spacing">
      <div className="card card-compact bg-base-100 shadow-xl h-full">
        <button
          className="btn h-full w-full flex-col gap-5 noHover"
          onClick={() => {
            document.getElementById("add-item").showModal();
          }}
        >
          <FilePlus className="w-12 h-12"></FilePlus>
          <span className="font-lg">New Item</span>
        </button>
      </div>
    </div>
  );
}

export default function item_panel() {
  const [listings, setListings] = useState([]);

  const dispatch = useDispatch();

  // fetch user listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        dispatch(fetchItemsStart());
        const res = await fetch("/api/listing/listings/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(fetchItemsFailure(data.message));
          return;
        }
        dispatch(fetchItemsSuccess(data));
        setListings(data);
        console.log(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="flex flex-grow flex-col bg-base-200">
      <Add_Item_Info></Add_Item_Info>
      <Delete_item></Delete_item>
      <Edit_Item_Info></Edit_Item_Info>
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

            {listings &&
              listings.map((listing) => (
                <Product_card
                  key={listing._id}
                  handleClick={(e) => {
                    e.stopPropagation();
                    document.getElementById("item-info").showModal();
                    dispatch(updateItemStart(listing));
                  }}
                  canDelete
                  handleDelete={(e) => {
                    e.stopPropagation();
                    document.getElementById("delete-item").showModal();
                    dispatch(deleteItemStart(listing));
                  }}
                  name={listing.productName}
                  owner={listing.owner.firstname + " " + listing.owner.lastname}
                  description={listing.description}
                  highestBid={listing.currentPrice}
                  duration={listing.timer}
                  image={listing.image}
                />
              ))}

            <Add_item></Add_item>
          </div>
        </div>
      </div>
    </div>
  );
}
