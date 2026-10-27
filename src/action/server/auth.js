"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

const userCollection = dbConnect(collections.USER);

export const postUser = async (payload) => {
  try {
    const { nid, name, email, contact, password } = payload;
    if (!email || !password)
      return { success: false, message: "ইমেল এবং পাসওয়ার্ড প্রয়োজন।" };

    const isExist = await userCollection.findOne({ email });

    if (isExist) {
      return {
        success: false,
        message: "এই ইমেল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে।",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const newUser = {
      nid,
      name,
      email,
      password: hashedPassword,
      contact,
      role: "user",
      createdAt: new Date(),
    };

    const result = await userCollection.insertOne(newUser);

    if (result.acknowledged) {
      return {
        success: true,
        message: "রেজিস্ট্রেশন সফল হয়েছে!",
        insertedId: result.insertedId.toString(),
      };
    }

    return { success: false, message: "রেজিস্ট্রেশন সম্পন্ন করা সম্ভব হয়নি।" };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message: "সার্ভারে সমস্যা হয়েছে, একটু পরে আবার চেষ্টা করুন।",
    };
  }
};

export const loginUser = async (payload) => {
  try {
    const { email, password } = payload;
    if (!email || !password)
      return { success: false, message: "ইমেল এবং পাসওয়ার্ড প্রয়োজন।" };

    const user = await userCollection.findOne({ email });

    if (!user || !user.password) {
      return {
        success: false,
        message: "এই ইমেল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি।",
      };
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (isMatched) {
      return {
        success: true,
        message: "লগইন সফল হয়েছে!",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        },
      };
    } else {
      return { success: false, message: "পাসওয়ার্ড ভুল রয়েছে।" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "সার্ভারে সমস্যা হয়েছে, একটু পরে আবার চেষ্টা করুন।",
    };
  }
};
