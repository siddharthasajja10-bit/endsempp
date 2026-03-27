import React, { useState } from "react";

function WeekView({ currentWeek, events, addEvent, deleteEvent }) {
  const today = new Date().toDateString();
  const [selectedDate, setSelectedDate] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    if (!inputValue.trim()) return;

    addEvent(selectedDate, inputValue);
    setInputValue("");
    setSelectedDate(null);
  };

  return (
    <div className="week-container">
      <h2 className="week-title">📅 Week View</h2>

      <div className="week-grid">
        {currentWeek.map((day, index) => {
          const dateKey = day.fullDate.toDateString();
          const isToday = dateKey === today;

          return (
            <div key={index} className={`day-card ${isToday ? "today" : ""}`}>
             
              <p className="day-date">{day.date}</p>
                 <h4 className="day-name">
  {day.fullDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  })}
</h4>
              <div className="event-list">
                {events[dateKey]?.map((event, i) => (
                  <div key={i} className="event-item">
                    <span>{event}</span>
                    <button
                      className="delete-btn"
                      onClick={() => deleteEvent(day.fullDate, i)}
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>

              <button
                className="add-btn"
                onClick={() => setSelectedDate(day.fullDate)}
              >
                ➕ Add Event
              </button>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add Event</h3>

            <input
              type="text"
              placeholder="Enter event..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setSelectedDate(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
<ul>
  {(events[day.toDateString()] || []).map((event, i) => (
    <li key={i} className="event-item">
      {event}
      <button
        className="delete-btn"
        onClick={() => deleteEvent(day.toDateString(), i)}
      >
        ❌
      </button>
    </li>
  ))}
</ul>


export default WeekView;
