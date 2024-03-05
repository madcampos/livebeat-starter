import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Switch } from 'wouter';

import EventPage from '@/pages/event/[eventId]';
import NewEventPage from '@/pages/event/new';
import HomePage from '@/pages/index';
import LoginPage from '@/pages/login';
import SessionPage from '@/pages/session';

import '@/styles/global.css';
import { AuthProvider } from './hooks/useAuth.tsx';

const Router = () => (
	<Switch>
		<Route path="/" component={HomePage} />
		<Route path="/login" component={LoginPage} />
		<Route path="/session" component={SessionPage} />
		<Route path="/event/new" component={NewEventPage} />
		<Route path="/event/:eventId" component={EventPage} />
	</Switch>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<Router />
		</AuthProvider>
	</React.StrictMode>
);
