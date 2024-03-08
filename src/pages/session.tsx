import Container from '@/components/Container';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth.tsx';

function SessionPage() {
	const { verifySession } = useAuth();
	const [, setLocation] = useLocation();
	const [error, setError] = useState<string>('');

	useEffect(() => {
		(async () => {
			try {
				const params = new URLSearchParams(window.location.search);
				const userId = params.get('userId');
				const secret = params.get('secret');

				if (!userId || !secret) {
					setLocation('/login');

					return;
				}

				await verifySession(userId, secret);
				setLocation('/');
			} catch (err) {
				console.error(err);
				setError((err as Error)?.message ?? err?.toString() ?? 'An error occurred');
			}
		})();
	}, []);

	return (
		<Container className="h-screen flex items-center justify-center text-center">
			{error
				? (
					<p>Logging you in...</p>
				)
				: (
					<p>{error}</p>
				)}
		</Container>
	);
}

export default SessionPage;
