import React from 'react'
import { useSelector } from 'react-redux';

export default function my_items() {
  const [form, setForm] = React.useState({});
  const [items, setItems] = React.useState([]);

  const currentUser = useSelector((state) => state.user);

  // fetch user items
  // useEffect(() => {
  //   const fetchUserItems = async () => {
  //     try {
  //       const res = await fetch('/api/items/user')
  //       const data = await res.json()
  //       console.log(data)
  //     } catch (error) {

  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.id]: e.target.value 
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const res = await fetch('/api/item/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      my_items

      <div className='flex justify-center items-center h-screen'>
        <div className="p-8 bg-base-200 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Add item test</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <label className="form-input">
              Item name
              <input onChange={handleChange} type="text" id="name" className="input-lg" placeholder="Enter your username" required/>
            </label>
            <label className="form-input">
              Description
              <input onChange={handleChange} type="text" id="description" className="input-lg" placeholder="Enter your username" required/>
            </label>
            <label className="form-input">
              Category
              {/* make a dropdown */}
              <input onChange={handleChange} type="text" id="category" className="input-lg" placeholder="Enter your username" required/>
            </label>
            <label className="form-input">
              Image
              {/* change to link  */}
              <input onChange={handleChange} type="text" className="input-lg" id="image" name="password" placeholder="Enter your password" required />
            </label>
            <p className="text-gray-600">Not a member yet? <a href="#" className="text-blue-500">Register now</a></p>
            <button type="submit" className="btn btn-primary w-full">Login</button>
            <hr className="w-full border-t-2 border-gray-300" />
            <a href="#" className="text-blue-500 flex flex-row-reverse">Forgot password</a>
          </form>

          {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
        </div>
      </div>
    </div>
  )
}
