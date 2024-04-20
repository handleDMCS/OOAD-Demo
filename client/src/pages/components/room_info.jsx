import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Circle } from 'react-feather'
import { CheckCircle } from 'react-feather'

// Sample images for the sake of testing that should be removed later
const sampleImg = [
  "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg", 
  "https://static.vecteezy.com/system/resources/thumbnails/023/184/201/small/goldfish-in-a-round-glass-aquarium-3d-rendering-3d-illustration-ai-generative-image-free-photo.jpg",
  "https://media.istockphoto.com/id/1468192804/photo/concept-of-generating-photo-realistic-image-by-ai-software.webp?b=1&s=170667a&w=0&k=20&c=px_Pa4eBloRCzkX5QwtSMpV_gnGbr9hqvE5ifclmsUk="
]

function Slide({pics}) {
  const cnt = pics.length
  const [currId, setCurrId] = useState(0) 

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-2 justify-center gap-4 items-center"> 
        <button className="btn btn-circle btn-neutral" onClick={() => setCurrId(currId => (currId-1+cnt) % cnt)}>
          <ChevronLeft size={38} />
        </button>
        <div className="aspect-video h-64 flex bg-neutral justify-center rounded-box shadow-md">
          <img src={pics[currId]} alt="burger"/>
        </div>
        <button className="btn btn-circle btn-neutral" onClick={() => setCurrId(currId => (currId+1) % cnt)}>
          <ChevronRight size={38} />
        </button>
      </div>
      <div className="flex flex-row gap-2 justify-center">
        {Array.from({ length: cnt }, (_, index) => (
          (index == currId) ? <CheckCircle key={index}></CheckCircle> : <Circle key={index}></Circle>
        ))}
      </div>
    </div>
  )
}

function Description(props) {
  const name = `Name: ${props.name}\n`
  const host = `Host: ${props.host}\n`
  const time = `Active during: ${props.start} - ${props.end}\n`
  const startingPrice = `Starting price: ${props.startingPrice}\n`
  const priceStep = `Price step: ${props.priceStep}\n`
  const info = `Detailed description: ${props.info}\n`
  const content = name+host+time+startingPrice+priceStep+info

  return (
    <div className="flex flex-col flex-grow overflow-hidden p-2 pt-0">
      <div className="label">
        <span className="font-bold">Description</span>
      </div>

      <textarea className="border-4 textarea shadow-md w-full min-h-48 flex-grow text-lg font-mono" value={content} style={{resize: 'none'}} readOnly>
        {/* {content} */}
      </textarea> 
    </div>
  )
}

export default function room_info(
  {host, name, start, end, startingPrice, priceStep, info}
) {
  // console.log(host, name, start, end, startingPrice, priceStep, info)
  return (
    <div className='w-full flex flex-col'>
      <Slide pics={sampleImg}></Slide>
      <Description 
        host={host} 
        name={name}
        start={start}
        end={end}
        startingPrice={startingPrice} 
        priceStep={priceStep}
        info={info}
      ></Description>
    </div>
  )
}
