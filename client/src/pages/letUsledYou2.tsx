export default function LetUsLedYou() {
  return (
    <section className="w-11/12 flex flex-col mx-auto">
      <div className='bg-space bg-cover bg-center bg-no-repeat bg-[url("/images/Path_16.png")] h-[675px] w-[80vw] flex flex-col gap-10 justify-center items-center -mt-32 mx-auto px-2'>
        <h1 className="font-extrabold md:text-6xl text-2xl text-yellow-400">
          תן לנו להוביל אותך קדימה
        </h1>
        <p className="text-white">לי לנו יכולת להוביל אותך קדימה</p>
      </div>
      <form
        className="flex flex-col items-center justify-center gap-5"
        action=""
      >
        <div className="flex flex-col mt-20">
          <div className="flex sm:flex-row-reverse gap-10 flex-col">
            <div className="flex flex-col items-end">
              <label className="text-blue-900 font-semibold" htmlFor="">
                שם מלא
              </label>
              <input
                className="w-80 bg-blue-100 shadow-[0_4px_0_0_rgba(0,0,0,0.5)] shadow-yellow-400"
                type="text"
              />
            </div>
            <div className="flex flex-col items-end">
              <label className="text-blue-900 font-semibold" htmlFor="">
                דוא&quot;ל
              </label>
              <input
                className="w-80 bg-blue-100 shadow-[0_4px_0_0_rgba(0,0,0,0.5)] shadow-yellow-400"
                type="text"
              />
            </div>
            <div>
              <button className="text-blue-900 font-bold text-lg bg-yellow-400 sm:w-36 h-9 mt-4 w-full">
                שליחה
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
