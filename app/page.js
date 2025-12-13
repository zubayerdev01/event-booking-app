import EventList from "@/components/landing/EventList";
import Header from "@/components/landing/Header";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export default async function Home({ searchParams }) {
  const { query } = await searchParams;
  return (
    <section className="container">
      <Header />
      {/* Event List */}
      <Suspense key={query} fallback={<Loading />}>
      <EventList query={query} />
      </Suspense>
    </section>
  );
}
