import React, { useEffect } from 'react'
import { Phone } from 'react-feather'
import { Mail } from 'react-feather'
import { Facebook } from 'react-feather'    
import { Settings } from 'react-feather'
import { UserPlus } from 'react-feather'
import { Search } from 'react-feather'

function Contact_card({icon, label, value, link=false}) {
  return (
    <div className='flex flex-row p-2 justify-between bg-white rounded-md shadow-md items-center'>
        <span className='flex gap-2 font-semibold'>
            {icon} {label}
        </span>
        {(link == false) ? 
            <span className='link'>{value}</span> : 
            <span className='link link-primary'>
                <a href={link}>Visit Facebook</a>
            </span>
        }
        {/* <a href="https://example.com">Visit Example</a> */}
      {/* <span className='link link-primary'>{value}</span> */}
    </div>
  )
}

function Edit({userID}) {
    return (
        <dialog id="edit-profile" className="modal">
            <div className="modal-box w-1/2 max-w-5xl">
                <form className='flex flex-col gap-2'>
                    <label className="form-input-file">Avatar
                        <input type="file" className="file-input file-input-bordered"/>
                    </label>

                    <label className="form-input">
                        Name 
                        <input type="text" className="input-lg" placeholder="Your Public Name" required/>
                    </label>

                    <label className="form-input">
                        Phone
                        <input type="text" className="input-lg" placeholder="Your Phone Number" required/>
                    </label>

                    <label className="form-input">
                        Gmail
                        <input type="text" className="input-lg" placeholder="Your Gmail" required/>
                    </label>

                    <label className="form-input">
                        Facebook
                        <input type="text" className="input-lg" placeholder="Your Facebook (Optional)" />
                    </label>

                    <textarea className="textarea textarea-bordered min-h-48 input-lg" placeholder="Description"></textarea>
                    <button type="submit" className="btn btn-primary w-full">Save</button>
                </form>

                <div className="modal-action">
                <form method="dialog">
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
        </dialog> 
     )
}


export default function profile_card({view='visitor', admin=false, userID=-1}) {
  return (
    <div className='flex flex-row rounded-box bg-base-200 flex-grow overflow-hidden'>
        <Edit userID={userID}></Edit>
        <div className="flex basis-2/6 bg-neutral flex-col">
            <div className="flex justify-center items-center basis-5/12 p-2">
                <div className="flex flex-col items-center justify-center gap-2">
                    <div class="w-40 h-40 flex items-center justify-center bg-gray-200 rounded-full overflow-hidden">
                        <img src='https://i.kym-cdn.com/photos/images/original/002/382/633/9c9.jpg' alt="burger"/>
                    </div>
                    <span className='text-neutral-content text-lg font-semibold'>Gigachad</span>
                </div>
            </div>

            <div className="flex basis-7/12 justify-center rounded-tl-2xl rounded-tr-2xl overflow-hidden">
                <div className="bg-neutral-content flex flex-col flex-grow p-2 gap-2">
                    <Contact_card icon={<Phone></Phone>} label={'Phone'} value='123456789'></Contact_card>
                    <Contact_card icon={<Mail></Mail>} label={'Gmail'} value='dungg1810@gmail.com'></Contact_card>
                    <Contact_card icon={<Facebook></Facebook>} label={'Facebook'} link='https://web.facebook.com/profile.php?id=100012763290155'></Contact_card>
                    {/* <span className="flex">Phone</span>
                    <span className="flex"></span>
                    <span className="flex"></span> */}
                    <div className="flex flex-row gap-2 flex-grow justify-center pt-4">
                        {
                            (view == 'user') && 
                            <button className="btn btn-primary text-lg" onClick={()=>{document.getElementById('edit-profile').showModal()}}>
                                <Settings></Settings>
                                Edit
                            </button>
                        }
                        {
                            (view == 'visitor') && 
                            <button className="btn btn-primary text-lg">
                                <Search></Search>
                                View upcoming auctions
                            </button>

                        }
                        {
                            (admin == true && view == 'user') && 
                            <button className="btn btn-error text-lg">
                                <UserPlus></UserPlus>
                                Admin
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>

        <div className="flex basis-4/6 p-4 shadow-2xl bg-base-300 relative">
            <span className='absolute top-1 left-10 font-bold'>Description</span>
            <div className="flex flex-grow bg-base-200 rounded-box shadow-lg pt-3 pl-3">
                <div className="flex flex-grow overflow-scroll">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                    quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
                    sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                    recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
                    minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
                    quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
                    fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
                    consequuntur! Commodi minima excepturi repudiandae velit hic maxime
                    doloremque. Quaerat provident commodi consectetur veniam similique ad 
                    earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
                    fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
                    suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
                    modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
                    totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
                    quasi aliquam eligendi, placeat qui corporis!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                    quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
                    sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                    recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
                    minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
                    quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
                    fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
                    consequuntur! Commodi minima excepturi repudiandae velit hic maxime
                    doloremque. Quaerat provident commodi consectetur veniam similique ad 
                    earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
                    fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
                    suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
                    modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
                    totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
                    quasi aliquam eligendi, placeat qui corporis!
                </div>
            </div>
        </div>
    </div>
  )
}
