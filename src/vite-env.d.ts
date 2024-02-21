/// <reference types="vite/client" />

interface ImportMetaEnv {
	/** The app mode. Can be either `development` or `production`. */
	readonly MODE: 'development' | 'production',
	readonly PROD: boolean,
	readonly DEV: boolean,

	readonly VITE_APPWRITE_ENDPOINT: string,
	readonly VITE_APPWRITE_PROJECT: string,
	readonly VITE_APPWRITE_EVENTS_DATABASE_ID: string,
	readonly VITE_APPWRITE_EVENTS_COLLECTION_ID: string,
	readonly VITE_APPWRITE_EVENTS_IMAGES_BUCKET_ID: string
}

interface ImportMeta {
	hot: {
		accept: Function,
		dispose: Function
	},
	readonly env: ImportMetaEnv
}
