import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
  redirect,
  json,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const actionData = useActionData();
  const validationErrors = actionData?.errors;

  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method={method} className={classes.form}>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((err) => (
            <li style={{ color: "red" }} key={err}>
              {err}
            </li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    url = `http://localhost:8080/events/${params.eventId}`;
  }

  const res = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  if (res.status === 422) {
    return res;
  }

  if (!res.ok) {
    throw json({ message: "Could not save event" }, { status: 500 });
  }
  return redirect("/events");
}
