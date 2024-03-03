import { ID } from 'appwrite';

import { auth } from './appwrite.ts';

export async function login(email: string) {
	return auth.createMagicURLSession(ID.unique(), email, `${window.location.origin}/session`);
}