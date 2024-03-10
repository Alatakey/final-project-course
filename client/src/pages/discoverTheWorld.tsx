import React from "react";

export default function DiscoverTheWorld() {
  return (
    <div className="flex flex-col gap-2 justify-center w-11/12 sm:h-screen">
      <div className="flex flex-row w-full">
        <div className="grid grid-cols-2 w-full">
          <div>
            <img src="./images/architecture-1868667_640.jpg" alt="image" />
          </div>
          <div>
            <img src="./images/boats-2758962_640.jpg" alt="image" />
          </div>
          <div>
            <img src="./images/camera-1130731_640.jpg" alt="image" />
          </div>
          <div>
            <img src="./images/europe-1264062_640.jpg" alt="image" />
          </div>
        </div>
        <div className="flex flex-col w-full h-54 bg-blue-900 justify-center">
          <h1 className="text-sky-400 font-bold text-3xl mb-5">
            לגלות את העולם
          </h1>
          <p className="text-white">גלו מה שם בכל מקום בעולם</p>
        </div>
      </div>
      <div className="flex flex-row w-full gap-2">
        <div>
          <img src="./images/journey-1130732_640.jpg" alt="image" />
        </div>
        <div>
          <img src="./images/kyoto-1976538_640.jpg" alt="image" />
        </div>
        <div>
          <img src="./images/winding-road-1556177_640.jpg" alt="image" />
        </div>
        <div>
          <img src="./images/road-trip-4399206_640.webp" alt="image" />
        </div>
      </div>
      <div className="flex flex-row w-full gap-2 h-80">
        <div className="flex flex-col w-full h-fit bg-[#9e17aa]">
          <div className="text-white mx-6">
            <h2 className="text-xl font-semibold mt-5">
              ספרו לנו על החוויה שלכם
            </h2>
            <p className="text-sm mt-3 mb-6">
              לורם איפסום דולור סיט אקונסקטורר אדיפיסינג אלית לפרומי בלוף קינץ
            </p>
          </div>
          <form className="flex flex-col w-11/12 mx-auto md:h-60" action="">
            <div className="flex flex-col">
              <label
                className="text-cyan-300 font-semibold text-right sm:mr-10 md:mr-14 lg:mr-16 mr-4"
                htmlFor=""
              >
                שם מלא
              </label>
              <input
                className="w-3/4 mx-auto border-b-4 border-cyan-400"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-cyan-300 font-semibold text-right sm:mr-10 md:mr-14 lg:mr-16 mr-4"
                htmlFor=""
              >
                דוא&quot;ל
              </label>
              <input
                className="w-3/4 mx-auto border-b-4 border-cyan-400"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-cyan-300 font-semibold text-right sm:mr-10 md:mr-14 lg:mr-16 mr-4"
                htmlFor=""
              >
                החוויה שלכם
              </label>
              <input
                className="w-3/4 mx-auto border-b-4 border-cyan-400"
                type="text"
              />
            </div>
            <div>
              <button className="w-3/4 mt-5 mx-auto bg-cyan-400">שליחה</button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-2 w-full">
          <div>
            <img src="./images/summer-2880261_640.jpg" alt="image" />
          </div>
          <div>
            <img src="./images/train-3758523_640.jpg" alt="image" />
          </div>
          <div>
            <img src="./images/winding-road-1556177_640.jpg" alt="image" />
          </div>
          <div>
            <img src="./images/woman-2711279_640.jpg" alt="image" />
          </div>
          <div>
            <img src="./images/adventure-1850912_640.jpg" alt="image" />
          </div>
          <div>
            <img src="./images/polynesia-3021072_640.jpg" alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
}
