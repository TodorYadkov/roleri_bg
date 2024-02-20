import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: process.env.PORT || 3000,
    connectionString: "mongodb://127.0.0.1:27017/RoleriBG",
    origin: ["http://localhost:5173"],
  },
  production: {
    port: process.env.PORT || 3000,
    connectionString: process.env.DB_URL_CREDENTIALS,
    origin: ["https://roleri-bg-web-app.vercel.app/"], // TODO: add deployed client origin here to only accept request from there, Remove the asterisk
  },
};

const environmentConfig = () => config[env];

export default environmentConfig;
