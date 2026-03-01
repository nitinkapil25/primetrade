import express from 'express';
import apiV1Routes from './routes/index.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';
import { swaggerServe, swaggerSetup, swaggerSpec } from './config/swagger.js';

const app = express();

// Log each request with status and response time.
app.use(requestLogger);

// Parse incoming JSON request bodies.
app.use(express.json());

// Swagger API docs.
app.use('/api-docs', swaggerServe, swaggerSetup);
app.get('/api-docs.json', (_req, res) => res.status(200).json(swaggerSpec));

// Versioned API routes.
app.use('/api/v1', apiV1Routes);

// 404 fallback for unmatched routes.
app.use(notFoundHandler);

// Global error handler should be the last middleware.
app.use(errorHandler);

export default app;

