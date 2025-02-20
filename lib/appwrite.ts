import { Client, Account, Databases, Storage } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67b45a8a00177b1b4d49');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = '67b45aee001d25884c4b';
export const COLLECTIONS = {
  USERS: '67b71cfd001c1841c5ec',
  SYMPTOMS: '67b71da1002b368bb151',
  MOODS: '67b71dca0023545960a5',
  FORUM_POSTS: '67b71def00229376cf41',
  FORUM_COMMENTS: '67b71e2a001ac2909937',
  AI_CONVERSATIONS: '67b71e4b0032f7272acb',
  CYCLE_LOGS: '67b71d6b00172c8fe856',
};

// Helper function to check if user is authenticated
export const checkAuth = async () => {
  try {
    const session = await account.getSession('current');
    return session;
  } catch (error) {
    return null;
  }
};

// Helper function to get current user
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
};