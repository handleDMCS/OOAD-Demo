import { set } from 'mongoose';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  loginStart,
  loginSuccess,
  loginFailure
} from '../redux/slice/userSlice'

export default function login() {
  const [form, setForm] = useState({});
  const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.id]: e.target.value 
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        return;
      }
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  }

  return (
      <div className='flex justify-center items-center h-screen'>
        <div className="p-8 bg-base-200 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <label className="form-input">
              User
              <input onChange={handleChange} type="text" id="username" className="input-lg" placeholder="Enter your username" required/>
            </label>
            <label className="form-input">
              Password
              <input onChange={handleChange} type="password" className="input-lg" id="password" name="password" placeholder="Enter your password" required />
            </label>
            <p className="text-gray-600">Not a member yet? <a href="#" className="text-blue-500">Register now</a></p>
            <button type="submit" className="btn btn-primary w-full">Login</button>
            <hr className="w-full border-t-2 border-gray-300" />
            <a href="#" className="text-blue-500 flex flex-row-reverse">Forgot password</a>
          </form>

          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
  )
}
