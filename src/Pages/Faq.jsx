import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Atom } from "react-loading-indicators";
import { toast } from "react-toastify";

const Url = "https://testaoron.limsa.uz/api/faq";

function Faq() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const [data, setData] = useState([]);
  const getFaq = () => {
    fetch(`${Url}`)
      .then((res) => res.json())
      .then((element) => setData(element?.data));
  };
  console.log(data);

  useEffect(() => {
    getFaq();
  }, []);

  // add Faq
  const [addmodal, setAddmodal] = useState(false);
  const [questionen, setquestionen] = useState();
  const [questionru, setquestionru] = useState();
  const [questionde, setquestionde] = useState();

  const [answeren, setansweren] = useState();
  const [answerru, setanswerru] = useState();
  const [answerde, setanswerde] = useState();

  const addFaq = (event) => {
    event.preventDefault();
    fetch(`${Url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question_en: questionen,
        question_ru: questionru,
        question_de: questionde,
        answer_en: answeren,
        answer_ru: answerru,
        answer_de: answerde,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success("muffaqiyatli");
          setAddmodal(false);
          getFaq();
        } else {
          toast.error(item?.message?.error || "Kategoriya o'chirilmadi");
        }
      });
  };

  // delete Faq : malumot ochirish
  const [deletemodal, setDeletemodal] = useState(false);

  const deleteFaq = () => {
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
          toast.success(item?.data?.message);
          getFaq();
        } else {
          toast.error(item?.message || "o'chirilmadi");
        }
      });
  };

  // Edit Faq
  const [editmodal, seteditmodal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const editfaq = (e) => {
    e.preventDefault();
    fetch(`${Url}/${selectedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question_en: questionen,
        question_ru: questionru,
        question_de: questionde,
        answer_en: answeren,
        answer_ru: answerru,
        answer_de: answerde,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success("muffaqiyatli");
          seteditmodal(false);
          getFaq();
        } else {
          toast.error(item?.message?.error || "muffaqiyatsiz");
        }
      });
  };

  return (
    <div className="pl-[250px] pr-5 pt-[100px] bg-gray-200 relative">
      <div className="w-full bg-white p-5 shadow-lg rounded-lg">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-2xl font-semibold text-shadow-lg">Faq</h2>
          <button
            onClick={() => setAddmodal(!addmodal)}
            className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
          >
            Add Faq
          </button>
        </div>

        {/* add catigoriy : malumot qoshish  */}
        {addmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={addFaq}
              action=""
              className=" relative  w-[350px] h-[80%] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-center justify-around gap-4 p-7 rounded-lg"
            >
              <p className="text-2xl font-semibold">Add Faq</p>
              <input
                onChange={(e) => setquestionen(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Question en"
              />

              <textarea
                onChange={(e) => setansweren(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Answer en"
              />

              <input
                onChange={(e) => setquestionru(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Question en"
              />

              <textarea
                onChange={(e) => setanswerru(e.target.value)}
                type=""
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Answer en"
              />

              <input
                onChange={(e) => setquestionde(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Question en"
              />

              <textarea
                onChange={(e) => setanswerde(e.target.value)}
                type="text"
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Answer en"
              />

              <button className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                Add Faq
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

        {editmodal && (
          <div className="w-full h-[100dvh] absolute backdrop-blur-xs bg-[#04040455] z-30 top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={editfaq}
              action=""
              className=" relative  w-[350px] h-[80%] shadow-lg shadow-[#1e1d1d5c] bg-gray-50 flex flex-col items-center justify-around gap-4 p-7 rounded-lg"
            >
              <p className="text-2xl font-semibold">Edit Faq</p>
              <input
                onChange={(e) => setquestionen(e.target.value)}
                type="text"
                value={questionen}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Question en"
              />

              <textarea
                onChange={(e) => setansweren(e.target.value)}
                type="text"
                value={answeren}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Answer en"
              />

              <input
                onChange={(e) => setquestionru(e.target.value)}
                type="text"
                value={questionru}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Question ru"
              />

              <textarea
                onChange={(e) => setanswerru(e.target.value)}
                type=""
                value={answerru}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Answer ru"
              />

              <input
                onChange={(e) => setquestionde(e.target.value)}
                type="text"
                value={questionde}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Question de"
              />

              <textarea
                onChange={(e) => setanswerde(e.target.value)}
                type="text"
                value={answerde}
                required
                className="border outline-none rounded-md w-full px-3 py-1"
                placeholder="Answer de"
              />

              <button className="px-3 py-2 bg-green-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md">
                Edit Faq
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
                  onClick={deleteFaq}
                  className="px-3 py-1 ml-2 bg-red-500 rounded-md text-white text-lg font-medium cursor-pointer shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* get Faq malumot chiqarish  */}
        {loading ? (
          <div className="flex items-center justify-center">
            <Atom color="#ffa600" size="medium" text="" textColor="" />
          </div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">№</th>
                <th className="border px-4 py-2">Question ENG</th>
                <th className="border px-4 py-2">Answer ENG</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-200 text-shadow-md">
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">
                    {item.question_en}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {item.answer_en}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => {
                        setSelectedId(item.id);
                        setquestionen(item.question_en);
                        setquestionru(item.question_ru);
                        setquestionde(item.question_de);
                        setansweren(item.answer_en);
                        setanswerru(item.answer_ru);
                        setanswerde(item.answer_de);
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

export default Faq;
