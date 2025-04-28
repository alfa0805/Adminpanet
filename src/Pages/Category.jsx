import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Url = "https://back.ifly.com.uz/api/category"

function Category() {
  const token = localStorage.getItem("token")

  const [data, setData] = useState([]);
  const getcategory = () => {
    fetch(`${Url}`)
      .then((res) => res.json())
      .then((element) => setData(element?.data));
  };
  console.log(data);

  useEffect(() => {
    getcategory();
  }, []);

  // add category
  const [addmodal, setAddmodal] = useState(false);
  const [nameen, setNameen] = useState();
  const [nameru, setNameru] = useState();
  const [namede, setNamede] = useState();
  const addcategory = (event) => {
    event.preventDefault();
    fetch(`${Url}` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name_en : nameen,
        name_de : namede,
        name_ru : nameru
      }),
    })      .then((res) => res.json())
          .then((item) => {
            if (item?.success) {
              toast.success("muffaqiyatli");
              setAddmodal(false);
              getcategory();
            } else {
              toast.error(item?.message?.error || "Kategoriya o'chirilmadi");
            }
          });
    
  };

// delete category : malumot ochirish

  const deletecategory = (id) => {
    fetch(`${Url}/${id}` , {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then((res) => res.json())
    .then((item) => {
      if (item?.success) {
        toast.success(item?.data?.message);
        getcategory();
      } else {
        toast.error(item?.message || "Kategoriya o'chirilmadi");
      }
    })
    
  }

  return (
    <div className="pl-[250px] pr-5 pt-[100px] bg-gray-200 relative">
      <div className="w-full bg-white p-5 shadow-lg rounded-lg">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-2xl font-semibold text-shadow-lg">Category</h2>
          <button
            onClick={() => setAddmodal(!addmodal)}
            className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
          >
            Add Category
          </button>
        </div>

        {/* add catigoriy : malumot qoshish  */}
        {addmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={addcategory}
              action=""
              className=" relative w-[350px] h-[350px] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-center justify-around gap-4 p-7 rounded-lg"
            >
              <input
                onChange={(e) => setNameen(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Nameen"
              />

              <input
                onChange={(e) => setNameru(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Nameru"
              />

              <input
                onChange={(e) => setNamede(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Namede"
              />

              <button
                
                className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
              >
                Add Category
              </button>
              <div className=" absolute top-2 right-7">
                <button
                  onClick={() => setAddmodal(!addmodal)}
                  className="text-red-500"
                >
                  <AiOutlineCloseCircle  className="text-red-500 text-2xl"/>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* get category malumot chiqarish  */}
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">№</th>
              <th className="border px-4 py-2">Title ENG</th>
              <th className="border px-4 py-2">Title RU</th>
              <th className="border px-4 py-2">Title DE</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-200 text-shadow-md">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">{item.name_en}</td>
                <td className="border px-4 py-2 text-center">{item.name_ru}</td>
                <td className="border px-4 py-2 text-center">{item.name_de}</td>
                <td className="border px-4 py-2 text-center">
                  <button className="px-3 py-1 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                    edit
                  </button>
                  <button 
                    onClick={()=> deletecategory(item?.id)}
                    className="px-3 py-1 ml-2 bg-amber-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
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

export default Category;
