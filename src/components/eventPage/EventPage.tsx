import React, { useState, useEffect, useContext } from "react";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion"; // For animations
import { api } from "../../utils/api";
import AuthContext from "../../contexts/authContext/authContext";
import { Link } from "react-router-dom";

const EventPage = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState<any[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    user_id: user?._id,
    title: "",
    description: "",
    date: "",
  });

  // Fetch events when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userEvents = await api.event.getEventsByUser({
          user_id: user?._id,
        });
        setEvents(userEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [user?._id]);

  const handleEventCreation = async () => {
    try {
      const createdEvent = await api.event.createEvent(newEvent);
      setEvents((prevEvents) => [...prevEvents, createdEvent]);
      setIsFormVisible(false); // Close the form after successful creation
      setNewEvent({ title: "", description: "", date: "", user_id: user?._id }); // Clear form
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Function to calculate time difference between current time and event date
  const getTimeRemaining = (eventDate: string) => {
    const eventTime = new Date(eventDate).getTime();
    const now = new Date().getTime();
    const difference = eventTime - now;

    if (difference <= 0) {
      return "Event Ended";
    }

    const days = Math.floor(difference / (1000 * 3600 * 24));
    const hours = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600));

    return `${days}d ${hours}h left`;
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 h-screen overflow-y-scroll">
      {/* Button to show form */}
      <motion.button
        className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center space-x-2 hover:bg-blue-600 transition-all"
        onClick={() => setIsFormVisible(!isFormVisible)}
        whileHover={{ scale: 1.1 }}
      >
        <FaPlus />
        <span>Create Event</span>
      </motion.button>

      {/* Event creation form */}
      {isFormVisible && (
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl text-white font-semibold mb-4">
            Create a New Event
          </h2>
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="w-full p-2 mb-4 border rounded-md"
          />
          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleChange}
            placeholder="Event Description"
            className="w-full p-2 mb-4 border rounded-md"
          />
          <input
            type="datetime-local"
            name="date"
            value={newEvent.date}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-all"
            onClick={handleEventCreation}
          >
            Create Event
          </button>
        </motion.div>
      )}

      {/* List of events */}
      <div className="space-y-4">
        {events.length === 0 ? (
          <motion.div
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No events yet
          </motion.div>
        ) : (
          events.map((event) => (
            // <motion.div
            //   key={event._id}
            //   className="bg-gray-800 text-white p-4 rounded-lg shadow-md"
            //   initial={{ opacity: 0 }}
            //   animate={{ opacity: 1 }}
            //   transition={{ duration: 0.3 }}
            // >
            //   <h3 className="text-lg font-bold">{event.title}</h3>
            //   <p>{event.description}</p>
            //   <p className="text-sm text-gray-500">
            //     {new Date(event.date).toLocaleString()}
            //   </p>
            //   <p className="text-sm text-green-500 font-semibold">
            //     {getTimeRemaining(event.date)}
            //   </p>
            // </motion.div>
            <motion.div
              key={event._id}
              className="relative bg-gray-900 w-80 block px-4 pb-6 border border-gray-100 rounded-lg max-w-sm mx-auto mt-2"
            >
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

              <div className="my-4">
                <h2 className="text-white text-xl font-bold pb-2">
                  {event.title}
                </h2>
                <p className="text-gray-300 py-1">
                  Category : {event.description}
                </p>
              </div>

              <div className="flex justify-between">
                <div className="flex items-start gap-2 text-white mt-2">
                  <FaCalendarAlt className="text-blue-500 text-lg" />
                  <div>
                    <p className="text-sm text-gray-500">
                      {new Date(event.date)
                        .toLocaleString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .replace(":00 ", "")}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/events/${event?._id}`}
                  // onClick={() => handleJoinEvent(event._id)}
                  className="px-2 py-1 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800"
                >
                  See Details
                </Link>
                <div className="text-xs text-green-500 absolute top-3 right-5 ">
                  Time Left: {getTimeRemaining(event.date)}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventPage;
