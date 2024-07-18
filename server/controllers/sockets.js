const User = require("../models/user");
const Message = require("../models/message");

const connectedUser = async (uid) => {
  const user = await User.findById(uid);
  user.online = true;
  await user.save();
  return user;
};

const disconnectedUser = async (uid) => {
  const user = await User.findById(uid);
  user.online = false;
  await user.save();
  return user;
};

const getUsers = async () => {
  // Get all users and sort by online
  const users = await User.find().sort({ online: -1 });
  return users;
};

const saveMessage = async (payload) => {
  try {
    const message = new Message(payload);
    await message.save();
    return message;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  connectedUser,
  disconnectedUser,
  getUsers,
  saveMessage,
};
