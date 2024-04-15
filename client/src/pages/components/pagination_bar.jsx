import React from 'react'

export default function pagination_bar() {
  return (
    <div className="flex flex-row justify-center gap-2 p-2 bg-neutral-300">
        <select className="select select-bordered select-sm">
        {Array.from({ length: 10 }, (_, index) => (
            <option
              key={index}
            >Page {index + 1}</option>
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
