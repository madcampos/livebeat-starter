import Button from '@/components/Button';
import Container from '@/components/Container';
import FormLabel from '@/components/FormLabel';
import FormRow from '@/components/FormRow';
import InputText from '@/components/InputText';
import Layout from '@/components/Layout';
import { useState } from 'react';
import { login } from '../lib/auth.ts';

function LoginPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);

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

			await login(email);
		} catch (err) {
			console.error(err);
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
				<form className="max-w-xs border border-slate-200 dark:border-slate-500 rounded p-6 mx-auto" onSubmit={handleOnSubmit}>
					<FormRow className="mb-5">
						<FormLabel htmlFor="email">Email</FormLabel>
						<InputText id="email" name="email" type="email" required />
					</FormRow>

					<Button isSubmitting={isSubmitting}>Submit</Button>
				</form>
			</Container>
		</Layout>
	);
}

export default LoginPage;
