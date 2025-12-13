"use server";

import { createUser, findUserByCredentials } from "@/db/queries";
import { redirect } from "next/navigation";
import { updateInterest } from "@/db/queries";
import { revalidatePath } from "next/cache";
import { updateGoing } from "@/db/queries";
import {Resend } from 'resend';
import { getEventById } from "@/db/queries";
import EmailTemplate from "@/components/payments/EmailTemplate";

// Action to register a new user
async function registerUser(formData) {
  const user = Object.fromEntries(formData);

  const created = await createUser(user);
  redirect("/login");
}

// Action to perform user login
async function performLogin(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");

    const found = await findUserByCredentials(credential);
    return found;
  } catch (error) {
    throw error;
  }
}

async function addInterestedEvent(eventId, authId){
  try {
    await updateInterest(eventId, authId);
  } catch (error) {
    throw error;
  }
  revalidatePath("/")
}

async function addGoingEvent(eventId, user){
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user);
  } catch (error) {
    throw error;
  }
  revalidatePath("/")
  redirect('/')
}

async function sendEmail(eventId, user) {
  try {
    const event = await getEventById(eventId)
  const resend = new Resend(process.env.RESEND_API_KEY);
  const message = `Dear ${user.name},
  Thank you for registering for the event "${event.title}". We are excited to have you join us!`

  const sent = await resend.emails.send({
    from: 'Eventry <onboarding@resend.dev>',
     to: user?.email,  
    subject: `Registration Confirmation for ${event.title}`,
   react:EmailTemplate({message})
  });
  } catch (error) {
    throw error;
  }
}



export { performLogin, registerUser, addInterestedEvent, addGoingEvent, sendEmail };
