import React from "react";
import { LinkProps } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface CardsProps {
  pageName: LinkProps["to"];
  imageUrl: string;
  title: string;
}

export default function Cards(props: CardsProps) {
  const navigate = useNavigate();

  function clickButtonHandler() {
    navigate(`/${props.pageName}`);
  }

  return (
    <div className="w-55 h-auto items-center text-center flex flex-col bg-cover gap-3">
      <img
        onClick={() => clickButtonHandler()}
        className="hover:scale-105 overflow-hidden cursor-pointer gb-[rgba(0,0,0,0.5)]"
        src={props.imageUrl}
        alt=""
      />
      <h2 className="flex-[1]">{props.title || "no title"}</h2>
      <p className="flex-[1]"></p>
      <div className="flex-[1] bg-green-100"></div>
      <button
        onClick={() => clickButtonHandler()}
        className="flex-[1] bg-gray-500 w-32 h-8 rounded-xl text-red-500 font-semibold hover:bg-red-500 hover:text-white"
      >
        Click Me
      </button>
    </div>
  );
}
