import React from 'react'

export default function login() {
  return (
      <div className='flex justify-center items-center h-screen'>
        <div className="p-8 bg-base-200 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form className='flex flex-col gap-4'>
            <label className="form-input">
              User
              <input type="text" className="input-lg" placeholder="Enter your username" required/>
            </label>
            <label className="form-input">
              Password
              <input type="password" className="input-lg" id="password" name="password" placeholder="Enter your password" required />
            </label>
            <p className="text-gray-600">Not a member yet? <a href="#" className="text-blue-500">Register now</a></p>
            <button type="submit" className="btn btn-primary w-full">Login</button>
            <hr className="w-full border-t-2 border-gray-300" />
            <a href="#" className="text-blue-500 flex flex-row-reverse">Forgot password</a>
          </form>
        </div>
      </div>
  )
}
