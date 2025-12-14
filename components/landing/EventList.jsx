import EventCard from "@/components/landing/EventCard";
import { getAllEvents } from "@/db/queries";
import { dbConnect } from "@/services/mongo";
const EventList = async ({ query }) => {
  await dbConnect();
  const allEvents = await getAllEvents(query || "");

  if (!allEvents || allEvents.length === 0) {
    return <p className="text-center py-10">No events found.</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {allEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
