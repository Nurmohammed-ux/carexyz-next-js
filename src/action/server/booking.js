import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const bookingCollection = dbConnect(collections.BOOKING || "bookings");

const serviceCollection = dbConnect(collections.SERVICE || "services");

export const postBooking = async (request) => {
  try {
    const body = await request.json();

    const { serviceId, userEmail, userName, duration, location } = body;

    // Validate required fields
    if (
      !serviceId ||
      !userEmail ||
      !Number.isInteger(duration) ||
      duration < 1 ||
      duration > 30 ||
      !location?.division?.trim() ||
      !location?.district?.trim() ||
      !location?.city?.trim() ||
      !location?.address?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "প্রয়োজনীয় তথ্য সঠিকভাবে প্রদান করুন।",
        },
        { status: 400 },
      );
    }

    // Validate MongoDB ObjectId
    if (!ObjectId.isValid(serviceId)) {
      return NextResponse.json(
        {
          success: false,
          message: "সার্ভিস আইডি সঠিক নয়।",
        },
        { status: 400 },
      );
    }

    // Fetch the actual service from MongoDB
    const service = await serviceCollection.findOne({
      _id: new ObjectId(serviceId),
      isActive: true,
    });

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          message: "সার্ভিসটি পাওয়া যায়নি অথবা বর্তমানে চালু নেই।",
        },
        { status: 404 },
      );
    }

    // Calculate price on the server, not from client input
    const unitPrice = Number(service.startingPrice);

    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "এই সার্ভিসের মূল্য বর্তমানে নির্ধারিত নেই।",
        },
        { status: 400 },
      );
    }

    const totalCost = duration * unitPrice;

    const newBooking = {
      serviceId: service._id,
      serviceName: service.name,
      userEmail: userEmail.trim().toLowerCase(),
      userName: userName?.trim() || "",
      duration,
      priceUnit: service.priceUnit || "hour",
      unitPrice,
      totalCost,
      currency: "BDT",
      location: {
        division: location.division.trim(),
        district: location.district.trim(),
        city: location.city.trim(),
        address: location.address.trim(),
      },
      status: "pending",
      createdAt: new Date(),
    };

    const result = await bookingCollection.insertOne(newBooking);

    return NextResponse.json(
      {
        success: true,
        message: "বুকিং সফলভাবে সংরক্ষিত হয়েছে!",
        bookingId: result.insertedId.toString(),
        totalCost,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Booking creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "সার্ভারে ত্রুটি ঘটেছে। আবার চেষ্টা করুন।",
      },
      { status: 500 },
    );
  }
};

export const getBookings = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        message: "অনুমতি নেই (Unauthorized)!",
        bookings: [],
      };
    }

    const bookings = await bookingCollection
      .find({
        userEmail: session.user.email.toLowerCase(),
      })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      bookings: bookings.map((booking) => ({
        ...booking,
        _id: booking._id.toString(),
        serviceId: booking.serviceId?.toString(),
      })),
    };
  } catch (error) {
    console.error("Fetch Bookings Error:", error);

    return {
      success: false,
      message: "সার্ভারে ত্রুটি ঘটেছে।",
      bookings: [],
    };
  }
};

export const deleteBooking = async (request, { params }) => {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        message: "অনুমতি নেই (Unauthorized)!",
      };
    }
 

    if (!ObjectId.isValid(id) || id.length !== 24) {
      return {
        success: false,
        message: "ভুল বুকিং আইডি!",
      };
    }

    const result = await bookingCollection.deleteOne({
      _id: new ObjectId(id),
      userEmail: session.user.email,
    });

    if (result.deletedCount === 0) {
      return {
        success: false,
        message: "বুকিংটি পাওয়া যায়নি অথবা বাতিল করা সম্ভব হয়নি।",
      };
    }

    return {
      success: true,
      message: "বুকিং সফলভাবে বাতিল করা হয়েছে!",
    };
  } catch (error) {
    console.error("Delete booking error:", error);

    return {
      success: false,
      message: "সার্ভারে সমস্যা হয়েছে।",
    };
  }
};
