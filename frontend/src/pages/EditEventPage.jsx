import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

const EditEventPage = () => {
  const data = useRouteLoaderData("event-detail");

  return (
    <>
      <h1 style={{ textAlign: "center" }}> Edit Event Page</h1>
      <EventForm method="patch" event={data.event} />
    </>
  );
};

export default EditEventPage;
