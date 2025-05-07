import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Atom } from "react-loading-indicators";
import { toast } from "react-toastify";

const Url = "https://back.ifly.com.uz/api/category";

function Category() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const [data, setData] = useState([]);
  const [addmodal, setAddmodal] = useState(false);
  const [deletemodal, setDeletemodal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [nameen, setNameen] = useState("");
  const [nameru, setNameru] = useState("");
  const [namede, setNamede] = useState("");
  const [nullcategory, setnullcategory] = useState(null);

  // Get all categories
  const getcategory = () => {
    fetch(`${Url}`)
      .then((res) => res.json())
      .then((element) => setData(element?.data));
  };

  useEffect(() => {
    getcategory();
  }, []);

  // Add or Edit category
  const addcategory = (event) => {
    event.preventDefault();

    const method = nullcategory ? "PATCH" : "POST";
    const url = nullcategory ? `${Url}/${nullcategory.id}` : Url;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name_en: nameen,
        name_de: namede,
        name_ru: nameru,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success(
            nullcategory
              ? "Muvaffaqiyatli yangilandi"
              : "Muvaffaqiyatli qo‘shildi"
          );
          setAddmodal(false);
          resetForm();
          getcategory();
        } else {
          toast.error(item?.message?.error || "Amaliyot bajarilmadi");
        }
      });
  };

  // Delete category
  const deletecategory = () => {
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
          toast.success(item?.data?.message || "O‘chirildi");
          getcategory();
          setSelectedId(null);
        } else {
          toast.error(item?.message || "Kategoriya o‘chirilmadi");
        }
      });
  };

  // Edit function
  const editcategory = (item) => {
    setnullcategory(item);
    setNameen(item.name_en);
    setNameru(item.name_ru);
    setNamede(item.name_de);
    setAddmodal(true);
  };

  // Modalni yopish va inputlarni tozalash
  const resetForm = () => {
    setnullcategory(null);
    setNameen("");
    setNameru("");
    setNamede("");
  };

  return (
    <div className="pl-[250px] pr-5 pt-[100px] bg-gray-200 relative">
      <div className="w-full bg-white p-5 shadow-lg rounded-lg">
        <div className="flex w-full top-0 items-center justify-between pb-5">
          <h2 className="text-2xl font-semibold text-shadow-lg">Category</h2>
          <button
            onClick={() => {
              resetForm();
              setAddmodal(true);
            }}
            className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
          >
            Add Category
          </button>
        </div>

        {/* Modal */}
        {addmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={addcategory}
              className="relative w-[350px] h-[350px] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-center justify-around gap-4 p-7 rounded-lg"
            >
              <p className="text-xl font-semibold">
                {nullcategory ? "Edit Modal" : "Add Modal"}
              </p>

              <input
                value={nameen}
                onChange={(e) => setNameen(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Name EN"
              />

              <input
                value={nameru}
                onChange={(e) => setNameru(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Name RU"
              />

              <input
                value={namede}
                onChange={(e) => setNamede(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Name DE"
              />

              <button className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                {nullcategory ? "Save Changes" : "Add Category"}
              </button>

              <div className="absolute top-2 right-7">
                <button
                  onClick={() => {
                    setAddmodal(false);
                    resetForm();
                  }}
                  type="button"
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
                  onClick={deletecategory}
                  className="px-3 py-1 ml-2 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center">
            <Atom color="#ffa600" size="medium" text="" textColor="" />
          </div>
        ) : (
          <div className="w-full max-h-[380px] overflow-y-auto"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE */,
          }}>
            <table className="w-full table-auto border-collapse">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">№</th>
                  <th className="border px-4 py-2">Title ENG</th>
                  <th className="border px-4 py-2">Title RU</th>
                  <th className="border px-4 py-2">Title DE</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="[&::-webkit-scrollbar]:hidden">
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-200 text-shadow-md">
                    <td className="border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.name_en}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.name_ru}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.name_de}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => editcategory(item)}
                        className="px-3 py-1 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(item.id);
                          setDeletemodal(true);
                        }}
                        className="px-3 py-1 ml-2 bg-amber-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
