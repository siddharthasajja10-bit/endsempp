import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEvents([
        { id: 1, title: "Meeting", date: "2026-02-18" },
        { id: 2, title: "Exam", date: "2026-02-20" }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const addEvent = (event) => {
    setEvents((prev) => [...prev, { ...event, id: Date.now() }]);
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent, loading }}>
      {children}
    </EventContext.Provider>
  );
};
