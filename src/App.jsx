import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewMode, setViewMode] = useState("week");
  const [events, setEvents] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [themeColor, setThemeColor] = useState("#66a6ff");
  const [currentDate] = useState(new Date());

  // Login states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const today = new Date().toDateString();

  // Load events
  useEffect(() => {
    const saved = localStorage.getItem("calendarEvents");
    if (saved) setEvents(JSON.parse(saved));

    const savedUser = localStorage.getItem("rememberUser");
    if (savedUser) {
      setUsername(savedUser);
      setRemember(true);
    }
  }, []);

  // Save events
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  // Dark mode
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  // Theme color
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-color",
      themeColor
    );
  }, [themeColor]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      if (remember) {
        localStorage.setItem("rememberUser", username);
      } else {
        localStorage.removeItem("rememberUser");
      }
      setIsLoggedIn(true);
    } else {
      alert("Invalid Username or Password");
    }
  };

  const addEvent = (date) => {
    const text = prompt("Enter event name:");
    if (!text) return;

    const key = date.toDateString();
    setEvents((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), text],
    }));
  };

  const deleteEvent = (dateKey, index) => {
    if (!window.confirm("Delete this event?")) return;

    setEvents((prev) => {
      const updated = { ...prev };
      const dayEvents = [...updated[dateKey]];
      dayEvents.splice(index, 1);

      if (dayEvents.length === 0) delete updated[dateKey];
      else updated[dateKey] = dayEvents;

      return updated;
    });
  };

  const getTotalEvents = () => {
    return Object.values(events).reduce(
      (total, day) => total + day.length,
      0
    );
  };

  const getMonthlyTotal = () => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    let total = 0;

    Object.keys(events).forEach((key) => {
      const d = new Date(key);
      if (d.getMonth() === month && d.getFullYear() === year) {
        total += events[key].length;
      }
    });

    return total;
  };

  const getDays = () => {
    if (viewMode === "week") {
      const start = new Date(currentDate);
      start.setDate(start.getDate() - start.getDay());

      return Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return d;
      });
    } else {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const last = new Date(year, month + 1, 0).getDate();

      return Array.from({ length: last }).map(
        (_, i) => new Date(year, month, i + 1)
      );
    }
  };

  // ================= LOGIN PAGE =================
  if (!isLoggedIn) {
    return (
      <div className="login">
        <div className="glass-card login-card">
          <h2>Welcome 👋</h2>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Username</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>


            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // ================= DASHBOARD =================
  return (
    <div className="dashboard">
      <header className="header">
        <h2>📊 Event Dashboard</h2>

        <div className="header-actions">
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            title="Pick Theme Color"
          />

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀" : "🌙"}
          </button>

          <button onClick={() => setIsLoggedIn(false)}>
            Logout
          </button>
        </div>
      </header>

      <div className="summary">
        <div className="glass-card summary-card">
          <h3>Total Events</h3>
          <p>{getTotalEvents()}</p>
        </div>

        <div className="glass-card summary-card">
          <h3>This Month</h3>
          <p>{getMonthlyTotal()}</p>
        </div>
      </div>

      <div className="controls">
        <button onClick={() => setViewMode("week")}>
          Week
        </button>
        <button onClick={() => setViewMode("month")}>
          Month
        </button>
      </div>

      <div className="calendar">
        {getDays().map((day, index) => {
          const isToday =
            day.toDateString() === today;

          return (
            <div
              key={index}
              className={`glass-card day ${
                isToday ? "today" : ""
              }`}
            >
              <h4>
                {viewMode === "week"
                  ? day.toDateString()
                  : day.getDate()}
              </h4>

              <button
                className="add-btn"
                onClick={() => addEvent(day)}
              >
                + Add
              </button>

              <ul>
                {(events[day.toDateString()] || []).map(
                  (event, i) => (
                    <li key={i}>
                      {event}
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteEvent(day.toDateString(), i)
                        }
                      >
                        ✖
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;