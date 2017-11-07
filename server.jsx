import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Template from './app/components/template';
import App from './app/components/App';

export default function serverRenderer({ clientStats, serverStats }) {
	return (req, res, next) => {
		const context = {};
		const markup = ReactDOMServer.renderToString(
			<StaticRouter location={ req.url } context={ context }>
				<App />
			</StaticRouter>
		);

		res.status(200).send(Template({
			markup: markup,
		}));
	};
}
