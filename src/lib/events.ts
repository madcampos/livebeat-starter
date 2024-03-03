import { ID, type Models } from 'appwrite';
import { databases, ids } from './appwrite';
import { deleteImageById } from './images.ts';

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

export async function getEventById(eventId: DatabaseEvent['$id']) {
	const result = await databases.getDocument<DatabaseEvent>(ids.events.database, ids.events.collection, eventId);

	return result;
}

export async function createEvent(event: DatabaseEventData) {
	const result = await databases.createDocument<DatabaseEvent>(ids.events.database, ids.events.collection, ID.unique(), event);

	return result;
}

export async function deleteEvent(event: DatabaseEvent) {
	if (event.imageId) {
		await deleteImageById(event.imageId);
	}

	await databases.deleteDocument(ids.events.database, ids.events.collection, event.$id);
}
