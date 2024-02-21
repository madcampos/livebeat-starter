import { ID, type Models } from 'appwrite';
import { databases, ids } from './appwrite';

export interface DatabaseEventData {
	name: string,
	location?: string,
	date?: Date,
	imageWidth?: number,
	imageHeight?: number,
	imageId?: string,
	imageAlt?: string
}

export type DatabaseEvent = DatabaseEventData & Models.Document;

export async function getEvents() {
	const { documents } = await databases.listDocuments<DatabaseEvent>(ids.events.database, ids.events.collection);

	return documents;
}


export async function getEventById(eventId: string) {
	const result = await databases.getDocument<DatabaseEvent>(ids.events.database, ids.events.collection, eventId);

	return result;
}

export async function createEvent(event: DatabaseEventData) {
	const result = await databases.createDocument<DatabaseEvent>(ids.events.database, ids.events.collection, ID.unique(), event);

	return result;
}
