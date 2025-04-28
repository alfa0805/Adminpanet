import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Url = "https://back.ifly.com.uz/api/contact";

function Contact() {
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const getContact = () => {
    fetch(`${Url}`)
      .then((res) => res.json())
      .then((element) => setData(element?.data));
  };
  console.log(data);

  useEffect(() => {
    getContact();
  }, []);

  // add Contact
  const [addmodal, setAddmodal] = useState(false);
  const [number, setnumber] = useState();
  const [email, setemail] = useState();
  const [addressen, setaddressen] = useState();
  const [addressru, setaddressru] = useState();
  const [addressde, setaddressde] = useState();
  const addContact = (event) => {
    event.preventDefault();
    fetch(`${Url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phone_number: number,
        email: email,
        address_en: addressen,
        address_ru: addressru,
        address_de: addressde,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success("muffaqiyatli");
          setAddmodal(false);
          getContact();
        } else {
          toast.error(item?.message?.error || "Kategoriya o'chirilmadi");
        }
      });
  };

  // delete Contact : malumot ochirish

  const deleteContact = (id) => {
    fetch(`${Url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success(item?.data?.message);
          getContact();
        } else {
          toast.error(item?.message || "Kategoriya o'chirilmadi");
        }
      });
  };

  return (
    <div className="pl-[250px] pr-5 pt-[100px] bg-gray-200 relative">
      <div className="w-full bg-white p-5 shadow-lg rounded-lg">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-2xl font-semibold text-shadow-lg">Contact</h2>
          <button
            onClick={() => setAddmodal(!addmodal)}
            className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
          >
            Add Contact
          </button>
        </div>

        {/* add catigoriy : malumot qoshish  */}
        {addmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={addContact}
              action=""
              className=" relative w-[350px] h-[80%] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-center justify-around gap-4 p-7 rounded-lg"
            >
              <input
                onChange={(e) => setnumber(`+998${e.target.value}`)}
                type="number"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Nameen"
              />

              <input
                onChange={(e) => setemail(e.target.value)}
                type="email"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Nameen"
              />

              <textarea
                onChange={(e) => setaddressen(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Nameen"
              />

              <textarea
                onChange={(e) => setaddressru(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Nameru"
              />

              <textarea
                onChange={(e) => setaddressde(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Namede"
              />

              <button className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                Add Contact
              </button>
              <div className=" absolute top-2 right-7">
                <button
                  onClick={() => setAddmodal(!addmodal)}
                  className="text-red-500"
                >
                  <AiOutlineCloseCircle className="text-red-500 text-2xl" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* get Contact malumot chiqarish  */}
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">№</th>
              <th className="border px-4 py-2">Phone Number</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Address (EN)</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-200 text-shadow-md">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">
                  {item.phone_number}
                </td>
                <td className="border px-4 py-2 text-center">{item.email}</td>
                <td className="border px-4 py-2 text-center">
                  {item.address_en}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button className="px-3 py-1 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                    edit
                  </button>
                  <button
                    onClick={() => deleteContact(item?.id)}
                    className="px-3 py-1 ml-2 bg-amber-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Contact;
