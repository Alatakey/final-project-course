import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import useToken from "../hooks/useToken";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { userToken, removeToken } = useToken(); // Access user token and removeToken from the hook

  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  const handleLogout = () => {
    removeToken(); // Call the removeToken function to clear the token
    window.location.reload(); // Refresh the page after logging out
  };

  return (
    <div className="flex justify-end items-center h-24 w-full px-4 bg-gray-800 rounded-b-lg">
      {userToken ? (
        <>
          <LoggedInText name={userToken.name} />
          <button onClick={handleLogout} className="text-white">
            Logout
          </button>
        </>
      ) : null}{" "}
      {/* Render if user is logged in */}
      <DesktopNavbar />
      <MobileNavbar isNavOpen={isNavOpen} toggleNav={toggleNav} />
    </div>
  );
}

function DesktopNavbar() {
  return (
    <ul className="hidden md:flex text-2xl">
      <li className="p-4">
        <a href="homePage" className="text-white hover:text-gray-300">
          Home
        </a>
      </li>
      <li className="p-4">
        <a href="About" className="text-white hover:text-gray-300">
          About
        </a>
      </li>
      <li className="p-4">
        <a href="Register" className="text-white hover:text-gray-300">
          Register
        </a>
      </li>
      <li className="p-4">
        <a href="Login" className="text-white hover:text-gray-300">
          Login
        </a>
      </li>
      <li className="p-4">
        <a href="Contact" className="text-white hover:text-gray-300">
          Contact
        </a>
      </li>
    </ul>
  );
}

interface MobileNavbarProps {
  isNavOpen: boolean;
  toggleNav: () => void;
}
function MobileNavbar({ isNavOpen, toggleNav }: MobileNavbarProps) {
  return (
    <>
      <div onClick={toggleNav} className="block md:hidden">
        {isNavOpen ? (
          <AiOutlineClose size={20} className="text-white" />
        ) : (
          <AiOutlineMenu size={20} className="text-white" />
        )}
      </div>
      <div
        className={`fixed top-0 w-[60%] border-r border-r-gray-900 h-full bg-gray-900 rounded-tr-lg ${
          isNavOpen ? "left-0 ease-in-out duration-500" : "left-[-100%]"
        }`}
      >
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-700">
            <a href="homePage" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
          <li className="p-4 border-b border-gray-700">
            <a href="About" className="text-white hover:text-gray-300">
              About
            </a>
          </li>
          <li className="p-4 border-b border-gray-700">
            <a href="Register" className="text-white hover:text-gray-300">
              Register
            </a>
          </li>
          <li className="p-4 border-b border-gray-700">
            <a href="Login" className="text-white hover:text-gray-300">
              Login
            </a>
          </li>
          <li className="p-4">
            <a href="Contact" className="text-white hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

function LoggedInText({ name }: { name: string }) {
  return <p className="text-white mr-4">Logged in as {name}</p>;
}
