export default function HereAndNow() {
  return (
    <section className="mx-auto">
      <div className="w-full h-screen bg-gradient-to-t from-[#76c976] to-[#0025aa]">
        <div className="flex flex-col text-center text-lg md:flex">
          <h1 className="mt-28 mb-7 items-center justify-center font-extrabold text-white text-8xl font-serif">
            Here & Now
          </h1>
          <h2 className="text-center font-semibold text-white mb-7 tracking-wider">
            רצינו להזמין אתכם להנות משלל מתנות
          </h2>
          <label className=" mb-14 text-white text-base text-center" htmlFor="">
            יש להזין את כל הפרטים{" "}
          </label>
          <form action="">
            <div className="md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 w-11/12 gap-4 flex flex-col md:flex-row-reverse mt-5 mx-auto justify-center items-center">
              <div className="flex-[3] sm:flex-row-reverse gap-5 flex flex-col">
                <div className="w-full flex-[3] md:w-64 flex flex-col">
                  <label className=" text-white text-end" htmlFor="">
                    שם מלא
                  </label>
                  <input
                    className="w-full md:w-auto bg-transparent border-2 h-10"
                    type="text"
                  />
                </div>
                <div className="w-full flex-[3] md:w-64 flex flex-col">
                  <label className=" text-white text-end" htmlFor="">
                    דוא&quot;ל
                  </label>
                  <input
                    className="w-full md:w-auto bg-transparent border-2 h-10"
                    type="text"
                  />
                </div>
                <button className="w-full md:w-64 p-2 flex-[1] bg-white mt-6 rounded-sm font-semibold h-10">
                  עדכנו אותי
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
