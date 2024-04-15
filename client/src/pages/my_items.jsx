import React from 'react'
import { useSelector } from 'react-redux';
import Navbar from './components/nav_bar'
import Item_panel from './components/item_panel'

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
      <div className='flex flex-row'>
        <Navbar currentPage='My-Items'></Navbar>
        <div className="flex flex-grow pt-2 pr-2 pb-2">
          <Item_panel></Item_panel>
        </div>
      </div>
    </div>
  )
}
