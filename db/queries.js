import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";
import mongoose from "mongoose";
import { dbConnect } from "@/services/mongo";

async function getAllEvents(query) {
  await dbConnect();
  let allEvents = [];
  if (query) {
    const regex = new RegExp(query, "i"); // 'i' for case-insensitive
    allEvents = await eventModel.find({ name: { $regex: regex } }).lean();
  } else {
    allEvents = await eventModel.find().lean();
  }

  return replaceMongoIdInArray(allEvents);
}

async function getEventById(eventId) {
  await dbConnect();
  const event = await eventModel.findById(eventId).lean();
  return replaceMongoIdInObject(event);
}

async function createUser(user) {
  await dbConnect();
  return await userModel.create(user);
}

async function findUserByCredentials(credentials) {
  await dbConnect();
  const user = await userModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

async function updateInterest(eventId, authId) {
  await dbConnect();
  const event = await eventModel.findById(eventId);
  if (event) {
    const foundUsers = event.interested_ids.find(
      (id) => id.toString() === authId
    );

    if (foundUsers) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }
    await event.save();
  }
}

async function updateGoing(eventId, authId) {
  await dbConnect();
  const event = await eventModel.findById(eventId);
  event.going_ids.push(new mongoose.Types.ObjectId(authId));
  await event.save();
}

export {
  createUser,
  findUserByCredentials,
  getAllEvents,
  getEventById,
  updateGoing,
  updateInterest,
};
