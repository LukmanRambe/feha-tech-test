import { Router } from 'express';
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from '../controllers/todo.controller';

const router = Router();

// GET /api/todos?limit=10&offset=0
router.get('/', getTodos);

// GET /api/todos/:id
router.get('/:id', getTodoById);

// POST /api/todos
router.post('/', createTodo);

// PATCH /api/todos/:id
router.patch('/:id', updateTodo);

// DELETE /api/todos/:id
router.delete('/:id', deleteTodo);

export default router;
