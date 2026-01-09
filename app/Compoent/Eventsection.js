"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EventSelectPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await res.json();
        // assuming API response: { success: true, data: [...] }
        setEvents(data.data || []);
      } catch (err) {
        setError("Unable to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventName = e.target.eventName.value;

    if (!eventName) return;

    router.push(`/Campioninfo?event=${encodeURIComponent(eventName)}`);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h4 className="text-center mb-4 fw-bold">Select Event</h4>

        {error && <p className="text-danger text-center">{error}</p>}

        <select
          name="eventName"
          className="form-select mb-4"
          required
          disabled={loading}
        >
          <option value="">
            {loading ? "Loading events..." : "Select Event"}
          </option>

          {events.map((event) => (
            <option key={event._id} value={event.eventName}>
              {event.eventName}
            </option>
          ))}
        </select>

        <button
          className="btn btn-warning w-100 fw-semibold"
          disabled={loading}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
