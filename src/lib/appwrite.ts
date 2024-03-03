import { Account, Client, Databases, Storage } from 'appwrite';

export const ids = {
	events: {
		database: import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID,
		collection: import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID
	},
	images: {
		bucket: import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID
	}
} as const;

export const appwriteClient = new Client();

appwriteClient.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT);
appwriteClient.setProject(import.meta.env.VITE_APPWRITE_PROJECT);

export const databases = new Databases(appwriteClient);

export const storage = new Storage(appwriteClient);

export const auth = new Account(appwriteClient);
