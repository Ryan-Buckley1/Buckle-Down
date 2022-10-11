import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_FULL_ME, QUERY_EVENTS } from "../../utils/queries";

const EventForm = () => {
  const [eventFormState, setEventFormState] = useState({
    name: "",
    location: "",
    date: "",
    requirements: "",
    timeStart: 0,
    timeEnd: 0,
    allDay: false,
    recurring: 0,
  });
  const [addEvent, { error }] = useMutation(ADD_EVENT, {
    update(cache, { data: { addEvent } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_FULL_ME });
        cache.writeQuery({
          query: QUERY_FULL_ME,
          data: { me: { ...me, events: [...me.events, addEvent] } },
        });
      } catch (e) {
        console.warn("First event insertion by user!");
      }
      const { events } = cache.readQuery({ query: QUERY_EVENTS });

      cache.writeQuery({
        query: QUERY_EVENTS,
        data: { events: [addEvent, ...events] },
      });
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEventFormState({
      ...eventFormState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addEvent({
        variables: { eventFormState },
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Name"
                name="name"
                type="name"
                id="name"
                value={eventFormState.name}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Location"
                name="location"
                type="location"
                id="location"
                value={eventFormState.location}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Date"
                name="date"
                type="date"
                id="date"
                value={eventformState.date}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Requirements"
                name="requirements"
                type="requirements"
                id="requirements"
                value={eventFormState.requirements}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Start Time"
                name="timeStart"
                type="timeStart"
                id="timeStart"
                value={eventFormState.timeStart}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="End Time"
                name="timeEnd"
                type="timeEnd"
                id="timeEnd"
                value={eventFormState.timeEnd}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="End Time"
                name="timeEnd"
                type="timeEnd"
                id="timeEnd"
                value={eventFormState.timeEnd}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>
            {error && <div>Sign up failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BillForm;
