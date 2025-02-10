import prisma from "@/app/lib/prismadb";
import AddEvent from "@/components/AddEvents";
import BookedEvents from "@/components/BookedEvents";
import EventList from "@/components/EventList";

export default async function AllEvents() {
  const events = await prisma.event.findMany();
  return (
    <div>
      <AddEvent />
      <EventList events={events} />
      <BookedEvents />
    </div>
  );
}
