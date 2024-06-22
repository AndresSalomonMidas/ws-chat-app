const { response } = require("express");
const Message = require("../models/message");

const getMessages = async (req, res = response) => {
  const myId = req.uid;
  const from = req.params.from;

  // Get last 30 messages from 'from' to 'myId' or 'myId' to 'from'
  const lastMessagesFromTo = await Message.find({
    $or: [
      { from: myId, to: from },
      { from: from, to: myId },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);

  res.json({
    ok: true,
    messages: lastMessagesFromTo,
  });
};

module.exports = {
  getMessages,
};
