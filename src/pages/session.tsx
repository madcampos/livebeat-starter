import Container from '@/components/Container';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { verifySession } from '../lib/auth.ts';

function SessionPage() {
	const [, setLocation] = useLocation();

	useEffect(() => {
		(async () => {
			const params = new URLSearchParams(window.location.search);
			const userId = params.get('userId');
			const secret = params.get('secret');

			if (!userId || !secret) {
				setLocation('/login');

				return;
			}

			await verifySession(userId, secret);
			setLocation('/');
		})();
	}, []);

	return (
		<Container className="h-screen flex items-center justify-center text-center">
			<p>Logging you in...</p>
		</Container>
	);
}

export default SessionPage;
