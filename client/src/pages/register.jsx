import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	signupStart,
	signupSuccess,
	signupFailure,
} from '../redux/slice/userSlice';

export default function register() {
  const [formData, setFormData] = useState({});
	const {loading, error} = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setFormData(
			{
				...formData,
				[e.target.id]: e.target.value,
			}
		);
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(signupStart());
		try {
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			}
			);
			const data = await res.json();
			console.log(data)
			if(data.success === false) {
				dispatch(signupFailure(data.message));
				return;
			}
			dispatch(signupSuccess(data));
			navigate('/login')
			// console.log(data)
		} catch (error) {
			dispatch(signupFailure(error.message));
		}
	}

  return (
    <div>
      <div className='flex justify-center items-center h-screen'>
        <div className="p-8 bg-base-200 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <label className="form-input">
              First Name
              <input onChange={handleChange} type="text" className="input-lg" id='firstname' placeholder="Enter your first name" required/>
            </label>
            <label className="form-input">
              Last Name
              <input onChange={handleChange} type="text" className="input-lg" id='lastname' placeholder="Enter your last name" required/>
            </label>
            <label className="form-input">
              User
              <input onChange={handleChange} type="text" className="input-lg" id='username' placeholder="Enter your username" required/>
            </label>
            <label className="form-input">
              Email
              <input onChange={handleChange} type="email" className="input-lg" id='email' placeholder="Enter your emal" required/>
            </label>
            <label className="form-input">
              Password
              <input onChange={handleChange} type="password" className="input-lg" id="password" name="password" placeholder="Enter your password" required />
            </label>
            <label className="form-input">
              Confirm password
              <input onChange={handleChange} type="password" className="input-lg" id="confpassword" name="confpassword" placeholder="Confirm your password" required />
            </label>
            <button disabled={loading} type="submit" className="btn btn-primary w-full">Register</button>
          </form>

          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
  )
}
