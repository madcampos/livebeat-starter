import { ID } from 'appwrite';

import { auth } from './appwrite.ts';

export async function login(email: string) {
	return auth.createMagicURLSession(ID.unique(), email, `${window.location.origin}/session`);
}

export async function verifySession(userId: string, secret: string) {
	return auth.updateMagicURLSession(userId, secret);
}

export async function getCurrentSession() {
	return auth.getSession('current');
}

export async function logout() {
	await auth.deleteSession('current');
}
