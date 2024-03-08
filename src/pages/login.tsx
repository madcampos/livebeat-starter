import Button from '@/components/Button';
import Container from '@/components/Container';
import FormLabel from '@/components/FormLabel';
import FormRow from '@/components/FormRow';
import InputText from '@/components/InputText';
import Layout from '@/components/Layout';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth.tsx';

function LoginPage() {
	const { logIn, session } = useAuth();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSent, setIsSent] = useState(false);
	const [error, setError] = useState<string>('');
	const [, setLocation] = useLocation();

	if (session) {
		setLocation('/');

		return;
	}

	async function handleOnSubmit(evt: React.FormEvent) {
		evt.preventDefault();

		const form = evt.target as HTMLFormElement;

		if (form.querySelector('button[aria-disabled="true"]')) {
			return;
		}

		try {
			setIsSubmitting(true);

			const formData = new FormData(form);
			const email = formData.get('email') as string;

			await logIn(email);

			setIsSent(true);
		} catch (err) {
			console.error(err);
			setError((err as Error)?.message ?? err?.toString() ?? 'An error occurred');
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Layout>
			<Container>
				<h1 className="text-3xl font-bold text-center mb-6">
					Log In
				</h1>
				{error && (
					<p className="bg-red-50 p-4 mt-6 rounded">{error}</p>
				)}
				{!isSent && (
					<form className="max-w-xs border border-slate-200 dark:border-slate-500 rounded p-6 mx-auto" onSubmit={handleOnSubmit}>
						<FormRow className="mb-5">
							<FormLabel htmlFor="email">Email</FormLabel>
							<InputText id="email" name="email" type="email" required />
						</FormRow>

						<Button isSubmitting={isSubmitting}>Submit</Button>
					</form>
				)}
				{isSent && (
					<p className="text-center">Please check your email for a ✨ magic link ✨.</p>
				)}
			</Container>
		</Layout>
	);
}

export default LoginPage;
