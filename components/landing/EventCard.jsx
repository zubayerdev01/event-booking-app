import ActionButtons from "@/components/ActionButtons";
import Image from "next/image";
import Link from "next/link";

import EventSchemaScript from "@/components/meta/EventSchemaScript";

const EventCard = ({ event }) => {
  return (
    <div className="bg-[#242526] rounded-xl overflow-hidden flex flex-col shadow-md hover:shadow-lg transition-shadow">
      <EventSchemaScript event={event} />
      <div className="w-full aspect-video relative">
        <Image
          src={event?.imageUrl}
          // width={500}
          // height={500}
          fill
          alt={event?.name}
          className="boject-cover"
          sizes="100%"
        />
      </div>

     <div className="flex flex-col flex-1 p-4">
        <Link href={`/details/${event?.id}`} className="font-semibold text-xl leading-tight hover:text-[#cfcfcf] transition-colors">
          {event.name}
        </Link>
        <p className="text-[#9C9C9C] text-sm mt-1">{event?.location}</p>
        <div className="text-[#737373] text-sm mt-2 flex items-center">
          <span>{event?.interested_ids?.length} Interested</span>
          <span className="mx-1">|</span>
          <span>{event?.going_ids?.length} Going</span>
        </div>

      <div className="mt-auto pt-4">
          <ActionButtons
          eventId={event?.id?.toString()}
          interestedUserIds={event?.interested_ids?.map((id) => id.toString())}
          goingUserIds={event?.going_ids?.map((id) => id.toString())}
        />
      </div>
      </div>
    </div>
  );
};

export default EventCard;
