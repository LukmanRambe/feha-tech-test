// src/controllers/todo.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import { responseJson } from '../utils/responseJson';

// GET /api/todos?limit=20&offset=0
export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { isComplete, sort, limit, offset } = req.query;

    const [sortField, sortOrder] = (sort as string).split(' ');

    const todos = await prisma.todo.findMany({
      skip: parseInt(offset as string) || 0,
      take: parseInt(limit as string) || 20,
      orderBy: {
        [sortField]: sortOrder?.toLowerCase(),
      },
      where: {
        userId,
        isComplete: isComplete === 'true' ? true : false,
      },
    });

    const total = await prisma.todo.count({
      where: {
        isComplete: isComplete === 'true' ? true : false,
      },
    });

    responseJson({
      success: true,
      res,
      status: 200,
      data: todos,
      meta: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      },
    });
  } catch (err) {
    console.error(err);
    responseJson({
      success: false,
      res,
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

// GET /api/todos/:id
export const getTodoById = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const id = req.params.id;

  try {
    const todo = await prisma.todo.findUnique({ where: { userId, id } });

    if (!todo)
      return responseJson({
        success: false,
        res,
        status: 404,
        message: 'Todo Not Found',
      });

    responseJson({
      success: true,
      res,
      status: 200,
      data: todo,
    });
  } catch (err) {
    console.error(err);
    responseJson({
      success: false,
      res,
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

// POST /api/todos
export const createTodo = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name || !description)
    return responseJson({
      success: false,
      res,
      status: 400,
      message: 'Name and Description are required',
    });

  try {
    const lastTodo = await prisma.todo.findFirst({
      orderBy: { position: 'desc' },
    });
    const position = lastTodo ? lastTodo.position + 1 : 1;
    const userId = (req as any).user.id;

    const newTodo = await prisma.todo.create({
      data: { name, description, isComplete: false, position, userId },
    });

    responseJson({
      success: true,
      res,
      status: 201,
      data: newTodo,
      message: 'Todo created successfully',
    });
  } catch (err) {
    console.error(err);
    responseJson({
      success: false,
      res,
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

// PUT /api/todos/:id
export const updateTodo = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const id = req.params.id;
  const { name, description, isComplete } = req.body;

  try {
    const updatedTodo = await prisma.todo.update({
      where: { userId, id },
      data: { name, description, isComplete },
    });

    responseJson({
      success: true,
      res,
      status: 200,
      data: updatedTodo,
      message: 'Todo updated successfully',
    });
  } catch (err) {
    console.error(err);
    responseJson({
      success: false,
      res,
      status: 404,
      message: 'Todo Not Found',
    });
  }
};

// DELETE /api/todos/:id
export const deleteTodo = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const id = req.params.id;

  try {
    await prisma.todo.delete({ where: { userId, id } });

    responseJson({
      success: true,
      res,
      status: 204,
      message: 'Todo deleted successfully',
    });
  } catch (err) {
    console.error(err);
    responseJson({
      success: false,
      res,
      status: 404,
      message: 'Todo Not Found',
    });
  }
};
