import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Atom } from "react-loading-indicators";
import { toast } from "react-toastify";

const Url = "https://testaoron.limsa.uz/api/team-section";

function Team() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const [data, setData] = useState([]);
  const getTeam = () => {
    fetch(`${Url}`)
      .then((res) => res.json())
      .then((element) => setData(element?.data));
  };
  console.log(data);

  useEffect(() => {
    getTeam();
  }, []);

  // add Team
  const [addmodal, setAddmodal] = useState(false);
  const [name, setname] = useState();
  const [image, setImage] = useState([0]);
  const [Teamen, setTeamen] = useState();
  const [Teamru, setTeamru] = useState();
  const [Teamde, setTeamde] = useState();
  const addTeam = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("full_name", name);
    formData.append("position_en", Teamen);
    formData.append("position_ru", Teamru);
    formData.append("position_de", Teamde);
    fetch(`${Url}`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success("muffaqiyatli");
          setAddmodal(false);
          getTeam();
        } else {
          toast.error(item?.message?.error || "Kategoriya o'chirilmadi");
        }
      });
  };

  // delete Team : malumot ochirish
  const [deletemodal, setDeletemodal] = useState(false);

  const deleteTeam = (e) => {
    e.preventDefault;
    fetch(`${Url}/${selectedId.id}`, {
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
          getTeam();
        } else {
          toast.error(item?.message || "Kategoriya o'chirilmadi");
        }
      });
  };

  const [editmodal, seteditmodal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const editTeam = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("full_name", name);
    formData.append("position_en", Teamen);
    formData.append("position_ru", Teamru);
    formData.append("position_de", Teamde);
    fetch(`${Url}/${selectedId.id}`, {
      method: "PATCH",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success("muffaqiyatli");
          seteditmodal(false);
          getTeam();
        } else {
          toast.error(item?.message?.error || "Kategoriya o'chirilmadi");
        }
      });
  };

  return (
    <div className="pl-[250px] pr-5 pt-[100px] bg-gray-200 relative">
      <div className="w-full bg-white p-5 shadow-lg rounded-lg">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-2xl font-semibold text-shadow-lg">Team</h2>
          <button
            onClick={() => setAddmodal(!addmodal)}
            className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
          >
            Add Team
          </button>
        </div>

        {/* add Team : malumot qoshish  */}
        {addmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={addTeam}
              action=""
              className=" relative w-[350px] h-[390px] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-center justify-around gap-4 p-7 rounded-lg"
            >
              <p className="text-2xl font-semibold">Add Team</p>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Team eng"
              />

              <input
                onChange={(e) => setname(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Team eng"
              />

              <input
                onChange={(e) => setTeamen(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Team eng"
              />

              <input
                onChange={(e) => setTeamru(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Team ru"
              />

              <input
                onChange={(e) => setTeamde(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Team de"
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

        {/* Edit Team : malumot yangilash  */}
        {editmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={editTeam}
              action=""
              className=" relative w-[350px] h-[390px] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-center justify-around gap-4 p-7 rounded-lg"
            >
              <p className="text-2xl font-semibold">Edit Team</p>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Team eng"
              />

              <input
                onChange={(e) => setname(e.target.value)}
                type="text"
                value={name}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Team eng"
              />

              <input
                onChange={(e) => setTeamen(e.target.value)}
                type="text"
                value={Teamen}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Team eng"
              />

              <input
                onChange={(e) => setTeamru(e.target.value)}
                type="text"
                value={Teamru}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Team ru"
              />

              <input
                onChange={(e) => setTeamde(e.target.value)}
                type="text"
                value={Teamde}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Team de"
              />

              <button className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                Add Team
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
                  onClick={deleteTeam}
                  className="px-3 py-1 ml-2 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* get Team malumot chiqarish  */}
        {loading ? (
          <div className="flex items-center justify-center">
            <Atom color="#ffa600" size="medium" text="" textColor="" />
          </div>
        ) : (
          <div
            className="w-full max-h-[380px] overflow-y-auto"
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE */,
            }}
          >
            <table className="w-full table-auto border-collapse">
              <thead className="sticky top-0 bg-gray-100 z-10 ">
                <tr>
                  <th className="border px-4 py-2">№</th>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Full Name</th>
                  <th className="border px-4 py-2">Position en</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="[&::-webkit-scrollbar]:hidden">
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-200">
                    <td className="border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 flex flex-col items-center">
                      <div className="w-[120px] h-[70px]">
                        <img
                          src={`https://back.ifly.com.uz/${item.image}`}
                          alt={item.full_name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.full_name}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.position_en}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => {
                          setSelectedId(item);
                          setTeamen(item.position_en);
                          setTeamru(item.position_ru);
                          setTeamde(item.position_de);
                          setname(item.full_name);
                          seteditmodal(true);
                        }}
                        className="px-3 py-1 bg-amber-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                      >
                        edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(item);
                          setDeletemodal(true);
                        }}
                        className="px-3 py-1 ml-2 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                      >
                        delete
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

export default Team;
