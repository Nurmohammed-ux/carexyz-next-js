import { getSingleService } from "@/action/server/service";
import BookingPage from "@/components/layout/BookingPage";

export default async function Page({ params }) {
  const { id } = await params;
  const service = await getSingleService(id);

  if (!service) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-error">
          সার্ভিসটি পাওয়া যায়নি!
        </h2>
      </div>
    );
  }

  return <BookingPage service={service} />;
}