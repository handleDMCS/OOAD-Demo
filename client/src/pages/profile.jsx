import React, {useState} from 'react'
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom'
import { logoutStart, logoutFailure, logoutSuccess } from '../redux/slice/userSlice';
import { addItemStart, addItemSuccess, addItemFailure } from '../redux/slice/itemSlice';

export default function profile() {
  const [item, setItem] = useState([]);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logoutStart())
      const res = await fetch('/api/auth/logout');
      const data = await res.json()
      if(data.success == false) {
        dispatch(logoutFailure(data.message))
      } 
      console.log(data)
      dispatch(logoutSuccess())
    } catch (error) {
      dispatch(logoutFailure(error))
    }
  }

  const handleChangeItem = (e) => {
    setItem({ 
      ...item, 
      [e.target.id]: e.target.value 
    });
  }

  const handleAddItem = async (e) => {
    e.preventDefault();
    dispatch(addItemStart());
    try {
      const res = await fetch('/api/item/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(addItemFailure(data.message));
        return;
      }
      dispatch(addItemSuccess(data));
    } catch (error) {
      dispatch(addItemFailure(error.message));
    }
  }

  return (
    <div>
      Profile

      <button onClick={handleLogout} type="submit" className="btn btn-primary">Logout</button>

      <div>
        <div className='flex justify-center items-center h-screen'>
          <div className="p-8 bg-base-200 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleAddItem} className='flex flex-col gap-4'>
              <label className="form-input">
                Name
                <input onChange={handleChangeItem} type="text" id="name" className="input-lg" placeholder="Enter your username" required/>
              </label>
              <label className="form-input">
                Description
                <input onChange={handleChangeItem} type="text" className="input-lg" id="description" placeholder="Enter your password" required />
              </label>
              <label className="form-input">
                Image
                <input onChange={handleChangeItem} type="text" className="input-lg" id="image" placeholder="Enter your password" required />
              </label>
              <p className="text-gray-600">Not a member yet? <a href="#" className="text-blue-500">Register now</a></p>
              <button type="submit" className="btn btn-primary w-full">Login</button>
              <hr className="w-full border-t-2 border-gray-300" />
              <a href="#" className="text-blue-500 flex flex-row-reverse">Forgot password</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
