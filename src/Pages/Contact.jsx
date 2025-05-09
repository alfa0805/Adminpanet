import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Atom } from "react-loading-indicators";
import { toast } from "react-toastify";

const Url = "https://testaoron.limsa.uz/api/contact";

function Contact() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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
  const [number, setnumber] = useState("");
  const [code, setcode] = useState(+998);
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
        phone_number: `${code} ${number}`,
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
  const [deletemodal, setDeletemodal] = useState(false);
  const deleteContact = () => {
    fetch(`${Url}/${selectedId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          setDeletemodal(false);
          toast.success(item?.data?.message);
          getContact();
        } else {
          toast.error(item?.message || "Kategoriya o'chirilmadi");
        }
      });
  };

  // const selectnumber = (num) => {
  //   setnumber(num);
  // };

  // edit contact
  const [editmodal, seteditmodal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const editcontact = (event) => {
    event.preventDefault();
    fetch(`${Url}/${selectedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phone_number: `${code} ${number}`,
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
          seteditmodal(false);
          getContact();
        } else {
          toast.error(item?.message?.error || "Kategoriya o'chirilmadi");
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

        {/* add contact : malumot qoshish  */}
        {addmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={addContact}
              action=""
              className=" relative w-[350px] h-[80%] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-center justify-around gap-4 p-7 rounded-lg"
            >
              <p className="text-2xl font-semibold">Add Contact</p>
              <label
                htmlFor=""
                className="flex items-center border w-full rounded-md"
              >
                <select
                  name=""
                  id=""
                  className=" outline-none"
                  onChange={(e) => setcode(e.target.value)}
                >
                  <option value="+998">Uz</option>
                  <option value="+788">ru</option>
                  <option value="+108">en</option>
                  <option value="+43">de</option>
                  <option value="+080">tu</option>
                </select>
                <input
                  onChange={(e) => setnumber(`${num}${e.target.value}`)}
                  type="number"
                  required
                  className=" outline-none rounded-md w-full px-3 py-1"
                  placeholder={number?.num}
                />
              </label>
              <input
                onChange={(e) => setemail(e.target.value)}
                type="email"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Email"
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

        {/* edit contact : malumot yangilash  */}
        {editmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={editcontact}
              action=""
              className=" relative w-[350px] h-[80%] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-center justify-around gap-4 p-7 rounded-lg"
            >
              <p className="text-2xl font-semibold">Edit Contact</p>
              <label
                htmlFor=""
                className="flex items-center border w-full rounded-md"
              >
                <select
                  value={code}
                  className=" outline-none"
                  onChange={(e) => setcode(e.target.value)}
                >
                  <option value="+998">Uz</option>
                  <option value="+788">ru</option>
                  <option value="+108">en</option>
                  <option value="+43">de</option>
                  <option value="+080">tu</option>
                </select>
                <input
                  onChange={(e) => setnumber(`${e.target.value}`)}
                  type="number"
                  value={`${number}`}
                  required
                  className=" outline-none rounded-md w-full px-3 py-1"
                  placeholder="tel"
                />
              </label>
              <input
                onChange={(e) => setemail(e.target.value)}
                type="email"
                value={email}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Email"
              />

              <textarea
                onChange={(e) => setaddressen(e.target.value)}
                type="text"
                value={addressen}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="addres_en"
              />

              <textarea
                onChange={(e) => setaddressru(e.target.value)}
                type="text"
                value={addressru}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="addres_ru"
              />

              <textarea
                onChange={(e) => setaddressde(e.target.value)}
                type="text"
                value={addressde}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="addres_de"
              />

              <button className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                Add Contact
              </button>
              <div className=" absolute top-2 right-7">
                <button
                  onClick={() => seteditmodal(!editmodal)}
                  className="text-red-500"
                >
                  <AiOutlineCloseCircle className="text-red-500 text-2xl" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* delete modall  */}
        {deletemodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <div className=" w-[300px] h-[200px] flex flex-col bg-white rounded-md items-center justify-center gap-5">
              <p className="pb-5 text-red-500 text-shadow-lg text-xl text-center">
                Haqiqatdan ham o'chirmoqchimisiz
              </p>
              <div className="flex items-center justify-center gap-5">
                <button
                  onClick={() => {
                    // deletecategory(item.id);
                    setDeletemodal(false);
                  }}
                  className="px-3 py-1 ml-2 bg-amber-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                >
                  Close
                </button>

                <button
                  onClick={deleteContact}
                  className="px-3 py-1 ml-2 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* get Contact malumot chiqarish  */}
        {loading ? (
          <div className="flex items-center justify-center">
            <Atom color="#ffa600" size="medium" text="" textColor="" />
          </div>
        ) : (
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
                    <button
                      onClick={() => {
                        setSelectedId(item.id);

                        const [codePart, ...numPart] =
                          item.phone_number.split(" ");
                        setcode(codePart);
                        setnumber(numPart.join(" ")); // numberni qayta yig'ib olamiz

                        setemail(item.email);
                        setaddressen(item.address_en);
                        setaddressru(item.address_ru);
                        setaddressde(item.address_de);
                        seteditmodal(true);
                      }}
                      className="px-3 py-1 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedId(item.id);
                        setDeletemodal(true);
                      }}
                      className="px-3 py-1 ml-2 bg-amber-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Contact;
