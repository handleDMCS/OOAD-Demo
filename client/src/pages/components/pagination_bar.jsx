import React from 'react'

export default function pagination_bar() {
  return (
    <div className="flex flex-row justify-center gap-2 p-2 bg-neutral-300">
        <select class="select select-bordered select-sm">
        {Array.from({ length: 10 }, (_, index) => (
            <option>Page {index + 1}</option>
        ))}
        </select>
        <button className="btn btn-primary btn-sm">
        Prev
        </button>
        <button className="btn btn-primary btn-sm">
        Next
        </button>
    </div>
  )
}
