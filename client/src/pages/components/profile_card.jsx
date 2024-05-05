import React, { useEffect, useState } from "react";
import { Phone } from "react-feather";
import { Mail } from "react-feather";
import { Facebook } from "react-feather";
import { Settings } from "react-feather";
import { UserPlus } from "react-feather";
import { Search } from "react-feather";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "../../redux/slice/userSlice";

function Contact_card({ icon, label, value, link = false }) {
  return (
    <div className="flex flex-row p-2 justify-between bg-white rounded-md shadow-md items-center">
      <span className="flex gap-2 font-semibold">
        {icon} {label}
      </span>
      {link == false ? (
        <span className="link">{value}</span>
      ) : (
        <span className="link link-primary">
          <a href={link}>Visit Facebook</a>
        </span>
      )}
      {/* <a href="https://example.com">Visit Example</a> */}
      {/* <span className='link link-primary'>{value}</span> */}
    </div>
  );
}

function Edit({ userID }) {
	const user = useSelector((state) => state.user.user);
	const [formUser, setFormUser] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormUser({ ...formUser, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/user/update/${userID}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formUser)
			})
			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

  return (
    <dialog id="edit-profile" className="modal">
      <div className="modal-box w-1/2 max-w-5xl">
        <form className="flex flex-col gap-2">
          <label className="form-input-file">
            Avatar
            <input type="file" className="file-input file-input-bordered" />
          </label>

          <label className="form-input">
            First Name
            <input
              type="text"
              className="input-lg"
              placeholder="Your Public Name"
							defaultValue={user.firstname}
							onChange={handleChange}
              required
            />
          </label>

					<label className="form-input">
            Last Name
            <input
              type="text"
              className="input-lg"
              placeholder="Your Public Name"
							defaultValue={user.lastname}
							onChange={handleChange}
              required
            />
          </label>

          <label className="form-input">
            Gmail
            <input
              type="text"
              className="input-lg"
              placeholder="Your Gmail"
							defaultValue={user.email}
							onChange={handleChange}
              required
            />
          </label>

          <textarea
            className="textarea textarea-bordered min-h-48 input-lg"
            placeholder="Description"
          ></textarea>

          <button onSubmit={handleSubmit} type="submit" className="btn btn-primary w-full">
            Save
          </button>
        </form>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default function profile_card({
  view,
  admin,
  userID,
}) {
	const [user, setUser] = useState({});
	const params = useParams();

  console.log(params.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

	// fetch current user
	useEffect(() => {
		const fetchUser = async (id) => {
			try {
				const res = await fetch(`/api/user/${id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				const data = await res.json();
				// console.log(data);
				setUser(data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchUser(params.id);
	}, [])

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      dispatch(logoutStart());
      const res = await fetch("/api/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success == false) {
        dispatch(logoutFailure(data.msg));
      }
      dispatch(logoutSuccess(data));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };;
  return (
    <div className="flex flex-row rounded-box bg-base-200 flex-grow overflow-hidden">
      <Edit userID={userID}></Edit>
      <div className="flex basis-2/6 bg-neutral flex-col">
        <div className="flex justify-center items-center basis-5/12 p-2">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-40 h-40 flex items-center justify-center bg-gray-200 rounded-full overflow-hidden">
              <img
                src="https://i.kym-cdn.com/photos/images/original/002/382/633/9c9.jpg"
                alt="burger"
              />
            </div>
            <span className="text-neutral-content text-lg font-semibold">
              {user ? user.firstname + " " + user.lastname : "User"}
            </span>
          </div>
        </div>

        <div className="flex basis-7/12 justify-center rounded-tl-2xl rounded-tr-2xl overflow-hidden">
          <div className="bg-neutral-content flex flex-col flex-grow p-2 gap-2">
            <Contact_card
              icon={<Phone></Phone>}
              label={"Phone"}
              value="0123456789"
            ></Contact_card>
            <Contact_card
              icon={<Mail></Mail>}
              label={"Gmail"}
              value={user ? user.email : ""}
            ></Contact_card>
            <Contact_card
              icon={<Facebook></Facebook>}
              label={"Facebook"}
              link="https://web.facebook.com/profile.php?id=100012763290155"
            ></Contact_card>

            <div className="flex flex-row gap-2 flex-grow justify-center pt-4">
              {view == "user" && (
                <button
                  className="btn btn-primary text-lg"
                  onClick={() => {
                    document.getElementById("edit-profile").showModal();
                  }}
                >
                  <Settings></Settings>
                  Edit
                </button>
              )}
              {view == "visitor" && (
                <button className="btn btn-primary text-lg">
                  <Search></Search>
                  View upcoming auctions
                </button>
              )}
              {admin == true && view == "user" && (
                <button className="btn btn-error text-lg">
                  <UserPlus></UserPlus>
                  Admin
                </button>
              )}
              {
                <button
                  onClick={handleLogout}
                  type="submit"
                  className="btn btn-primary"
                >
                  Logout
                </button>
              }
            </div>
          </div>
        </div>
      </div>

      <div className="flex basis-4/6 p-4 shadow-2xl bg-base-300 relative">
        <span className="absolute top-1 left-10 font-bold">Description</span>
        <div className="flex flex-grow bg-base-200 rounded-box shadow-lg pt-3 pl-3">
          <div className="flex flex-grow overflow-scroll">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure
            eius earum ut molestias architecto voluptate aliquam nihil, eveniet
            aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur
            error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias
            eos sapiente officiis modi at sunt excepturi expedita sint? Sed
            quibusdam recusandae alias error harum maxime adipisci amet laborum.
            Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates
            a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius
            fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero
            magni deleniti quod quam consequuntur! Commodi minima excepturi
            repudiandae velit hic maxime doloremque. Quaerat provident commodi
            consectetur veniam similique ad earum omnis ipsum saepe, voluptas,
            hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam
            cupiditate excepturi mollitia maiores labore suscipit quas? Nulla,
            placeat. Voluptatem quaerat non architecto ab laudantium modi minima
            sunt esse temporibus sint culpa, recusandae aliquam numquam totam
            ratione voluptas quod exercitationem fuga. Possimus quis earum
            veniam quasi aliquam eligendi, placeat qui corporis! Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum
            laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto
            fuga praesentium optio, eaque rerum! Provident similique accusantium
            nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias
            architecto voluptate aliquam nihil, eveniet aliquid culpa officia
            aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt
            ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error
            repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis
            modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias
            error harum maxime adipisci amet laborum. Perspiciatis minima
            nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
            quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus
            tenetur fugiat, temporibus enim commodi iusto libero magni deleniti
            quod quam consequuntur! Commodi minima excepturi repudiandae velit
            hic maxime doloremque. Quaerat provident commodi consectetur veniam
            similique ad earum omnis ipsum saepe, voluptas, hic voluptates
            pariatur est explicabo fugiat, dolorum eligendi quam cupiditate
            excepturi mollitia maiores labore suscipit quas? Nulla, placeat.
            Voluptatem quaerat non architecto ab laudantium modi minima sunt
            esse temporibus sint culpa, recusandae aliquam numquam totam ratione
            voluptas quod exercitationem fuga. Possimus quis earum veniam quasi
            aliquam eligendi, placeat qui corporis!
          </div>
        </div>
      </div>
    </div>
  );
}
