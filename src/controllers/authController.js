import { loginUser, registerUser } from '../services/authService.js';

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const loginResult = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: loginResult
    });
  } catch (error) {
    return next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Authenticated user fetched successfully',
      data: req.user
    });
  } catch (error) {
    return next(error);
  }
};
