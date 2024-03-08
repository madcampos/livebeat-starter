/* eslint-disable no-inline-comments */

import type { Models } from 'appwrite';
import type { PropsWithChildren } from 'react';

import { createContext, useContext, useEffect, useState } from 'react';
import { verifySession as checkSession, getCurrentSession, login, logout } from '../lib/auth.ts';
import { getTeams } from '../lib/users.ts';

interface AuthContextInterface {
	session?: Models.Session,
	isAdmin: boolean,
	logIn(email: string): Promise<void>,
	verifySession(userId: string, secret: string): Promise<void>,
	logOut(): Promise<void>
}

export const AuthContext = createContext<AuthContextInterface>({
	session: undefined,
	isAdmin: false,
	logIn: async () => { /* */ },
	verifySession: async () => { /* */ },
	logOut: async () => { /* */ }
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [session, setSession] = useState<Models.Session | undefined>(undefined);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			try {
				const fetchedSession = await getCurrentSession();

				setSession(fetchedSession);
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	useEffect(() => {
		if (!session?.$id) {
			return;
		}

		(async () => {
			const teams = await getTeams();

			setIsAdmin(teams.findIndex((team) => team.$id === import.meta.env.VITE_APPWRITE_ADMIN_TEAM_ID) !== -1);
		})();
	}, [session?.$id]);

	async function logIn(email: string) {
		await login(email);
	}

	async function verifySession(userId: string, secret: string) {
		const newSession = await checkSession(userId, secret);

		setSession(newSession);
	}

	async function logOut() {
		await logout();
		setSession(undefined);
	}

	return (
		<AuthContext.Provider value={{ session, isAdmin, logIn, verifySession, logOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const auth = useContext(AuthContext);

	if (!auth) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return auth;
}
