import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Url = "https://back.ifly.com.uz/api/product";

function Products() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //   const [modalOpen, setModalOpen] = useState(false);
  const [addmodal, setAddmodal] = useState(false);

  //   const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // get products
  const getProducs = () => {
    fetch(Url)
      .then((res) => res.json())
      .then((response) => {
        setData(response?.data?.products || []);
      })
      .catch((error) => {
        console.error("Xatolik:", error);
        setData([]);
      });
  };

  useEffect(() => {
    getProducs();
  }, []);

  //   Post patch products
  const [image, setImage] = useState(null);
  const [titleen, setTitleen] = useState("");
  const [titleru, setTitleru] = useState("");
  const [titlede, setTitlede] = useState("");
  const [descen, setDescen] = useState("");
  const [descru, setDescru] = useState("");
  const [descde, setDescde] = useState("");
  const [price, setPrice] = useState("");
  const [min_sell, setMin_sell] = useState("");

  return (
    <div className="pl-[250px] pr-5 pt-[100px] bg-gray-200 relative">
      <div className="w-full bg-white p-5 shadow-lg rounded-lg">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-2xl font-semibold text-shadow-lg">Category</h2>
          <button
            onClick={() => {
              setAddmodal(true);
            }}
            className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
          >
            Add Category
          </button>
        </div>

        {/* Table */}
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">№</th>
              <th className="border px-4 py-2">Images</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Colors</th>
              <th className="border px-4 py-2">Sizes</th>
              <th className="border px-4 py-2">Discount</th>
              <th className="border px-4 py-2">Materials</th>
              <th className="border px-4 py-2 w-[200px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-4 text-gray-500">
                  Ma'lumotlar yo‘q
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-200 text-shadow-md">
                  <td className="border px-4 py-2 text-center">{index + 1}</td>

                  <td className="border px-4 py-2 text-center">
                    {Array.isArray(item.images) && item.images.length > 0 ? (
                      <img
                        src={`https://back.ifly.com.uz/${item.images[0]}`}
                        alt="Product"
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {item.title_en || item.name_en || "No Title"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {item.description_en || "No Description"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {item.price || "0"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {item.category?.name_en || "No Category"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {Array.isArray(item.colors)
                      ? item.colors.join(", ")
                      : "No Colors"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {item.sizes?.size || "No Size"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {item.discount?.discount || "0%"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {Array.isArray(item.materials)
                      ? item.materials.join(", ")
                      : typeof item.materials === "object" &&
                        item.materials !== null
                      ? Object.values(item.materials).join(", ")
                      : item.materials || "No Materials"}
                  </td>

                  <td className="border px-4 py-2">
                    <button className="px-3 py-2 bg-amber-500 rounded-md text-white text-sm font-medium shadow-md">
                      Edit
                    </button>
                    <button className="px-3 py-2 ml-2 bg-red-500 rounded-md text-white text-sm font-medium shadow-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Add modall  */}
        {addmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              action=""
              className=" overflow-y-auto  relative w-[500px] h-[600px] flex flex-col items-center justify-around shadow-lg shadow-[#1e1d1d5c] bg-gray-50 gap-4 p-7 rounded-lg"
            >
              <p className="text-2xl font-semibold">Add Team</p>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                required
                className="border outline-none rounded-md w-full min-h-[60px] px-3 py-1"
                placeholder="Image"
              />

              <input
                onChange={(e) => setTitleen(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="title en"
              />

              <input
                onChange={(e) => setTitleru(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="title ru"
              />

              <input
                onChange={(e) => setTitlede(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="title de"
              />

              <textarea
                onChange={(e) => setDescen(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full min-h-[40px] px-3 py-1"
                placeholder="Desc en"
              />

              <textarea
                onChange={(e) => setDescru(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full min-h-[40px] px-3 py-1"
                placeholder="Desc ru"
              />

              <textarea
                onChange={(e) => setDescde(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full min-h-[40px] px-3 py-1"
                placeholder="Desc de"
              />

              <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Price"
              />

              <input
                onChange={(e) => setMin_sell(e.target.value)}
                type="number"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Minimala nechta sotish"
              />

              <button className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                Add Team
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
      </div>
    </div>
  );
}

export default Products;
