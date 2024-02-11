import type { DatabaseEvent } from '@/lib/events';

import { useEffect, useState } from 'react';
import { useParams } from 'wouter';

import { getEventById } from '@/lib/events';

import Layout from '@/components/Layout';
import Container from '@/components/Container';
// import Button from '@/components/Button';

function Event() {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<DatabaseEvent | undefined>(undefined);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(eventId);

        setEvent(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEvent();
  }, [eventId]);

  return (
    <Layout>
      <Container className="grid gap-12 grid-cols-1 md:grid-cols-2">
        <div>
          {event?.image?.url && (
            <img
              className="block rounded"
              width={800}
              height={450}
              src={event.image.url}
              alt={event.image.alt}
            />
          )}
        </div>

        <div>
          {event && (
            <>
              <h1 className="text-3xl font-bold mb-6">
                { event?.name }
              </h1>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Date:</strong> { event?.date && new Date(event?.date).toLocaleString('en-US', { month: 'long', day: 'numeric' }) }
              </p>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Location:</strong> { event?.location }
              </p>
              {/* <p className="mt-6">
                <Button color="red">Delete Event</Button>
              </p> */}
            </>
          )}
        </div>
      </Container>
    </Layout>
  )
}

export default Event;
