import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67b45a8a00177b1b4d49');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DB_ID = '67b45aee001d25884c4b';
export const COLLECTIONS = {
  USERS: 'users',
  CYCLES: 'cycles',
  SYMPTOMS: 'symptoms',
  REMINDERS: 'reminders',
  COMMUNITY_POSTS: 'community_posts',
};