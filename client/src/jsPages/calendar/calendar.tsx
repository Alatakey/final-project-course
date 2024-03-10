import { useState } from "react";

export default function Calendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <CalendarComponent />
    </div>
  );
}

function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const renderCalendar = () => {
    const numDaysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const blanksBefore = Array(firstDayOfMonth).fill(null);
    const daysOfMonth = Array.from({ length: numDaysInMonth }, (_, i) => i + 1);
    const totalDays = [...blanksBefore, ...daysOfMonth];

    return (
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={handlePrevMonth}
          >
            Prev
          </button>
          <h2 className="text-lg font-semibold">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={handleNextMonth}
          >
            Next
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-sm text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {totalDays.map((day, index) => (
            <div
              key={index}
              className={`text-center text-sm ${
                day ? "text-gray-900" : "text-gray-300"
              }`}
            >
              {day || ""}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return renderCalendar();
}
