import { getSingleService } from "@/action/server/service";
import ServiceDetails from "@/components/layout/ServiceDetails";
import { notFound } from "next/navigation";

const SingleServicePage = async ({ params }) => {
  const { id } = await params;
  const service = await getSingleService(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <main className="pt-16 pb-8">
        <ServiceDetails service={service} />
      </main>
    </div>
  );
};

export default SingleServicePage;