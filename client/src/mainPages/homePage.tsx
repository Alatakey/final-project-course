import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="bg-gray-200 p-6 z-10">
      <div className="bg-slate-600 mt-5 mb-10 p-6 text-red-500 rounded-lg">
        <h1 className="text-4xl mb-4">Welcome to my website</h1>
        <p className="text-lg">
          Feel free to look around and check out my projects. Contact me if you
          want to work together or just want to say hi!
        </p>
      </div>
      <div className="flex flex-wrap justify-center mb-10">
        {[
          { src: "/images/img-HTML.png", alt: "HTML" },
          { src: "/images/img-CSS.png", alt: "CSS" },
          { src: "/images/img-Bootstrap.png", alt: "Bootstrap" },
          { src: "/images/img-SASS.png", alt: "SASS" },
          { src: "/images/img-JS.png", alt: "JS" },
          { src: "/images/img-OOP.png", alt: "OOP" },
          { src: "/images/img-ES6.png", alt: "ES6" },
          { src: "/images/img-TypeScript.png", alt: "TypeScript" },
          { src: "/images/img-NodeJS.png", alt: "NodeJS" },
        ].map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt={item.alt}
            className="w-16 h-16 m-2 rounded-full cursor-pointer transform hover:scale-110"
          />
        ))}
      </div>
      <div className="mb-10">
        <h2 className="text-3xl mb-5">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {projectData.map((project, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4">
              <Link to={project.path}>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-sm">{project.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const projectData = [
  {
    path: "/hereAndNow",
    imageUrl: "/siteImages/project1.png",
    title: "Here & Now",
    description: "This is a landing page Here & Now project.",
  },
  {
    path: "/letUsLedYouForward",
    imageUrl: "/siteImages/project2.png",
    title: "תן לנו להוביל אותך קדימה",
    description: "This is a landing page תן לנו להוביל אותך קדימה project.",
  },
  {
    path: "/goodCoffeeGoodMorning",
    imageUrl: "/siteImages/project3.png",
    title: "קפה טוב לבוקר טוב",
    description: "This is a landing page קפה טוב לבוקר טוב project.",
  },
  {
    path: "/letUsLedYou",
    imageUrl: "/siteImages/project4.png",
    title: "תן לנו להוביל אותך קדימה",
    description: "This is a landing page תן לנו להוביל אותך קדימה project.",
  },
  {
    path: "/freeAdvice",
    imageUrl: "/siteImages/project6.png",
    title: "ייעוץ חינם",
    description: "This is a landing page ייעוץ חינם project.",
  },
  {
    path: "/discoverTheWorld",
    imageUrl: "/siteImages/project5.png",
    title: "לגלות את העולם",
    description: "This is a landing page לגלות את העולם project.",
  },
  {
    path: "/calendar",
    imageUrl: "./images/calendar-icon-white-background_1308-84634.png",
    title: "Calendar",
    description: "This is a Calendar project.",
  },
  {
    path: "/cartList",
    imageUrl: "./images/shopping-cart_1413908.png",
    title: "Cart list",
    description: "This is a Cart list project.",
  },
  {
    path: "/memoryGame",
    imageUrl: "./images/playing-cards_8983569.png",
    title: "Memory game",
    description: "This is a Memory game project.",
  },
  {
    path: "/connectFour",
    imageUrl: "./images/4296581.png",
    title: "Connect Four",
    description: "This is the Connect Four game project.",
  },
  {
    path: "/pageBuilder",
    imageUrl: "./images/page-layout.png",
    title: "Page Builder",
    description: "This is the Page Builder project.",
  },
  {
    path: "/XOGame",
    imageUrl:
      "./images/tic-tac-toe-game-wooden-board-entertainment-gradient-icon-vector.jpg",
    title: "X & O",
    description: "This is the X & O game project.",
  },
];
