import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { api } from "../../utils/api";
import AuthContext from "../../contexts/authContext/authContext";
import { FaCalendarAlt } from "react-icons/fa";

const AllEvents = () => {
  const { user } = useContext(AuthContext);

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = async () => {
    try {
      const filter = {
        user_id: user?._id, // Ensure the property name is _id, not _Id
      };
      const result = await api.event.getEvent(filter);
      setEvents(result || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  // Join event handler
  const handleJoinEvent = async (eventId: string) => {
    try {
      await api.event.joinEvent({
        user_id: user?._id,
        event_id: eventId,
        status: true,
      });
      alert("Successfully joined the event!");
      fetchEvents();
    } catch (error) {
      console.error("Error joining event:", error);
      alert("Failed to join the event. Please try again.");
    }
  };

  // Calculate time remaining for an event
  const calculateTimeLeft = (eventDate: string) => {
    const now = new Date();
    const eventTime = new Date(eventDate);
    const difference = eventTime.getTime() - now.getTime();

    if (difference <= 0) {
      return null; // Event has passed
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    return { days, hours, minutes };
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-2 space-y-6 bg-gray-900 h-screen overflow-y-scroll text-white">
      <h1 className="text-2xl font-bold mb-4">All Events</h1>

      {loading ? (
        <motion.div
          className="text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading events...
        </motion.div>
      ) : events.length === 0 ? (
        <motion.div
          className="text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No events available.
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => {
            const timeLeft = calculateTimeLeft(event.date);

            if (!timeLeft) {
              return null; // Skip past events
            }

            return (
              <motion.div
                key={event._id}
                className="relative bg-gray-900 w-[95%] block px-4 pb-6 border border-gray-100 rounded-lg max-w-sm mx-auto mt-2"
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
                  <div className="flex items-start gap-2 p-1.5 bg-gray-800 text-white rounded-md shadow-lg">
                    <FaCalendarAlt className="text-blue-500 text-lg" />
                    <div>
                      <p className="text-xs font-semibold">
                        {" "}
                        {new Date(event.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleJoinEvent(event._id)}
                    className="px-2 py-1 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800"
                  >
                    Join Event
                  </button>
                  <div className="text-xs text-green-500 absolute top-3 right-5 ">
                    Time Left: {timeLeft.days}d {timeLeft.hours}h{" "}
                    {timeLeft.minutes}m
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
