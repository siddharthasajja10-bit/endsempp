import React, { useState } from "react";

function MonthView({ monthDays, events, addEvent, deleteEvent }) {
  const today = new Date().toDateString();
  const [selectedDate, setSelectedDate] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    addEvent(selectedDate, inputValue);
    setInputValue("");
    setSelectedDate(null);
  };

  return (
    <div className="month-container">
      <h2>📆 Month View</h2>

      <div className="month-grid">
        {monthDays.map((date, index) => {
          const key = date.toDateString();
          const isToday = key === today;

          return (
            <div key={index} className={`month-day ${isToday ? "today" : ""}`}>
              <div className="date-number">{date.getDate()}</div>

              {events[key]?.map((event, i) => (
                <div key={i} className="event-item">
                  {event}
                  <button onClick={() => deleteEvent(date, i)}>🗑</button>
                </div>
              ))}

              <button onClick={() => setSelectedDate(date)}>+</button>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add Event</h3>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Event..."
            />
            <div className="modal-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setSelectedDate(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthView;
