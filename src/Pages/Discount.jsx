import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Atom } from "react-loading-indicators";
import { toast } from "react-toastify";

const Url = "https://back.ifly.com.uz/api/discount";

function Discount() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);


  const [data, setData] = useState([]);
  const getDiscount = () => {
    setLoading(true);
    fetch(`${Url}`)
      .then((res) => res.json())
      .then((element) => {
        setData(element?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDiscount();
  }, []);

  // add Discount
  const [addmodal, setAddmodal] = useState(false);
  const [discount, setdiscount] = useState();
  const [started, setstarted] = useState();
  const [finished, setfinished] = useState();
  const [status, setSatus] = useState();
  const addDiscount = (event) => {
    event.preventDefault();
    fetch(`${Url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        discount: discount,
        started_at: started,
        finished_at: finished,
        status: status,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success("muffaqiyatli");
          setAddmodal(false);

          getDiscount();
        } else {
          toast.error(item?.message?.error || "Kategoriya o'chirilmadi");
        }
      });
  };

  // delete Discount : malumot ochirish
  const [deletemodal, setDeletemodal] = useState(false);

  const deleteDiscount = () => {
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
          toast.success(item?.data?.message || "O'chirildi");
          setDeletemodal(false);
          getDiscount();
        } else {
          toast.error(item?.message || "Kategoriya o'chirilmadi");
        }
      });
  };

  // edit discount
  const [editmodal, seteditmodal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const editdiscount = (e) => {
    e.preventDefault();
    fetch(`${Url}/${selectedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        discount: discount,
        started_at: started,
        finished_at: finished,
        status: status,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success("muffaqiyatli");
          seteditmodal(false);
          getDiscount();
        } else {
          toast.error(item?.message?.error || "Kategoriya o'chirilmadi");
        }
      });
  };

  return (
    <div className="pl-[250px] pr-5 pt-[100px] bg-gray-200 relative">
      <div className="w-full bg-white p-5 shadow-lg rounded-lg">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-2xl font-semibold text-shadow-lg">Discount</h2>
          <button
            onClick={() => setAddmodal(!addmodal)}
            className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
          >
            Add Discount
          </button>
        </div>

        {/* add discount : malumot qoshish  */}
        {addmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={addDiscount}
              action=""
              className=" relative w-[350px] h-[350px] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-start justify-around gap-4 p-7 rounded-lg"
            >
              <p className="text-xl font-semibold">Add Discount</p>
              <input
                onChange={(e) => setdiscount(Number(e.target.value))}
                type="number"
                required
                min={0}
                max={100}
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Discount%"
              />

              <input
                onChange={(e) => setstarted(e.target.value)}
                type="date"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder=""
              />

              <input
                onChange={(e) => setfinished(e.target.value)}
                type="date"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder=""
              />

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  onChange={(e) => setSatus(e.target.checked)}
                  type="checkbox"
                  className="border outline-none rounded-md mt-1"
                />
                Active
              </label>

              <button className=" w-full py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                Add Discount
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

        {/* edit discount : malumot ozgartirish */}
        {editmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={editdiscount}
              action=""
              className=" relative w-[350px] h-[350px] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-start justify-around gap-4 p-7 rounded-lg"
            >
              <p className="text-xl font-semibold">Edit Discount</p>
              <input
                onChange={(e) => setdiscount(Number(e.target.value))}
                type="number"
                value={discount}
                required
                min={0}
                max={100}
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Nameen"
              />

              <input
                onChange={(e) => setstarted(e.target.value)}
                type="date"
                value={started}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Nameru"
              />

              <input
                onChange={(e) => setfinished(e.target.value)}
                type="date"
                value={finished}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Namede"
              />

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  onChange={(e) => setSatus(e.target.checked)}
                  type="checkbox"
                  checked={status}
                  className="border outline-none rounded-md mt-1"
                />
                Active
              </label>

              <button className=" w-full py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                Add Discount
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
                  onClick={deleteDiscount}
                  className="px-3 py-1 ml-2 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* get Discount malumot chiqarish  */}
        {loading ? (
          <div className="flex items-center justify-center">
            <Atom color="#ffa600" size="medium" text="" textColor="" />
          </div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">№</th>
                <th className="border px-4 py-2">Discount (%)</th>
                <th className="border px-4 py-2">Created Date</th>
                <th className="border px-4 py-2">Finished Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-200 text-shadow-md">
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">
                    {item.discount}%
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {item.started_at}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {item.finished_at}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {" "}
                    <span
                      className={
                        item.status ? "text-green-500" : "text-red-500"
                      }
                    >
                      {item.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => {
                        setSelectedId(item.id);
                        setdiscount(item.discount);
                        setstarted(item.started_at);
                        setfinished(item.finished_at);
                        setSatus(item.status);
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
export default Discount;
