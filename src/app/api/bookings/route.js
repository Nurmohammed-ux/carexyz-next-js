import { deleteBooking, postBooking } from "@/action/server/booking";

export async function POST(request) {
  return postBooking(request);
}

