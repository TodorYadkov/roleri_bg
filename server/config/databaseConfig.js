import { connect } from "mongoose";

const databaseConfig = async (config) => {
  try {
    await connect(config.connectionString);
    console.log("Database successfully connected");
  } catch (error) {
    console.error("Error initialize database");
    console.error(error.message);
    process.exit(1);
  }
};

export default databaseConfig;
