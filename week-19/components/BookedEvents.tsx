"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookedEvents() {
  const session = useSession();
  const [bookedEvents, setBookedEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!session.data?.user) {
      redirect("/signin");
    }

    async function getBookedEvents() {
      console.log(session);
      const response = await axios.post("/api/event/user", {
        userId: session.data?.user?.id,
      });

      if (response.data.error) {
        console.log(response);
      } else {
        setBookedEvents(response.data);
      }
    }

    getBookedEvents();
  }, [session]);

  return (
    <div>
      {bookedEvents.map((event: any) => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
