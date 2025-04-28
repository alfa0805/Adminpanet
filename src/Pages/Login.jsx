import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [loading, setloading] = useState();
  const [login, setlogin] = useState();
  const [password, setpassword] = useState();
  const naviget = useNavigate();
  const submitlogin = (event) => {
    event.preventDefault();
    console.log(login, password);
    setloading(true);

    fetch("https://back.ifly.com.uz/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success(item?.data?.message);
          localStorage.setItem("token", item?.data?.access_token);
          naviget("/home");
        } else {
          toast.error(item?.message?.message);
        }
      });
  };

  return (
    <div className="w-full h-[100dvh] bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={submitlogin}
        action=""
        className="w-[380px] h-[350px] mx-auto bg-white px-8 py-5 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl text-center font-bold pb-6">Login</h1>
        <label htmlFor="">
          <p className="text-gray-600 text-lg font-semibold pb-1">Login</p>
          <input
            onChange={(e) => setlogin(e.target.value)}
            required
            minLength={3}
            maxLength={10}
            type="text"
            className="border border-[#b8bdb6] px-3 w-full h-[40px] rounded-md outline-[#0c6add]"
          />
        </label>
        <label htmlFor="">
          <p className="text-gray-600 text-lg font-semibold pb-1 pt-5">
            Password
          </p>
          <input
            onChange={(e) => setpassword(e.target.value)}
            required
            minLength={3}
            maxLength={10}
            type="text"
            className="border border-[#b8bdb6] px-3 w-full h-[40px] rounded-md outline-[#0c6add]"
          />
        </label>
        <button
          disabled
          className={`${
            loading ? "bg-gray-400" : "bg-green-500"
          } mt-7 text-white text-lg font-semibold w-full h-[40px] rounded-md`}
         
        >
          {loading ? "Kutish" : "Kirish"}
        </button>
      </form>
    </div>
  );
}

export default Login;
