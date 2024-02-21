import { ID } from 'appwrite';
import { ids, storage } from './appwrite.ts';

export async function createImage(image: File) {
	return storage.createFile(ids.images.bucket, ID.unique(), image);
}

export function getFilePreviewUrl(fileId: string) {
	const THUMB_WIDTH = 640;
	const THUMB_HEIGHT = 480;

	return storage.getFilePreview(ids.images.bucket, fileId, THUMB_WIDTH, THUMB_HEIGHT);
}
