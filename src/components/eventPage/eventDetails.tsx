import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming React Router is used
import {
  FaCalendarAlt,
  FaUserCircle,
  FaEnvelope,
  FaExclamationTriangle,
} from "react-icons/fa";
import { api } from "../../utils/api";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [attendances, setAttendances] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const result = await api.event.getEventDetails({ event_id: eventId });
        setEventDetails(result.event);
        setAttendances(result.attendances);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin text-blue-500"></div>
        <span className="ml-2 text-xl">Loading event details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <FaExclamationTriangle className="inline-block mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div className="text-center text-gray-600">No event details found.</div>
    );
  }

  return (
    <div className="container bg-gray-900 h-screen overflow-y-scroll mx-auto px-4 py-8">
      <div className=" ">
        <img
          src="https://nextly.web3templates.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero.4e76c802.png&w=640&q=75"
          alt=""
          className="h-20"
        />
        <div className="flex items-center space-x-4 mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            {eventDetails.title}
          </h1>
        </div>

        <p className="text-lg text-gray-700 mb-4">{eventDetails.description}</p>
        <div className="flex items-center space-x-2 text-gray-600 mb-4">
          <FaCalendarAlt className="text-gray-500" />
          <span>
            {new Date(eventDetails.date).toLocaleString("en-US", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </span>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            Join List
          </h2>
          {attendances.length > 0 ? (
            <ul className="space-y-4">
              {attendances.map((attendance) => (
                <li
                  key={attendance._id}
                  className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg shadow-md"
                >
                  <FaUserCircle className="text-blue-500 text-4xl" />
                  <div>
                    <p className="font-medium text-white">
                      {attendance.user.user_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {attendance.user.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {attendance.user_id.email}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No attendees yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
