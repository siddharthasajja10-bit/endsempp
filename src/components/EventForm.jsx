import { useState, useContext } from "react";
import { EventContext } from "../context/EventContext";

function EventForm() {
  const { addEvent } = useContext(EventContext);

  const [form, setForm] = useState({
    title: "",
    date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.date) return;

    addEvent(form);
    setForm({ title: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Event Title"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
