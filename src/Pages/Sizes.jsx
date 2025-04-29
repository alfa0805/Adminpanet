import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Atom } from "react-loading-indicators";
import { toast } from "react-toastify";

const Url = "https://back.ifly.com.uz/api/sizes";

function Sizes() {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const [data, setData] = useState([]);
  const getSizes = () => {
    fetch(`${Url}`)
      .then((res) => res.json())
      .then((element) => setData(element?.data));
  };
  console.log(data);

  useEffect(() => {
    getSizes();
  }, []);

  // add Sizes
  const [addmodal, setAddmodal] = useState(false);
  const [size, setsize] = useState();
  const addSizes = (event) => {
    event.preventDefault();
    fetch(`${Url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        size: size,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success("Muffaqiyatli");
          setAddmodal(false);
          getSizes();
        } else {
          toast.error(item?.message?.error || "Kategoriya o'chirilmadi");
        }
      });
  };

  // delete Sizes : malumot ochirish
  const [deletemodal, setDeletemodal] = useState(false);

  const deleteSizes = (event) => {
    event.preventDefault();
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
          toast.success(item?.data?.message || "Muffaqiyatli o'chirildi");
          getSizes();
        } else {
          toast.error(item?.message || "Muffaqiyatli o'chirilmadi");
        }
      });
  };

  // edit sizes
  const [editmodal, seteditmodal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const editsizes = (event) => {
    event.preventDefault();
    fetch(`${Url}/${selectedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        size: size,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success("Muffaqiyatli");
          seteditmodal(false);
          getSizes();
        } else {
          toast.error(item?.message?.error || "Kategoriya o'chirilmadi");
        }
      });
  };

  return (
    <div className="pl-[250px] pr-5 pt-[100px] bg-gray-200 relative">
      <div className="w-full bg-white p-5 shadow-lg rounded-lg">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-2xl font-semibold text-shadow-lg">Sizes</h2>
          <button
            onClick={() => setAddmodal(!addmodal)}
            className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
          >
            Add Sizes
          </button>
        </div>

        {/* add Sizes : malumot qoshish  */}
        {addmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={addSizes}
              action=""
              className=" relative w-[350px] h-[350px] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-center justify-around gap-4 p-7 rounded-lg"
            >
              <p className="text-xl font-semibold">Add Sizes</p>
              <input
                onChange={(e) => setsize(e.target.value)}
                type="text"
                minLength={1}
                maxLength={3}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Nameen"
              />

              <button className="w-full px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                Add Sizes
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

        {/* Edit Sizes : malumot yangilash */}
        {editmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={editsizes}
              action=""
              className=" relative w-[350px] h-[350px] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-center justify-around gap-4 p-7 rounded-lg"
            >
              <p className="text-xl font-semibold">Edit Sizes</p>
              <input
                onChange={(e) => setsize(e.target.value)}
                value={size}
                type="text"
                minLength={1}
                maxLength={3}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Sizes"
              />

              <button className=" w-full px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                Edit Sizes
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
                    setDeletemodal(false);
                  }}
                  className="px-3 py-1 ml-2 bg-amber-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                >
                  Close
                </button>

                <button
                  onClick={deleteSizes}
                  className="px-3 py-1 ml-2 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* get Sizes malumot chiqarish  */}
        {loading ? (
          <div className="flex items-center justify-center">
            <Atom color="#ffa600" size="medium" text="" textColor="" />
          </div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">№</th>
                <th className="border px-4 py-2">Sizes</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-200 text-shadow-md">
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{item.size}</td>
                  <td className="border px-4 py-2 text-center w-[25%]">
                    <button
                      onClick={() => {
                        setSelectedId(item.id);
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

export default Sizes;
