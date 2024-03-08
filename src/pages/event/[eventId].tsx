import type { DatabaseEvent } from '@/lib/events';

import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';

import { deleteEvent, getEventById } from '@/lib/events';

import Button from '@/components/Button';
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import { useAuth } from '../../hooks/useAuth.tsx';
import { getFilePreviewUrl } from '../../lib/images.ts';

function EventPage() {
	const { eventId } = useParams<{ eventId: string }>();
	const [, setLocation] = useLocation();
	const { isAdmin } = useAuth();
	const [event, setEvent] = useState<DatabaseEvent | undefined>(undefined);
	const [error, setError] = useState<string>('');
	const [imageUrl, setImageUrl] = useState<string>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleOnDelete(eventToDelete: DatabaseEvent) {
		try {
			setIsSubmitting(true);

			// eslint-disable-next-line no-alert
			if (confirm('Are you sure you want to delete this event?')) {
				await deleteEvent(eventToDelete);

				setLocation(`/`);
			}
		} catch (err) {
			console.error(err);
			setError((err as Error)?.message ?? err?.toString() ?? 'An error occurred');
		} finally {
			setIsSubmitting(false);
		}
	}

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await getEventById(eventId);

				if (response.imageId) {
					setImageUrl(getFilePreviewUrl(response.imageId).href);
				}

				setEvent(response);
			} catch (err) {
				console.error(err);

				setError((err as Error)?.message ?? err?.toString() ?? 'An error occurred');
			}
		};

		void fetchEvent();
	}, [eventId]);

	return (
		<Layout>
			<Container className="grid gap-12 grid-cols-1 md:grid-cols-2">
				<div>
					{imageUrl && (
						<img
							className="block rounded"
							width={640}
							height={480}
							src={imageUrl}
							alt={event?.imageAlt ?? 'Event image'}
							loading="lazy"
						/>
					)}
				</div>

				<div>
					{error && <p>{error}</p>}
					{!event && !error && <p>Loading...</p>}
					{event && (
						<>
							<h1 className="text-3xl font-bold mb-6">
								{event?.name}
							</h1>
							<p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
								<strong>Date:</strong> {event?.date && new Date(event?.date).toLocaleString('en-US', { month: 'long', day: 'numeric' })}
							</p>
							<p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
								<strong>Location:</strong> {event?.location}
							</p>
							<p className="mt-6">
								{isAdmin && (
									<Button color="red" isSubmitting={isSubmitting} onClick={async () => handleOnDelete(event)}>Delete Event</Button>
								)}
							</p>
						</>
					)}
				</div>
			</Container>
		</Layout>
	);
}

export default EventPage;
