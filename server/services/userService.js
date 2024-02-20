import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import base64url from "base64url";

import { UserParent } from "../models/UserParent.js";
import { BlackListToken } from "../models/BlackListToken.js";

import { userRole } from "../environments/constants.js";
import { generateUserToken, signJwtToken } from "../util/signJwtToken.js";
import { passwordResetTemplate } from "../util/passwordResetTemplate.js";
import verifyJwtToken from "../util/verifyJwtToken.js";

// Register
const userRegister = async ({
  firstName,
  lastName,
  email,
  phone,
  role,
  password,
}) => {
  let currentUserRole = role || userRole.user;

  // Check if the user has already exist
  const userExistenceCheck = await UserParent.aggregate([
    {
      $facet: {
        count: [{ $count: "total" }],
        user: [{ $match: { email: email } }],
      },
    },
    {
      $project: {
        total: { $arrayElemAt: ["$count.total", 0] },
        user: { $arrayElemAt: ["$user", 0] },
      },
    },
  ]);

  const isFirstUserInDB = userExistenceCheck[0].total ? false : true; // If total is undefined isFirstUserInDB - true otherwise is false
  const isUserExist = userExistenceCheck[0].user ? true : false; // If user exists isUserExist is true otherwise is false

  if (isFirstUserInDB) {
    // No users exist, register the first user with admin role
    currentUserRole = userRole.admin;
  } else if (isUserExist) {
    // User already exists
    throw new Error("Email is already taken");
  }

  // Hash password
  const roundsBcrypt = Number(process.env.ROUNDS_BCRYPT);
  const hashedPassword = await bcrypt.hash(password, roundsBcrypt);

  // Create user
  const user = await UserParent.create({
    firstName,
    lastName,
    email,
    phone,
    role: currentUserRole,
    password: hashedPassword,
  });

  // Create token
  const userToken = await generateUserToken(user);

  return {
    userToken,
    cookieOptions: cookieOptions(),
    user: createUserDetailsObject(user),
  };
};

// Login
const userLogin = async ({ email, password }) => {
  // Check if the user with this email exists
  const user = await UserParent.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Validate password
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid email or password");
  }

  // Create token
  const userToken = await generateUserToken(user);

  return {
    userToken,
    cookieOptions: cookieOptions(),
    user: createUserDetailsObject(user),
  };
};

// Logout
const userLogout = async (userToken) => {
  await BlackListToken.create({ token: userToken });

  return { message: "Successful logout" };
};

// Create reset link
async function createResetLink({ email, origin }) {
  // Check if the user with this email exists
  const user = await UserParent.findOne({ email });
  if (!user) {
    throw new Error("Invalid email");
  }

  // Create temporary JWT token
  const temporaryToken = await signJwtToken(
    { _id: user._id },
    { expiresIn: "10m" }
  );
  // Encode JWT token to be used in url
  const encodedToken = base64url(temporaryToken);
  // Create URL used on front-end to reset password
  const resetLink = `${origin}/reset-password/${encodedToken}`;

  // Send an email with the reset link
  const transporter = nodemailer.createTransport({
    // Configure email provider
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });
  // Add a reset template to be sent by email
  const htmlTemplate = passwordResetTemplate(resetLink);

  await transporter.sendMail({
    from: `"Училище за Кънки Vertigo", ${process.env.GMAIL_USER}`,
    to: user.email,
    subject: "DO NOT REPLY: roleri.bg - Password Reset",
    text: "To reset your password, please follow the link. The link is active for 10 minutes.",
    html: htmlTemplate,
  });

  return { resetLink };
}

// Reset password
async function resetUserPassword({ password, resetToken }) {
  const decodedToken = base64url.decode(resetToken);
  const userDetails = verifyJwtToken(decodedToken);

  // Check if the current token is already used
  const isTokenUsed = await BlackListToken.findOne({ token: decodedToken });
  if (isTokenUsed) {
    throw new Error("Reset link is already used");
  }

  // Add token to black list to be used only once
  await BlackListToken.create({ token: decodedToken });

  const user = await UserParent.findOne({ _id: userDetails._id });
  if (!user) {
    throw new Error("User does not exist");
  }

  // Hash password
  const roundsBcrypt = Number(process.env.ROUNDS_BCRYPT);
  const hashedPassword = await bcrypt.hash(password, roundsBcrypt);

  user.password = hashedPassword;
  await user.save();

  // Create token
  const userToken = await generateUserToken(user);

  return {
    userToken,
    cookieOptions: cookieOptions(),
    user: createUserDetailsObject(user),
  };
}

// Get one user
const getUserById = async (userId) => UserParent.findById(userId).select('-password -__v');

// Helper functions

// Data to return to front-end
function createUserDetailsObject(user) {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    phone: user.phone,
  };
}

// Use different cookie options for different environment
function cookieOptions() {
  return process.env.NODE_ENV === "production"
    ? {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: calculateExpirePeriodCookieInDay(),
    }
    : {
      httpOnly: true,
      sameSite: "lax",
      maxAge: calculateExpirePeriodCookieInDay(),
    };
}

// Calculate the cookie expiration period
function calculateExpirePeriodCookieInDay(day = 30) {
  const expirePeriodCookie = Number(day) * 24 * 60 * 60 * 1000; // days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  return expirePeriodCookie;
}

export {
  userRegister,
  userLogin,
  userLogout,
  createResetLink,
  resetUserPassword,
  getUserById,
};
