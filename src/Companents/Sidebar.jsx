import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png"

function Sidebar() {
  const linkClass =
    "block px-4 py-2 text-white rounded-md transition-all duration-200";

  return (
    <div className="fixed w-[220px] h-[100dvh] bg-gray-800 shadow-lg py-8 px-5 z-20">
      <div className="w-[100px] h-[80px] mx-auto">
        <img src={Logo} alt="" className="w-full h-full"/>
      </div>

      <ul className="space-y-2 mt-6 text-center leading-4 text-md">
        <li>
          <NavLink
            end
            to="/home"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-green-500" : "hover:bg-gray-900"}`
            }
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/category"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-green-500" : "hover:bg-gray-900"}`
            }
          >
            Category
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/discount"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-green-500" : "hover:bg-gray-900"}`
            }
          >
            Discount
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/sizes"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-green-500" : "hover:bg-gray-900"}`
            }
          >
            Sizes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/colors"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-green-500" : "hover:bg-gray-900"}`
            }
          >
            Colors
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/faq"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-green-500" : "hover:bg-gray-900"}`
            }
          >
            FAQ
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/contact"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-green-500" : "hover:bg-gray-900"}`
            }
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/team"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-green-500" : "hover:bg-gray-900"}`
            }
          >
            Team
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/news"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-green-500" : "hover:bg-gray-900"}`
            }
          >
            News
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
