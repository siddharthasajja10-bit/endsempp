import { useContext } from "react";
import { EventContext } from "../context/EventContext";

function MonthView() {
  const { events, loading, deleteEvent } = useContext(EventContext);

  if (loading) return <h3>Loading events...</h3>;

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="calendar-grid">
      {days.map((day) => {
        const date = `2026-02-${String(day).padStart(2, "0")}`;
        const dayEvents = events.filter((e) => e.date === date);

        return (
          <div key={day} className="day-cell">
            <h4>{day}</h4>

            {dayEvents.map((event) => (
              <div key={event.id} className="event">
                <span>{event.title}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteEvent(event.id)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        );
      })}
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

export default MonthView;
