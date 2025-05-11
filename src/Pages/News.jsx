import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Atom } from "react-loading-indicators";
import { toast } from "react-toastify";

const Url = "https://testaoron.limsa.uz/api/news";

function News() {
  const token = localStorage.getItem("token");
  const [modalOpen, setModalOpen] = useState(false);
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [image, setImage] = useState(null);
  const [titleen, setTitleen] = useState("");
  const [titleru, setTitleru] = useState("");
  const [titlede, setTitlede] = useState("");
  const [descen, setDescen] = useState("");
  const [descru, setDescru] = useState("");
  const [descde, setDescde] = useState("");

  // YANGILIKLARNI YUKLASH
  const getNews = () => {
    fetch(Url)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data || []);
        setLoading(false);
      })
      .catch(() => toast.error("Serverdan malumot olishda xatolik"));
  };

  useEffect(() => {
    getNews();
  }, []);

  // YANGILIK QO‘SHISH YOKI TAHRIRLASH
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append("file", image);
    formData.append("title_en", titleen);
    formData.append("title_ru", titleru);
    formData.append("title_de", titlede);
    formData.append("description_en", descen);
    formData.append("description_ru", descru);
    formData.append("description_de", descde);

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
          toast.success(isEditing ? "Yangilandi!" : "Qo‘shildi!");
          setModalOpen(false);
          resetForm();
          getNews();
        } else {
          toast.error(res.message?.error || "Xatolik yuz berdi");
        }
      });
  };

  // YANGILIKNI O‘CHIRISH
  const [deletemodal, setDeletemodal] = useState(false);
  const handleDelete = () => {
    fetch(`${Url}/${selectedId.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setDeletemodal(false)
          toast.success("O'chirildi!");
          getNews();
        } else {
          setDeletemodal(false)
          toast.error(res.message || "Xatolik");
        }
      });
  };

  // FORMANI TOZALASH
  const resetForm = () => {
    setTitleen("");
    setTitleru("");
    setTitlede("");
    setDescen("");
    setDescru("");
    setDescde("");
    setImage(null);
    setSelectedId(null);
    setIsEditing(false);
  };

  // MODALGA MALUMOT QO‘YISH (edit uchun)
  const openEditModal = (item) => {
    setIsEditing(true);
    setSelectedId(item.id);
    setTitleen(item.title_en);
    setTitleru(item.title_ru);
    setTitlede(item.title_de);
    setDescen(item.description_en);
    setDescru(item.description_ru);
    setDescde(item.description_de);
    setModalOpen(true);
  };

  return (
    <div className="pl-[250px] pr-5 pt-[100px] bg-gray-200 min-h-screen">
      <div className="w-full bg-white p-5 shadow-lg rounded-lg">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-2xl font-semibold">News</h2>
          <button
            onClick={() => {
              resetForm();
              setModalOpen(true);
            }}
            className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium"
          >
            Add News
          </button>
        </div>

        {/* delete modall  */}
        {deletemodal && (
          <div className="w-full h-full absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
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
                  onClick={handleDelete}
                  className="px-3 py-1 ml-2 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Atom color="#ffa600" size="medium" />
          </div>
        ) : (
          <div
            className="w-full max-h-[380px] overflow-y-auto"
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE */,
            }}
          >
            <table className="w-full table-auto border">
              <thead className="sticky top-0 bg-gray-100 z-10 ">
                <tr>
                  <th className="border p-2">№</th>
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody className="[&::-webkit-scrollbar]:hidden">
                {data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-200">
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2 text-center">
                      <img
                        src={`https://testaoron.limsa.uz${item.image}`}
                        alt="img"
                        className="w-28 h-16 object-cover mx-auto"
                      />
                    </td>
                    <td className="border p-2 text-center">{item.title_en}</td>
                    <td className="border p-2 text-center">
                      {item.description_en}
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => openEditModal(item)}
                        className="px-3 py-1 ml-2 bg-amber-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(item);
                          setDeletemodal(true);
                        }}
                        className="px-3 py-1 ml-2 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-[350px] p-6 rounded-lg flex flex-col gap-3 relative"
          >
            <h3 className="text-xl font-semibold mb-2">
              {isEditing ? "Edit News" : "Add News"}
            </h3>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border p-1 rounded"
              required={!isEditing}
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
            <button
              type="submit"
              className="bg-green-500 text-white py-2 rounded font-medium"
            >
              {isEditing ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-xl text-red-500"
            >
              <AiOutlineCloseCircle />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default News;
