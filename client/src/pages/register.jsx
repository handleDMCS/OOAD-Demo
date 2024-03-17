import React from 'react'

export default function register() {
  return (
    <div>
      <div className='flex justify-center items-center h-screen'>
        <div class="p-8 bg-base-200 rounded-md shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Login</h2>
          <form className='flex flex-col gap-4'>
            <label class="form-input">
              User
              <input type="text" class="input-lg" placeholder="Enter your username" required/>
            </label>
            <label class="form-input">
              Email
              <input type="email" class="input-lg" placeholder="Enter your emal" required/>
            </label>
            <label class="form-input">
              Password
              <input type="password" class="input-lg" id="password" name="password" placeholder="Enter your password" required />
            </label>
            <label class="form-input">
              Confirm password
              <input type="password" class="input-lg" id="password" name="password" placeholder="Confirm your password" required />
            </label>
            <button type="submit" class="btn btn-primary w-full">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}
