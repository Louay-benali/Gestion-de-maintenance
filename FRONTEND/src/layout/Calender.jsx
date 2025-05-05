import React, { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Custom CSS to override default styles
const customCalendarStyles = `
  .rbc-calendar {
    border: none;
  }
  .rbc-header {
    padding: 12px 0;
    font-weight: 500;
    color: #6B7280;
    text-transform: uppercase;
    font-size: 0.875rem;
    border-bottom: 1px solid #E5E7EB;
  }
  .rbc-month-view {
    border: 1px solid #E5E7EB;
    border-radius: 8px;
  } 
  .rbc-day-bg {
    border-right: 1px solid #E5E7EB;
    border-bottom: 1px solid #E5E7EB;
  }
  .rbc-date-cell {
    padding: 8px;
    text-align: left;
    font-weight: normal;
    font-size: 0.95rem;
    color: #111827;
  }
  .rbc-off-range-bg {
    background-color: #F9FAFB;
  }
  .rbc-off-range {
    color: #9CA3AF;
  }
  .rbc-today {
    background-color: white !important;
  }
  .rbc-row-segment {
    padding: 1px 4px;
  }
  .rbc-event {
    border-radius: 4px;
    padding: 2px 5px;
  }
`;

// Add the styles to the document
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = customCalendarStyles;
  document.head.appendChild(styleEl);
}
import { enUS } from "date-fns/locale";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = () => {
  // Add state for current date - set to May 2025 to match screenshot
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1));
  // Empty events array - all static events removed
  const [events, setEvents] = useState([]);

  // Add modal state
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    id: null,
    title: "",
    start: "",
    end: "",
    type: "primary",
  });

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: "",
      borderLeft: "",
      borderRadius: "4px",
      color: "",
      border: "",
    };

    switch (event.type) {
      case "danger":
        style.backgroundColor = "#fef2f2";
        style.borderLeft = "4px solid #dc2626";
        style.color = "#dc2626";
        break;
      case "success":
        style.backgroundColor = "#f0fdf4";
        style.borderLeft = "4px solid #16a34a";
        style.color = "#16a34a";
        break;
      case "primary":
        style.backgroundColor = "#eff6ff";
        style.borderLeft = "4px solid #2563eb";
        style.color = "#2563eb";
        break;
      case "warning":
        style.backgroundColor = "#fff7ed";
        style.borderLeft = "4px solid #f97316";
        style.color = "#f97316";
        break;
      default:
        style.backgroundColor = "#f3f4f6";
    }

    return {
      style: style,
    };
  };

  // Custom Toolbar Component with centered title and button on the right
  const CustomToolbar = ({ label, onNavigate, onView }) => {
    const handleNavigate = (action) => {
      onNavigate(action);
    };

    return (
      <div className="mb-4 flex justify-between items-center px-2 py-2">
        <div className="flex items-center gap-2">
          <button
            className="bg-white px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
            onClick={() => handleNavigate("PREV")}
          >
            ‹
          </button>
          <button
            className="bg-white px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
            onClick={() => handleNavigate("NEXT")}
          >
            ›
          </button>
        </div>

        <div className="text-center flex-grow">
          <span className="text-lg font-medium text-gray-800">{label}</span>
        </div>

        <div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => {
              setNewEvent({
                id: events.length + 1,
                title: "",
                start: "",
                end: "",
                type: "primary",
              });
              setShowModal(true);
            }}
          >
            Add Event +
          </button>
        </div>
      </div>
    );
  };

  // Custom Event Component
  const CustomEvent = ({ event }) => (
    <div className="p-1 text-sm">
      <strong>{event.title}</strong>
      {event.start.getHours() > 0 && (
        <div className="text-xs mt-1">
          {format(event.start, "ha")} - {format(event.end, "ha")}
        </div>
      )}
    </div>
  );

  // Handle event form submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    // Create a new event with the form data
    const startDate = new Date(newEvent.start);
    const endDate = new Date(newEvent.end);

    const eventToAdd = {
      id: newEvent.id || events.length + 1,
      title: newEvent.title,
      start: startDate,
      end: endDate,
      type: newEvent.type,
    };

    // Add to events array
    setEvents([...events, eventToAdd]);

    // Close modal and reset form
    setShowModal(false);
    setNewEvent({
      id: null,
      title: "",
      start: "",
      end: "",
      type: "primary",
    });
  };

  return (
    <div className="h-screen p-4 bg-white rounded-lg border-gray-200 border">
      <h2 className="text-2xl font-medium text-gray-800 mb-4 pl-2">Calendar</h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        defaultView="month"
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
        }}
        eventPropGetter={eventStyleGetter}
        style={{
          height: "85vh",
          fontFamily: "system-ui, sans-serif",
        }}
        formats={{
          monthHeaderFormat: "MMMM yyyy",
        }}
        dayPropGetter={(date) => ({
          style: {
            backgroundColor: "white",
            height: "120px",
          },
        })}
      />

      {/* Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Add / Edit Event
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Plan your next big moment: schedule or edit an event to stay on
              track
            </p>

            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Event Color
                </label>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="eventType"
                      value="danger"
                      checked={newEvent.type === "danger"}
                      onChange={() =>
                        setNewEvent({ ...newEvent, type: "danger" })
                      }
                      className="mr-2"
                    />
                    <span>Danger</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="eventType"
                      value="success"
                      checked={newEvent.type === "success"}
                      onChange={() =>
                        setNewEvent({ ...newEvent, type: "success" })
                      }
                      className="mr-2"
                    />
                    <span>Success</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="eventType"
                      value="primary"
                      checked={newEvent.type === "primary"}
                      onChange={() =>
                        setNewEvent({ ...newEvent, type: "primary" })
                      }
                      className="mr-2"
                    />
                    <span>Primary</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="eventType"
                      value="warning"
                      checked={newEvent.type === "warning"}
                      onChange={() =>
                        setNewEvent({ ...newEvent, type: "warning" })
                      }
                      className="mr-2"
                    />
                    <span>Warning</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Enter Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={newEvent.start}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, start: e.target.value })
                    }
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="mm/dd/yyyy"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Enter End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={newEvent.end}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, end: e.target.value })
                    }
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="mm/dd/yyyy"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-8">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 focus:outline-none"
                  disabled={!newEvent.title || !newEvent.start || !newEvent.end}
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
