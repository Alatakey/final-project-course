import React from "react";
import { useState } from "react";
import clsx from "clsx";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function NavBar() {
  const [nav, setNav] = useState(false);

  function handleNav() {
    setNav(!nav);
  }

  return (
    <div className="flex text-red-500 justify-end items-center h-24 max-w-[1240px] mx-auto px-4 ">
      <ul className="hidden md:flex text-2xl">
        <li className="p-4">
          <a href="homePage">Home</a>
        </li>
        <li className="p-4">
          <a href="About">About</a>
        </li>
        <li className="p-4">
          <a href="Register">Register</a>
        </li>
        <li className="p-4">
          <a href="Contact">Contact</a>
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={clsx(
          "fixed top-0 w-[60%] border-r border-r-gray-900 h-full bg-slate-700",
          nav ? "left-[-100%]" : "left-0 ease-in-out duration-500"
        )}
      >
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-300">
            <a href="homePage">Home</a>
          </li>
          <li className="p-4 border-b border-gray-300">
            <a href="About">About</a>
          </li>
          <li className="p-4 border-b border-gray-300">
            <a href="Register">Register</a>
          </li>
          <li className="p-4">
            <a href="Contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
