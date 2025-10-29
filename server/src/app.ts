import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import todoRoutes from './routes/todo.routes';
import { authenticateUser } from './middleware/auth.middleware';

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Auth
app.use('/api/auth', authRoutes);
// User
app.use('/api/user', authenticateUser, userRoutes);
// Todos
app.use('/api/todos', authenticateUser, todoRoutes);

export default app;
