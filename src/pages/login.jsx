import React from 'react'

export default function login() {
  return (
      <div className='flex justify-center items-center h-screen'>
        <div class="p-8 bg-base-200 rounded-md shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Login</h2>
          <form className='flex flex-col gap-4'>
            <label class="form-input">
              User
              <input type="text" class="input-lg" placeholder="Enter your username" required/>
            </label>
            <label class="form-input">
              Password
              <input type="password" class="input-lg" id="password" name="password" placeholder="Enter your password" required />
            </label>
            <p class="text-gray-600">Not a member yet? <a href="#" class="text-blue-500">Register now</a></p>
            <button type="submit" class="btn btn-primary w-full">Login</button>
            <hr class="w-full border-t-2 border-gray-300" />
            <a href="#" class="text-blue-500 flex flex-row-reverse">Forgot password</a>
          </form>
        </div>
      </div>
  )
}
