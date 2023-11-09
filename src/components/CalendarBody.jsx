import React, { useState, useEffect } from "react";

const CalendarBody = ({ weeks, selectedMonthDt }) => {
  const [tasks, setTasks] = useState([]);
  const [clickedTask, setClickedTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskList, setShowTaskList] = useState(true);

  function handleTaskClick(task) {
    setSelectedTask(task);
    setShowTaskList(false);
  }

  function handleClose() {
    setSelectedTask(null);
    setShowTaskList(true);
  }

  useEffect(() => {
    fetch("http://localhost:9000/activities")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

   function handleClick(task) {
    setClickedTask(task);
  }
 
  return (
    <div className="calendar-body">
      {weeks.map(function (week, weekIndex) {
        return (
          <div className="calendar-week" key={weekIndex}>
            {week.map(function (day, dayIndex) {
              // Format dateToDisplay to "yyyy/MM/dd" format
              const fullDate = selectedMonthDt.set({
                day: parseInt(day.date, 10),
              });
              const dateToDisplay = fullDate.toFormat("yyyy-MM-dd");

              const tasksForDate = tasks.filter(
                (task) => task.date === dateToDisplay
              );

              return (
                <span
                  className={`calendar-day ${day.isToday ? "current" : ""} ${
                    !day.isCurrentMonth ? "other-month" : ""
                  }`}
                  key={dayIndex}
                >
                  {day.date}
                  {tasksForDate.map((task) => (
                    <>
                      {showTaskList ? (
                        <>
                        <span className="task" key={task.id} onClick={() => handleClick(task)}>
                          {task.task}
                        </span>
                        <button  className="more-info" onClick={handleTaskClick}>More Info</button>
                        </>
                      ) : (
                        <div className="extra-info">
                          <button className="more-info" onClick={handleClose}>Close</button>
                          <span>Task: {task.task}</span>
                          <span>Notes: {task.notes}</span>
                          <span>Time: {task.time}</span>
                          <span>ID: {task.id}</span>
                        </div>
                      )}
                    </>
                  ))}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarBody;
