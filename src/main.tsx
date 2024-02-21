import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Switch } from 'wouter';

import HomePage from '@/pages/index';
import LoginPage from '@/pages/login';
import SessionPage from '@/pages/session';
import NewEventPage from '@/pages/event/new';
import EventPage from '@/pages/event/[eventId]';

import '@/styles/global.css';

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
		<Router />
	</React.StrictMode>
);
