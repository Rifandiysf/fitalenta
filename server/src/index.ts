import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Fitalenta backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;