import http from 'http';
import express, { Express } from 'express';
import routes from './repositories/controller/repositories-route';

const app: Express = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);

app.use((_req, res) => {
	const error = new Error('not found');
	return res.status(404).json({
		message: error.message
	});
});

/** Server */
const httpServer = http.createServer(app);
httpServer.listen(3000, () => console.log('The server is running on port'));