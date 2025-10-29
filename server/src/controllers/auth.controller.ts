import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import bcrypt from 'bcrypt';
import { responseJson } from '../utils/responseJson';
import { signJWT } from '../utils/jwt';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { fullname, username, email, password } = req.body;

    // --- Input validation ---
    if (!username || !email || !fullname || !password)
      return responseJson({
        success: false,
        res,
        status: 400,
        message: 'All fields are required',
      });

    if (
      typeof username !== 'string' ||
      username.length < 3 ||
      username.length > 30
    )
      return responseJson({
        success: false,
        res,
        status: 400,
        message: 'Username must be 3-30 characters long',
      });

    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (!usernameRegex.test(username))
      return responseJson({
        success: false,
        res,
        status: 400,
        message: 'Username can only contain letters, numbers, and underscores',
      });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return responseJson({
        success: false,
        res,
        status: 400,
        message: 'Invalid email format',
      });

    if (typeof fullname !== 'string' || fullname.trim().length < 2)
      return responseJson({
        success: false,
        res,
        status: 400,
        message: 'Name must be at least 2 characters',
      });

    if (typeof password !== 'string' || password.length < 8)
      return responseJson({
        success: false,
        res,
        status: 400,
        message: 'Password must be at least 8 characters',
      });

    const passwordStrength =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!passwordStrength.test(password))
      return responseJson({
        success: false,
        res,
        status: 400,
        message:
          'Password must contain uppercase, lowercase, number, and special character',
      });

    // --- Check user ---
    const isUserExist = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (isUserExist)
      return responseJson({
        success: false,
        res,
        status: 409,
        message: 'Email or username already exists',
      });

    // --- Password hashing ---
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullname,
        username,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    responseJson({
      success: true,
      res,
      status: 201,
      data: newUser,
      message: 'User created successfully',
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

export const signin = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password)
      return responseJson({
        success: false,
        res,
        status: 400,
        message: 'Username or Email and Password are required',
      });

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
    });

    if (!user)
      return responseJson({
        success: false,
        res,
        status: 401,
        message: 'User not found.',
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return responseJson({
        success: false,
        res,
        status: 401,
        message: 'Invalid credentials',
      });

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = signJWT(payload);

    return responseJson({
      success: true,
      res,
      status: 200,
      token,
      data: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
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
