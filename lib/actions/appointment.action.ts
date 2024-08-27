"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  PAITENT_COLLECTION_ID,
} from "../appwwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

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

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    console.log("list Appointments are : ", appointments);

    const initialCount = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount += 1;
        }

        return acc;
      },
      initialCount
    );

    console.log("Counts are : ", counts);

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    console.log("Data in the getRecentAppointmentList : ", data);

    return parseStringify(data);
  } catch (error) {
    console.log("Error occure while getRecentAppointmentList : ", error);
  }
};

export const updateAppointment = async ({
  userId,
  appointmentId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found !");
    }

    // TODO SMS Notification
    revalidatePath("/admin");

    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log("Error occure while update Appointment : ", error);
  }
};
