import EventForm from "../components/EventForm";

const NewEventPage = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}> Enter New Event data</h1>;
      <EventForm method="post" />
    </>
  );
};

export default NewEventPage;
