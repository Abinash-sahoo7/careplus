"use server";

import { ID } from "node-appwrite";
import {
  APPOINMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwwrite.config";
import { parseStringify } from "../utils";

export const CreateAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    // console.log("start the CreateAppointment fun");
    // console.log("Inside the CreateAppointment fun appointment : ", appointment);

    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log("Errro while register new Paitent : ", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.log("An error occure while get Appointment : ", error);
  }
};
