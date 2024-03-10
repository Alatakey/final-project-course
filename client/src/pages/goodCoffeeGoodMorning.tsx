export default function GoodCoffeeGoodMorning() {
  return (
    <section className="mx-auto md:mr-10 ml-10 flex flex-col md:flex-row md:justify-center">
      <div className="">
        <img
          className="w-11/12 md:w11/12 md:bg-gradient-to-t"
          src="./images/Coffee.png"
          alt="Coffee"
        />
      </div>
      <div className="md:flex w-full">
        <div className="md:w-11/12 lg:w-10/12 2xl:w-8/12 w-11/12 flex flex-col text-right text-lg md:flex ">
          <h1 className="mt-7 mb-7 font-extrabold text-blue-950 text-3xl font-serif">
            קפה טוב לבוקר טוב
          </h1>
          <p className="text-right font-semibold text-blue-950 mb-7">
            לקבלת קופון לקפה חינם ומפנק שיפתח לכם את היום בחיוך, יש למלא את
            הפרטים
          </p>
          <form action="">
            <div className="md:w-11/12 lg:w-10/12 2xl:w-8/12 w-11/12 gap-4 flex flex-col md:flex-col mt-5 items-end">
              <div className="w-72 flex-[2] flex flex-col">
                <label className=" text-blue-950 text-end" htmlFor="">
                  שם מלא
                </label>
                <input
                  className="w-full bg-sky-100 shadow-[0_4px_0_0_rgba(0,0,0,0.5)] shadow-blue-950 h-10"
                  type="text"
                />
              </div>
              <div className="w-72 flex-[2] flex flex-col">
                <label className=" text-blue-950 text-end" htmlFor="">
                  דוא&quot;ל
                </label>
                <input
                  className="w-full md:w-auto bg-sky-100 shadow-[0_4px_0_0_rgba(0,0,0,0.5)] shadow-blue-950 h-10"
                  type="text"
                />
              </div>
              <button className="w-36 p-2 flex-[1] bg-blue-950 text-white mt-6 font-semibold h-10">
                שליחה
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
