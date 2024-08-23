import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { useLoaderData, json, defer, Await } from "react-router-dom";

const EventsPage = () => {
  const events = useLoaderData();
  // console.log("events:", events);
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventsPage;

export const eventsLoader = async () => {
  const res = await fetch("http://localhost:8080/events");
  if (!res.ok) {
    // return { isError: true, message: "Could not fetch events" };
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    const resData = await res.json();
    return resData.events;
  }
};

export function loader() {
  return defer({
    events: eventsLoader(),
  });
}
