import { Router } from "express";

import { endpoints } from "../environments/endPoints.js";
import { isUserGuest, isUserLogged } from "../middlewares/guards.js";
import { validateLoginSchema, validateRegisterSchema, validateResetPasswordSchema } from "../util/validationSchemes.js";

import {
    createResetLink,
    getUserById,
    resetUserPassword,
    userLogin,
    userLogout,
    userRegister,
} from "../services/userService.js";

const userController = Router();

// Register
userController.post(endpoints.register, isUserGuest, async (req, res, next) => {
    try {
        const userData = req.body;

        await validateRegisterSchema.validateAsync(userData);
        const data = await userRegister(userData);

        res.cookie(process.env.COOKIE_NAME, data.userToken, data.cookieOptions)
            .status(201)
            .json(data.user);
    } catch (error) {
        next(error);
    }
});

// Login
userController.post(endpoints.login, isUserGuest, async (req, res, next) => {
    try {
        const userData = req.body;

        await validateLoginSchema.validateAsync(userData);
        const data = await userLogin(userData);

        res.cookie(process.env.COOKIE_NAME, data.userToken, data.cookieOptions)
            .status(200)
            .json(data.user);
    } catch (error) {
        next(error);
    }
});

// Logout
userController.get(endpoints.logout, isUserLogged, async (req, res, next) => {
    try {
        const userToken = req.userToken;

        const logoutMsg = await userLogout(userToken);

        res.clearCookie(process.env.COOKIE_NAME)
            .status(200)
            .json(logoutMsg);
    } catch (error) {
        next(error);
    }
});

// Forgot password
userController.post(endpoints.forgot_password, isUserGuest, async (req, res, next) => {
    try {
        const { email } = req.body;
        const origin = req.get('origin');

        await createResetLink({ email, origin });

        res.status(200).json({ message: 'Reset token sent successfully' });
    } catch (error) {
        next(error);
    }
});

// Reset password
userController.put(endpoints.reset_password, isUserGuest, async (req, res, next) => {
    try {
        const userData = req.body;

        await validateResetPasswordSchema.validateAsync(userData);
        const data = await resetUserPassword(userData);

        res.cookie(process.env.COOKIE_NAME, data.userToken, data.cookieOptions)
            .status(200)
            .json(data.user);
    } catch (error) {
        next(error);
    }
});

// Get details for one user
userController.get(endpoints.get_user, isUserLogged, async (req, res, next) => {
    try {
        const userId = req.user._id;

        const userData = await getUserById(userId);

        res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
});

export { userController };