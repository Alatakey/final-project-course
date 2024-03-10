export default function FreeAdvice() {
  return (
    <section className="bg-slate-100 flex sm:flex-row flex-col-reverse justify-center items-center">
      <div className="flex flex-col gap-2 sm:ml-5">
        <form
          className="flex flex-col gap-5 text-center sm:text-right"
          action=""
        >
          <h1 className="font-bold text-yellow-400 text-4xl">ייעוץ חינם</h1>
          <p className="font-semibold text-center sm:text-right">
            לקבלת ייעוץ חינם, מוזמנים להשאיר פרטים ומומחה יחזור אליכם עם מענה.
          </p>
          <div className="font-semibold mx-4 sm:mx-auto">
            <div className="flex sm:flex-row-reverse flex-col gap-4">
              <div className="w-full flex flex-col">
                <label className="text-black text-right">שם מלא</label>
                <input
                  className="w-full bg-blue-100 shadow-[0_4px_0_0_rgba(0,0,0,0.5)] shadow-yellow-300"
                  type="text"
                />
              </div>
              <div className="w-full flex flex-col">
                <label className="text-black text-right">דוא&quot;ל</label>
                <input
                  className="w-full bg-blue-100 shadow-[0_4px_0_0_rgba(0,0,0,0.5)] shadow-yellow-300"
                  type="text"
                />
              </div>
            </div>
            <div className="mt-5 flex flex-col">
              <label className="text-black text-right">הודעה</label>
              <input
                className="bg-blue-100 shadow-[0_4px_0_0_rgba(0,0,0,0.5)] shadow-yellow-300 h-16"
                type="text"
              />
            </div>
            <button className="w-full sm:w-36 my-12 h-11 bg-yellow-300">
              שליחה
            </button>
          </div>
        </form>
        <div className="flex flex-row gap-10 justify-center">
          <div className="bg-yellow-300 rounded-full">
            <img src="./facebook.svg" alt="facebook" />
          </div>
          <div className="bg-yellow-300 rounded-full">
            <img src="./instagram.svg" alt="instagram" />
          </div>
          <div className="bg-yellow-300 rounded-full">
            <img src="./in.svg" alt="in" />
          </div>
        </div>
      </div>
      <div className="">
        <img
          className="sm:w-auto w-[150px]"
          src="./images/Image_1.png"
          alt=""
        />
      </div>
    </section>
  );
}
