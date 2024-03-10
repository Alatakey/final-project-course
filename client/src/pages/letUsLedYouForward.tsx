export default function LetUsLedYouForward() {
  return (
    <section className="mx-auto">
      <div className="w-full relative ">
        <div className="bg-space bg-cover bg-center bg-no-repeat bg-[url('/images/Path_15.png')] h-[675px]">
          <div className="w-[400px] items-center mt-48 mx-auto sm:left-auto left-0 right-0 sm:right-[20%] absolute bg-[rgba(30,30,30,0.65)] flex flex-col text-center text-lg md:flex">
            <h1 className="mt-10 font-bold text-white text-3xl font-serif">
              תן לנו להוביל אותך קדימה
            </h1>
            <p className=" mb-4 text-white text-base text-center p-10">
              לורם איפסום או בקיצור ליפסום, הוא מלל מקובל וחסר משמעות המשמש
              “ממלא מקום” בעת עריכ.
            </p>
            <form action="">
              <div className="items-center justify-center gap-4 flex flex-col">
                <div className="items-end justify-end flex-[3] flex flex-col">
                  <div className="w-64 flex-[3] flex flex-col">
                    <label className=" text-white text-end" htmlFor="">
                      שם מלא
                    </label>
                    <input
                      className="w-full md:w-auto h-10 border-solid border-2 border-pink-500"
                      type="text"
                    />
                  </div>
                  <div className="w-64 flex-[3] flex flex-col">
                    <label className=" text-white text-end" htmlFor="">
                      דוא&quot;ל
                    </label>
                    <input
                      className="w-full md:w-auto h-10 border-solid border-2 border-pink-500"
                      type="text"
                    />
                  </div>
                  <button className="w-28 p-2 bg-pink-500 mt-6 mb-28 font-semibold h-10">
                    שליחה
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
