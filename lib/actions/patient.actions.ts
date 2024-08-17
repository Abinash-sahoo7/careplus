"use server";

import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PAITENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("inside paitent.actions.ts try block");
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log("new User: ", newUser);
    return parseStringify(newUser);
  } catch (error: any) {
    console.log(error);
    if (error && error?.code === 409) {
      // user is already present
      const documents = await users.list([Query.equal("email", [user.email])]);

      return documents.users[0];
    }
    console.log("An error occure while creating a new user : ", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    console.log("In getUSer Function : ", user);
    return parseStringify(user);
  } catch (error) {
    console.log("Error while getting user: ", error);
  }
};

export const registerPaitent = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    console.log("start the registerPaitent fun");

    let File;

    if (identificationDocument) {
      console.log("inside the if block");
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      File = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }
    console.log("FILE : ", File);
    console.log({ paitent: patient });

    const newPaitent = await databases.createDocument(
      DATABASE_ID!,
      PAITENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: File?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files
        /${File?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      }
    );

    return parseStringify(newPaitent);
  } catch (error) {
    console.log("Errro while register new Paitent : ", error);
  }
};

export const getPaitent = async (userId: string) => {
  try {
    const paitents = await databases.listDocuments(
      DATABASE_ID!,
      PAITENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    // console.log({ paitent: paitent });
    return parseStringify(paitents.documents[0]);
  } catch (error) {
    console.log("errro occure in retrive the paitent: ", error);
  }
};
