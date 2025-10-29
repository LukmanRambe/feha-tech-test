import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import { responseJson } from '../utils/responseJson';
import bcrypt from 'bcrypt';

// GET /user
export const getUserData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullname: true,
        username: true,
        createdAt: true,
      },
    });

    if (!user)
      return responseJson({
        success: false,
        res,
        status: 404,
        message: 'User Not Found',
      });

    return responseJson({
      success: true,
      res,
      status: 200,
      data: user,
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

// PUT /user
export const updateUserData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { fullname, oldPassword, newPassword } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser)
      return responseJson({
        success: false,
        res,
        status: 404,
        message: 'User Not Found',
      });

    if (newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, existingUser.password);

      if (!isMatch) {
        return responseJson({
          success: false,
          res,
          status: 400,
          message: 'Old password incorrect',
        });
      }
    }

    const passwordStrength =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!passwordStrength.test(newPassword))
      return responseJson({
        success: false,
        res,
        status: 400,
        message:
          'Password must contain uppercase, lowercase, number, and special character',
      });

    let updatedPassword = undefined;

    if (newPassword) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      updatedPassword = hashedNewPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullname: fullname ?? existingUser.fullname,
        password: updatedPassword ?? existingUser.password,
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        username: true,
        updatedAt: true,
      },
    });

    return responseJson({
      success: true,
      res,
      status: 200,
      data: updatedUser,
      message: 'User updated successfully',
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
