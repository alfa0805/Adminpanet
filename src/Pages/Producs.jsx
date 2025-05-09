import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Atom } from "react-loading-indicators";
import { toast } from "react-toastify";

const Url = "https://testaoron.limsa.uz/api/product";
const CategoryUrl = "https://testaoron.limsa.uz/api/category";
const sizesUrl = "https://testaoron.limsa.uz/api/sizes";
const colorsUrl = "https://testaoron.limsa.uz/api/colors";
const discountUrl = "https://testaoron.limsa.uz/api/discount";

function Producs() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Input states for form data
  const [titleen, setTitleen] = useState("");
  const [titleru, setTitleru] = useState("");
  const [titlede, setTitlede] = useState("");
  const [descen, setDescen] = useState("");
  const [descru, setDescru] = useState("");
  const [descde, setDescde] = useState("");
  const [price, setPrice] = useState("");
  const [min_sell, setMin_sell] = useState("");

  const [categoryId, setCategoryId] = useState({});
  const [image, setImage] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState("");
  const [discount, setDiscount] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [materials, setMaterials] = useState([{ name: "", value: "" }]);

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState([]);

  // Fetch products and categories
  useEffect(() => {
    fetch(Url)
      .then((res) => res.json())
      .then((response) => {
        setData(response?.data?.products || []);
      })
      .catch((error) => {
        console.error("Error:", error);
        setData([]);
      });

    fetch(CategoryUrl)
      .then((res) => res.json())
      .then((response) => {
        setCategories(response?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });

    fetch(sizesUrl)
      .then((res) => res.json())
      .then((response) => {
        setSizes(response?.data || []); // ✅ to'g'ri holat
      })
      .catch((error) => {
        console.error("Error fetching sizes:", error);
        setSizes([]);
      });

    fetch(colorsUrl)
      .then((res) => res.json())
      .then((response) => {
        setColors(response?.data || []); // ✅ to‘g‘ri holat
      })
      .catch((error) => {
        console.error("Error fetching colors:", error);
        setColors([]);
      });

    fetch(discountUrl)
      .then((res) => res.json())
      .then((response) => {
        setDiscount(response?.data || {});
      })
      .catch((error) => {
        console.error("Error fetching colors:", error);
        setDiscount([]);
      });

    setLoading(false);
  }, []);

  const handleMaterialChange = (index, event) => {
    const values = [...materials];
    values[index][event.target.name] = event.target.value;
    setMaterials(values);
  };

  const handleAddMaterial = () => {
    setMaterials([...materials, { name: "", value: "" }]);
  };

  const handleRemoveMaterial = (index) => {
    const values = [...materials];
    values.splice(index, 1);
    setMaterials(values);
  };

  // Handle form submit (Add/Edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append("files", image);
    formData.append("title_en", titleen);
    formData.append("title_ru", titleru);
    formData.append("title_de", titlede);
    formData.append("description_en", descen);
    formData.append("description_ru", descru);
    formData.append("description_de", descde);
    formData.append("price", price);
    formData.append("min_sell", min_sell);
    formData.append("category_id", categoryId);

    selectedSizes.forEach((sizeId) => {
      formData.append("sizes_id[]", sizeId);
    });

    selectedColors.forEach((colorId) => {
      formData.append("colors_id[]", colorId);
    });

    formData.append("discount_id{}", selectedDiscount);

    // materials.forEach((material, index) => {
    //   formData.append(`materials[${index}][name]`, material.name);
    //   formData.append(`materials[${index}][value]`, material.value);
    // });

    const materialsObject = materials.reduce((acc, item) => {
      if (item.name && item.value) {
        acc[item.name] = item.value;
      }
      return acc;
    }, {});
    formData.append("materials", JSON.stringify(materialsObject));
    // formData.append("discount_id", selectedDiscount || null);

    const method = isEditing ? "PATCH" : "POST";
    const endpoint = isEditing ? `${Url}/${selectedId}` : Url;

    fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success("Muvaffaqqiyatli");
          setModalOpen(false);
          resetForm();
          fetchProducts();
        } else {
          toast.error(res.message?.error || "Error occurred!");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  // Reset form
  const resetForm = () => {
    setTitleen("");
    setTitleru("");
    setTitlede("");
    setDescen("");
    setDescru("");
    setDescde("");
    setPrice("");
    setCategoryId("");
    setSizes([]);
    setColors([]);
    setDiscount("");
    setMaterials("");
    setIsEditing(false);
    setSelectedId(null);
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setIsEditing(true);
    setSelectedId(product.id);
    setTitleen(product.title_en);
    setTitleru(product.title_ru);
    setTitlede(product.title_de);
    setDescen(product.description_en);
    setDescru(product.description_ru);
    setDescde(product.description_de);
    setPrice(product.price);
    setCategoryId(product.category_id);
    setSizes(product.sizes);
    setSelectedSizes(product.sizes.map((s) => s.id));

    setDiscount(product.discount);
    setMaterials(product.materials);
    setModalOpen(true);

    setColors(product.colors); // bu umumiy ro‘yxat
    setSelectedColors(product.colors.map((c) => c.id));
    // ✅ materials ni array qilib o‘zgartirish
    const materialsArray = product.materials
      ? Object.entries(product.materials).map(([name, value]) => ({
          name,
          value,
        }))
      : [];

    setMaterials(materialsArray); // to‘g‘ri formatda set qilindi
    setModalOpen(true);
  };

  // Fetch products again after form submit
  const fetchProducts = () => {
    fetch(Url)
      .then((res) => res.json())
      .then((response) => {
        setData(response?.data?.products || []);
      })
      .catch((error) => {
        console.error("Error:", error);
        setData([]);
      });
  };

  // delete Team : malumot ochirish
  const [deletemodal, setDeletemodal] = useState(false);
  const [deletid, setdeletid] = useState(false);
  const deleteTeam = (e) => {
    e.preventDefault;
    fetch(`${Url}/${deletid}`, {
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
          toast.success(item?.data?.message || "O'chirildi");
          fetchProducts();
        } else {
          toast.error(item?.message || "Kategoriya o'chirilmadi");
        }
      });
  };

  return (
    <div className="pl-[250px] pr-5 pt-[100px] bg-gray-200 relative">
      <div className="w-full bg-white p-5 shadow-lg rounded-lg">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-2xl font-semibold text-shadow-lg">Products</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
          >
            Add Product
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center">
            <Atom color="#ffa600" size="medium" text="" textColor="" />
          </div>
        ) : (
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
              {data.map((product, index) => (
                <tr key={index} className="hover:bg-gray-200 text-shadow-md">
                  <td className="border px-4 py-2 text-center">{index + 1}</td>

                  <td className="border px-4 py-2 text-center">
                    {Array.isArray(product.images) &&
                    product.images.length > 0 ? (
                      <img
                        src={`https://testaoron.limsa.uz/${product.images[0]}`}
                        alt="Product"
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {product.title_en || product.name_en || "No Title"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {product.description_en || "No Description"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {product.price || "0"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {product.category?.name_en || "No Category"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {Array.isArray(product.colors)
                      ? product.colors.map((c) => c.color_en || c).join(", ")
                      : "No Colors"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {Array.isArray(product.sizes)
                      ? product.sizes.map((s) => s.size || s).join(", ")
                      : product.sizes?.size || "No Size"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {product.discount?.discount || "0%"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {Array.isArray(product.materials)
                      ? product.materials.join(", ")
                      : typeof product.materials === "object" &&
                        product.materials !== null
                      ? Object.values(product.materials).join(", ")
                      : product.materials || "No Materials"}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => openEditModal(product)}
                      className="px-3 py-2 bg-amber-500 rounded-md text-white text-sm font-medium shadow-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setdeletid(product.id);
                        setDeletemodal(true);
                      }}
                      className="px-3 py-2 ml-2 bg-red-500 rounded-md text-white text-sm font-medium shadow-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 overflow-y-auto bg-black/50 flex items-center justify-center z-50">
          <div className="table-auto bg-white w-[450px] h-[110dvh]">
            <form
              onSubmit={handleSubmit}
              className="bg-white w-[450px] my-10 p-6 rounded-lg flex flex-col gap-3 relative"
            >
              <h3 className="text-xl font-semibold mb-2">
                {isEditing ? "Edit Product" : "Add Product"}
              </h3>

              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="border p-1 rounded"
              />

              <input
                type="text"
                value={titleen}
                onChange={(e) => setTitleen(e.target.value)}
                placeholder="Title EN"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                value={titleru}
                onChange={(e) => setTitleru(e.target.value)}
                placeholder="Title RU"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                value={titlede}
                onChange={(e) => setTitlede(e.target.value)}
                placeholder="Title DE"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                value={descen}
                onChange={(e) => setDescen(e.target.value)}
                placeholder="Description EN"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                value={descru}
                onChange={(e) => setDescru(e.target.value)}
                placeholder="Description RU"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                value={descde}
                onChange={(e) => setDescde(e.target.value)}
                placeholder="Description DE"
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="border p-2 rounded"
                required
              />

              <input
                type="number"
                value={min_sell}
                onChange={(e) => setMin_sell(e.target.value)}
                placeholder="Min_sell"
                className="border p-2 rounded"
                required
              />

              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Category</option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name_en || category.name_ru || category.name_de}
                    </option>
                  ))
                ) : (
                  <option>No categories available</option>
                )}
              </select>

              <div className="flex flex-col gap-2">
                <label className="font-bold">Select Sizes:</label>
                {sizes.length > 0 ? (
                  sizes.map((size) => (
                    <label key={size.size} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={size.id}
                        checked={selectedSizes.includes(size.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSizes([...selectedSizes, size.id]);
                          } else {
                            setSelectedSizes(
                              selectedSizes.filter((id) => id !== size.id)
                            );
                          }
                        }}
                      />
                      {size.size}
                    </label>
                  ))
                ) : (
                  <span>No sizes available</span>
                )}
              </div>

              <div>
                <label className="font-semibold">Select Colors:</label>
                <div className="flex gap-4 flex-wrap mt-2">
                  {colors.map((color) => (
                    <label
                      key={color.id}
                      className="flex items-center gap-2 border p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        value={color.id}
                        checked={selectedColors.includes(color.id)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          if (isChecked) {
                            setSelectedColors([...selectedColors, color.id]);
                          } else {
                            setSelectedColors(
                              selectedColors.filter((id) => id !== color.id)
                            );
                          }
                        }}
                      />
                      <span>{color.color_en}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold">Select Discounts:</label>
                <select
                  multiple
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedDiscount.id}
                  onChange={(e) => {
                    const selectedOptions = Array.from(
                      e.target.selectedOptions
                    ).map((opt) => Number(opt.value));
                    setSelectedDiscount(selectedOptions);
                  }}
                >
                  {discount.length > 0 ? (
                    discount.map((disc) => (
                      <option key={disc.id} value={disc.id}>
                        {disc.discount}
                      </option>
                    ))
                  ) : (
                    <option disabled>No discounts available</option>
                  )}
                </select>
              </div>

              <h3>Materials:</h3>
              {materials.map((material, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="name"
                    value={material.name}
                    onChange={(e) => handleMaterialChange(index, e)}
                    placeholder="Material Name"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="value"
                    value={material.value}
                    onChange={(e) => handleMaterialChange(index, e)}
                    placeholder="Material Value"
                    className="border p-2 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMaterial(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddMaterial}>
                Add Material
              </button>

              {/* <button type="submit">
                {isEditing ? "Edit Product" : "Add Product"}
              </button> */}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-400 rounded-md text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 rounded-md text-white"
                >
                  {isEditing ? "Update" : "Add"} Product
                </button>
              </div>

              <AiOutlineCloseCircle
                onClick={() => {
                  setModalOpen(false);
                  resetForm();
                }}
                className="absolute top-2 right-2 text-3xl cursor-pointer text-red-600"
              />
            </form>
          </div>
        </div>
      )}

      {/* delete modall  */}
      {deletemodal && (
        <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
          <div className="w-[300px] h-[200px] flex flex-col bg-white rounded-md items-center justify-center gap-5">
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
                onClick={deleteTeam}
                className="px-3 py-1 ml-2 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Producs;
