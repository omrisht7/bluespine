import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes';
import { loadInitialData } from './data/initialize';
import { notFoundHandler, errorHandler } from './middleware/error-handler';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.use(notFoundHandler);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

loadInitialData().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to initialize data:", err);
});