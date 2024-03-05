import { Link } from 'wouter';

import Container from '@/components/Container';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.tsx';

const Nav = () => {
	const { session, logOut } = useAuth();
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleOnClick() {
		try {
			setIsSubmitting(true);

			await logOut();
		} catch (err) {
			console.error(err);
		} finally {
			setIsSubmitting(false);
		}
	}


	return (
		<nav>
			<Container className="py-16">
				<p className="text-center mb-2">
					<Link href="/">
						<span className="text-4xl font-bold text-slate-900 dark:text-white hover:text-slate-900 dark:hover:text-gray-100 drop-shadow-[0_2px_0px_rgba(255,255,255,1)] dark:drop-shadow-[0_2px_0px_rgba(0,0,0,1)]">LiveBeat</span>
					</Link>
				</p>
				<p className="flex justify-center gap-4">
					{session
						? (
							<button
								className="font-medium hover:text-[#535bf2] cursor-pointer"
								onClick={handleOnClick}
							>
								{isSubmitting ? 'Logging out...' : 'Log Out'}
							</button>
						)
						: (
							<Link href="/login">
								<span className="font-medium text-inherit">Log In</span>
							</Link>
						)}
				</p>
			</Container>
		</nav>
	);
};

export default Nav;
