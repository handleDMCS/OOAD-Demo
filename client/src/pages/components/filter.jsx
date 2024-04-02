import React from 'react'

export default function filter() {
  return (
    <form>
      <div className="form-control gap-2">
        <span className="label-text">User / Item</span>
        <input type="text" placeholder="Search for a user" className="filter-input" />
        <input type="text" placeholder="Search for an item" className="filter-input" />
        <span className="label-text">Starting Price</span>
        <input type="text" placeholder="Min" className="filter-input" />
        <input type="text" placeholder="Max" className="filter-input" />
        <span className="label-text">Category</span>
        <div className="overflow-y-auto h-28 border border-gray-300">
          {Array.from({ length: 10 }, (_, index) => (
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox ml-2" />
              <span className="ml-2">Option</span>
            </label>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">Filter</button>
      </div>
    </form>
  )
}
