import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Url = "https://back.ifly.com.uz/api/product";

function Producs() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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

  return (
    <div className="pl-[250px] pr-5 pt-[100px] bg-gray-200 relative">
      <div className="w-full bg-white p-5 shadow-lg rounded-lg">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-2xl font-semibold text-shadow-lg">Category</h2>
          <button
            onClick={() => {}}
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
              <th className="border px-2 py-2">Actions</th>
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
                      : typeof item.materials === "object" && item.materials !== null
                      ? Object.values(item.materials).join(", ")
                      : item.materials || "No Materials"}
                  </td>

                  <td className=" w-[18%] border px-4 py-2 text-center">
                    <button className="px-3 py-1 bg-amber-500 rounded-md text-white text-sm font-medium shadow-md">
                      Edit
                    </button>
                    <button className="px-3 py-1 ml-2 bg-red-500 rounded-md text-white text-sm font-medium shadow-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Producs;
