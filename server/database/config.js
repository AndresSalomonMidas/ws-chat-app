const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const DB_CNN_STRING = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@freecluster.3x3l1df.mongodb.net/${process.env.DB_NAME}`;
    await mongoose.connect(DB_CNN_STRING);

    console.log("Database online");
  } catch (error) {
    console.error(error);
    throw new Error("Error in database config");
  }
};

module.exports = {
  dbConnection,
};
