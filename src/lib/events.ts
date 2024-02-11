import type { Models } from 'appwrite';
import { databases, ids } from './appwrite';

export interface DatabaseEvent extends Models.Document {
	name: string,
	location?: string,
	date?: Date,
	image?: {
		url: string,
		alt: string
	}
};


export async function getEvents() {
	const { documents } = await databases.listDocuments<DatabaseEvent>(ids.events.database, ids.events.collection);

	return documents;
}


export async function getEventById(eventId: string) {
	const result = await databases.getDocument<DatabaseEvent>(ids.events.database, ids.events.collection, eventId);

	return result;
}
