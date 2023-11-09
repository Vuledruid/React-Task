import React, { useState, useMemo, } from "react";
import { DateTime } from "luxon";
import CalendarBody from "./CalendarBody";

const calcWeeksInMonth = (dt) => {
  const firstDayOfMonth = dt.startOf("month");
  const lastDayOfMonth = dt.endOf("month");
  const startWeek = firstDayOfMonth.weekNumber;
  const endWeek = lastDayOfMonth.weekNumber;

  if (endWeek < startWeek) {
    if (firstDayOfMonth.month === 1) {
      return endWeek + 1;
    } else {
      if (lastDayOfMonth.weekday === 7) {
        return endWeek - startWeek + 1;
      } else {
        return firstDayOfMonth.weekYear - startWeek + 1;
      }
    }
  } else {
    return endWeek - startWeek + 1;
  }
};

const generateMonthDays = (dt) => {
  const weeksCount = calcWeeksInMonth(dt);
  const monthDays = [];
  let dayDate = dt.startOf("month").startOf("week");

  for (let perWeek = 0; perWeek < weeksCount; perWeek++) {
    const week = [];

    for (let perDay = 0; perDay < 7; perDay++) {
      const day = dayDate.toFormat("dd");
      const isCurrentMonth = dayDate.hasSame(dt, "month");
      week.push({
        date: day,
        isCurrentMonth,
      });

      dayDate = dayDate.plus({ days: 1 });
    }

    monthDays.push(week);
  }

  return monthDays;
};

const MyCalendar = () => {
  const weekDays = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];

  const initialDate = DateTime.fromObject({ year: 2023, month: 1, day: 1 });
  const [data, setData] = useState(initialDate);
  const [selectedMonthDt, setSelectedMonth] = useState(
    initialDate.startOf("month")
  );
  const nextMonth = useMemo(
    () => selectedMonthDt.plus({ month: 1 }),
    [selectedMonthDt]
  );
  const prevMonth = useMemo(
    () => selectedMonthDt.minus({ month: 1 }),
    [selectedMonthDt]
  );
  const months = useMemo(() => {
    if (selectedMonthDt && data) {
      return generateMonthDays(selectedMonthDt, data);
    }
  }, [selectedMonthDt, data]);

  const goToMonth = (val) => {
    setSelectedMonth(val);
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-nav">
        <button
          className="btn"
          onClick={() => goToMonth(prevMonth)}
          type="button"
        >
          <span className="arrow">&#x2039;</span> {prevMonth.monthLong}
        </button>
        <div className="month">
          <span className="month-display">
            {selectedMonthDt.monthLong} {selectedMonthDt.year}
          </span>
        </div>
        <button
          className="btn"
          onClick={() => goToMonth(nextMonth)}
          type="button"
        >
          {nextMonth.monthLong} <span className="arrow">&#x203A;</span>
        </button>
      </div>
      <div className="calendar-header">
        {weekDays.map(function (item) {
          return <span key={item}>{item}</span>;
        })}
      </div>
      {months ? (
        <CalendarBody weeks={months} selectedMonthDt={selectedMonthDt} />
      ) : null}
    </div>
  );
};

export default MyCalendar;
