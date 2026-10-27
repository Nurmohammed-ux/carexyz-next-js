import { MongoClient } from 'mongodb';
const client = new MongoClient(process.env.URI);
const dbName = process.env.DB_USER;

export const collections = {
    SERVICE: "services",
    USER: "users",
    BOOKING: "bookings"
}


export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}


export const dbConnect = (cname) => {
    return client.db(dbName).collection(cname);
}

