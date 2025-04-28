import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Url = "https://back.ifly.com.uz/api/team-section";
const imgurl = "https://back.ifly.com.uz/api";

function Team() {
  const token = localStorage.getItem("token");

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
  const [Teamen, setTeamen] = useState();
  const [Teamru, setTeamru] = useState();
  const [Teamde, setTeamde] = useState();
  const addTeam = (event) => {
    event.preventDefault();
    fetch(`${Url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Team_en: Teamen,
        Team_ru: Teamru,
        Team_de: Teamde,
      }),
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

  const deleteTeam = (id) => {
    fetch(`${Url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success(item?.data?.message);
          getTeam();
        } else {
          toast.error(item?.message || "Kategoriya o'chirilmadi");
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

        {/* add catigoriy : malumot qoshish  */}
        {addmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={addTeam}
              action=""
              className=" relative w-[350px] h-[350px] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-center justify-around gap-4 p-7 rounded-lg"
            >
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

        {/* get Team malumot chiqarish  */}
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">№</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Position en</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-200 text-shadow-md">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
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
                  <button className="px-3 py-1 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                    edit
                  </button>
                  <button
                    onClick={() => deleteTeam(item?.id)}
                    className="px-3 py-1 ml-2 bg-amber-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                  >
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

export default Team;
