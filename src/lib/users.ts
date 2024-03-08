import { teams } from './appwrite.ts';

export async function getTeams() {
	const data = await teams.list();

	return data.teams;
}
