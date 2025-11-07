import React, { useState } from "react";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * Event Calendar component displays upcoming campus events in a mobile-friendly calendar view.
 * This component is only visible on mobile devices.
 */
const EventCalendar = () => {
  // Sample events data - in production, this would come from Firebase
  const [events] = useState([
    {
      id: 1,
      title: "Campus Sports Day",
      date: new Date(2024, 11, 15), // December 15, 2024
      time: "10:00 AM",
      location: "Main Sports Complex",
      type: "sports"
    },
    {
      id: 2,
      title: "Student Leadership Summit",
      date: new Date(2024, 11, 20), // December 20, 2024
      time: "2:00 PM",
      location: "Auditorium",
      type: "academic"
    },
    {
      id: 3,
      title: "Cultural Night",
      date: new Date(2024, 11, 25), // December 25, 2024
      time: "6:00 PM",
      location: "Main Hall",
      type: "cultural"
    },
    {
      id: 4,
      title: "Tech Innovation Fair",
      date: new Date(2025, 10, 17), // January 5, 2025
      time: "9:00 AM",
      location: "Tech Hub",
      type: "academic"
    },
  ]);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get the first day of the month and number of days
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Check if a date has an event
  const getEventsForDate = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return events.filter(event => {
      const eventDate = event.date;
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  // Get event type color
  const getEventTypeColor = (type) => {
    switch (type) {
      case "sports":
        return "bg-green-500";
      case "academic":
        return "bg-blue-500";
      case "cultural":
        return "bg-purple-500";
      default:
        return "bg-orange-500";
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get upcoming events (next 3)
  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date - b.date)
    .slice(0, 3);

  return (
    <section className="py-14 border-b border-gray-200 md:hidden lg:hidden">
      <div className="mx-auto w-[90%]">
        <div className="px-4 text-center md:px-8">
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaCalendarAlt className="text-orange-500 text-2xl" />
              <h3 className="text-gray-800 text-3xl font-semibold">
                Event <span className="text-orange-500">Calendar</span>
              </h3>
            </div>
            <p className="text-gray-600 mt-2">Stay updated with campus events</p>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={goToPreviousMonth}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaChevronLeft className="text-orange-500" />
              </button>
              <h4 className="text-xl font-semibold text-gray-800">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h4>
              <button
                onClick={goToNextMonth}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaChevronRight className="text-orange-500" />
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before the first day of the month */}
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const dayEvents = getEventsForDate(day);
                const isToday =
                  day === new Date().getDate() &&
                  currentMonth.getMonth() === new Date().getMonth() &&
                  currentMonth.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={day}
                    className={`aspect-square flex flex-col items-center justify-center text-sm rounded-lg ${
                      isToday
                        ? "bg-orange-500 text-white font-bold"
                        : dayEvents.length > 0
                        ? "bg-orange-100 text-gray-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span>{day}</span>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className={`w-1 h-1 rounded-full ${getEventTypeColor(event.type)}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events List */}
          <div className="space-y-3">
            <h4 className="text-xl font-semibold text-gray-800 text-left mb-4">Upcoming Events</h4>
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-800 mb-1">{event.title}</h5>
                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <FaCalendarAlt className="text-orange-500" />
                        {event.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p>{event.time} • {event.location}</p>
                    </div>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCalendar;

