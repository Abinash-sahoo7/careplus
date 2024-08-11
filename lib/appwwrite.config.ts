// import * as sdk from "node-appwrite";
import { Client, Databases, Storage, Messaging, Users } from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PAITENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

// const client = new sdk.Client();
const client = new Client();

if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  // throw new Error("Missing environment variables");
  console.log("Missing environment variables");
}

console.log(ENDPOINT, PROJECT_ID, API_KEY);

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const messaging = new Messaging(client);
export const users = new Users(client);
