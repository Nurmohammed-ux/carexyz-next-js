import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const serviceCollection = dbConnect(collections.SERVICE);

export const getServices = async () => {
  try {
    const services = await serviceCollection.find().toArray();
    return services.map((service) => ({
      ...service,
      _id: service._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching services from database:", error);
    return [];
  }
};

export const getSingleService = async (identifier) => {
  try {
    let query = {};
    if (ObjectId.isValid(identifier) && identifier.length === 24) {
      query = { _id: new ObjectId(identifier) };
    } else {
      query = { slug: identifier };
    }

    const result = await serviceCollection.findOne(query);

    if (!result) {
      return null;
    }

    return {
      ...result,
      _id: result._id.toString(),
    };
  } catch (error) {
    console.error("Error fetching single service from database:", error);
    return null;
  }
};
