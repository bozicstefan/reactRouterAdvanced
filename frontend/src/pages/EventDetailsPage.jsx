import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventDetailsPage = () => {
  // const data = useRouteLoaderData("event-detail");
  // console.log("data:", data);
  const { event, events } = useRouteLoaderData("event-detail");
  // console.log("event:", event);
  // console.log("events:", events);
  return (
    <>
      <h1>Event Details Page</h1>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>

      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailsPage;

export const loadEvent = async (id) => {
  const eventId = id;
  const res = await fetch(`http://localhost:8080/events/${eventId}`);
  if (!res.ok) {
    throw json({ message: "Could not fetch event" }, { status: 500 });
  } else {
    const resData = await res.json();
    return resData.event;
  }
};

export const loadEvents = async () => {
  const res = await fetch("http://localhost:8080/events");
  if (!res.ok) {
    // return { isError: true, message: "Could not fetch events" };
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    const resData = await res.json();
    return resData.events;
  }
};

export async function eventLoader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ request, params }) {
  const eventId = params.eventId;
  const res = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
  });
  if (!res.ok) {
    throw json({ message: "Could not delete event" }, { status: 500 });
  }
  return redirect("/events");
}
