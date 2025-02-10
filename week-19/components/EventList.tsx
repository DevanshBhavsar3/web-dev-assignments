"use client";

import axios from "axios";
import { useEffect } from "react";
import Button from "./Button";
import { useSession } from "next-auth/react";

export default function EventList({ events }: { events: any }) {
  const session = useSession();

  async function handleBook(eventId: string) {
    try {
      await axios.put("/api/event/user", {
        userId: session.data?.user?.id,
        eventId: eventId,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {events.map((event: any) => (
        <div key={event.id}>
          {event.title}{" "}
          <Button
            label="Book"
            type="button"
            onClick={() => handleBook(event.id)}
          />
        </div>
      ))}
    </div>
  );
}
