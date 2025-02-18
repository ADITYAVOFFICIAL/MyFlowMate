import { account } from './appwrite';
import { ID } from 'appwrite';

export async function signUp(email: string, password: string, name: string) {
  try {
    await account.create(ID.unique(), email, password, name);
    await signIn(email, password);
  } catch (error) {
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    await account.createEmailSession(email, password);
  } catch (error) {
    throw error;
  }
}

export async function resetPassword(email: string) {
  try {
    await account.createRecovery(email, 'http://localhost:3000/reset-password');
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  try {
    await account.deleteSession('current');
  } catch (error) {
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
}