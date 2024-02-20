import jwt from "jsonwebtoken";

// Sign JWT Token
const signJwtToken = async (payload, options) => {
  const jwtSecret = process.env.JWT_SECRET;

  try {
    const token = await new Promise((resolve, reject) => {
      jwt.sign(payload, jwtSecret, options, (err, signedToken) => {
        if (err) {
          reject(new Error("The token could not be signed"));
        } else {
          resolve(signedToken);
        }
      });
    });

    return token;
  } catch (err) {
    console.log(err);
    throw new Error("An error occurred while generating the token");
  }
};

// Generating user token
const generateUserToken = async (user) => {
  //  JWT sign options
  const options = { expiresIn: "30d" };

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const signedToken = await signJwtToken(payload, options);

  return signedToken;
};

export { generateUserToken, signJwtToken };
