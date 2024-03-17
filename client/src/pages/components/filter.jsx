import React from 'react'

export default function filter() {
  return (
    <form>
      <div class="form-control gap-2">
        <span class="label-text">User / Item</span>
        <input type="text" placeholder="Search for a user" class="filter-input" />
        <input type="text" placeholder="Search for an item" class="filter-input" />
        <span class="label-text">Starting Price</span>
        <input type="text" placeholder="Min" class="filter-input" />
        <input type="text" placeholder="Max" class="filter-input" />
        <span className="label-text">Category</span>
        <div class="overflow-y-auto h-28 border border-gray-300">
          {Array.from({ length: 10 }, (_, index) => (
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox ml-2" />
              <span class="ml-2">Option</span>
            </label>
          ))}
        </div>
        <button type="submit" class="btn btn-primary">Filter</button>
      </div>
    </form>
  )
}
