import express from 'express';
import apiV1Routes from './routes/index.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Parse incoming JSON request bodies.
app.use(express.json());

// Versioned API routes.
app.use('/api/v1', apiV1Routes);

// 404 fallback for unmatched routes.
app.use(notFoundHandler);

// Global error handler should be the last middleware.
app.use(errorHandler);

export default app;

