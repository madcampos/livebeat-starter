import { useState } from 'react';
import { useLocation } from 'wouter';

import Button from '@/components/Button';
import Container from '@/components/Container';
import FormLabel from '@/components/FormLabel';
import FormRow from '@/components/FormRow';
import InputDate from '@/components/InputDate';
import InputFile from '@/components/InputFile';
import InputText from '@/components/InputText';
import Layout from '@/components/Layout';

import { useAuth } from '../../hooks/useAuth.tsx';
import { createEvent } from '../../lib/events.ts';
import { createImage } from '../../lib/images.ts';

async function getImageDimentions(file?: File) {
	if (!file) {
		return { width: 0, height: 0 };
	}

	const img = new Image();

	img.src = URL.createObjectURL(file);

	return new Promise<{ width: number, height: number }>((resolve, reject) => {
		img.onload = () => {
			const { width, height } = img;

			URL.revokeObjectURL(img.src);
			resolve({ width, height });
		};

		img.onerror = reject;
	});
}

function NewEventPage() {
	const { session } = useAuth();
	const [, setLocation] = useLocation();
	const [error, setError] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (!session) {
		setLocation('/');

		return;
	}

	async function handleOnSubmit(evt: React.SyntheticEvent) {
		evt.preventDefault();

		const form = evt.target as HTMLFormElement;

		if (form.querySelector('button[aria-disabled="true"]')) {
			return;
		}

		try {
			setIsSubmitting(true);

			form.setAttribute('aria-disabled', 'true');
			const formData = new FormData(form);

			const name = formData.get('name') as string;
			const date = formData.get('date') as string;
			const location = formData.get('location') as string;
			const image = formData.get('image') as File;
			let imageEntry;
			let imageAlt;
			let width;
			let height;

			if (image.name && image.size > 0) {
				({ width, height } = await getImageDimentions(image));
				imageEntry = await createImage(image);
				imageAlt = formData.get('image-alt') as string;
			}

			const result = await createEvent({
				name,
				date: new Date(date),
				location,
				imageWidth: width,
				imageHeight: height,
				imageId: imageEntry?.$id,
				imageAlt
			});

			setLocation(`/event/${result.$id}`);
		} catch (err) {
			console.error(err);
			setError((err as Error)?.message ?? err?.toString() ?? 'An error occurred');
		} finally {
			form.reset();
			setIsSubmitting(false);
		}
	}

	return (
		<Layout>
			<Container className="grid gap-12 grid-cols-1 md:grid-cols-2">
				<div>
					<h1 className="text-3xl font-bold mb-6">
						Create a New Event
					</h1>
					<p className="mb-4">
						Creating an event on LiveBeat is a surefire way to elevate your event's success to
						unprecedented heights. From concerts to festivals, LiveBeat caters to all event types,
						making it the ideal stage to capture the attention of your target audience.
					</p>
					<p>
						Focus on what matters most—delivering an unforgettable experience—and witness your
						event gain momentum like never before on LiveBeat.
					</p>
				</div>

				<form className="border border-slate-200 dark:border-slate-500 rounded p-6" onSubmit={handleOnSubmit}>
					<FormRow className="mb-5">
						<FormLabel htmlFor="name">Event Name</FormLabel>
						<InputText id="name" name="name" type="text" required />
					</FormRow>

					<FormRow className="mb-5">
						<FormLabel htmlFor="date">Event Date</FormLabel>
						<InputDate id="date" name="date" type="datetime-local" required />
					</FormRow>

					<FormRow className="mb-5">
						<FormLabel htmlFor="location">Event Location</FormLabel>
						<InputText id="location" name="location" type="text" required />
					</FormRow>


					<FormRow className="mb-6">
						<FormLabel htmlFor="image">Image</FormLabel>
						<InputFile id="image" name="image" />
						<p className="text-sm mt-2">Accepted File Types: jpg, png</p>
					</FormRow>

					<FormRow className="mb-5">
						<FormLabel htmlFor="image-alt">Image alt. text</FormLabel>
						<InputText id="image-alt" name="image-alt" type="text" />
					</FormRow>

					<Button isSubmitting={isSubmitting}>Submit</Button>

					{error && (
						<p className="bg-red-50 p-4 mt-6 rounded">{error}</p>
					)}
				</form>
			</Container>
		</Layout>
	);
}

export default NewEventPage;
