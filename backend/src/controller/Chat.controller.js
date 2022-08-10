const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const asyncHandler = require("express-async-handler");
//@description     Create or fetch One to One Chat
//@access          Protected
exports.accessChat = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.status(404);
      throw new Error("userId param Not sent with request");
    }
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    if (isChat.length > 0) {
      res.json(isChat[0]);
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
      try {
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findById(createdChat._id).populate(
          "users",
          "-password"
        );
        res.status(201).json(fullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error);
      }
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@description     Fetch all chats for a user
//@access          Protected

exports.fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@description     Create New Group Chat
//@access          Protected

exports.createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.name && !req.body.users) {
    res.status(400);
    throw new Error("Please fill all the fileds");
  }
  let users = JSON.parse(req.body.users);
  if (users.length < 2) {
    res.status(400);
    throw new Error("more then 2 user required to from group chat");
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Rename Group
// @access  Protected

exports.renameGroup = asyncHandler(async (req, res) => {
  const { chatId, name } = req.body;

  try {
    const updatedchat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: name,
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedchat) {
      res.status(400);
      throw new Error("Chat Not Updated");
    }
    return res.status(200).json(updatedchat);
  } catch (err) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Add user to Group
// @access  Protected
exports.addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  try {
    const groupData = await Chat.findById(chatId).populate("users");
    const user = groupData?.users.find(
      (u) => u._id.toString() === userId.toString()
    );
    if(user){
        res.status(400)
        throw new Error('User Alredy Added in Group')
    }
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          users: userId,
        },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      res.status(400);
      throw new Error("User Not Added");
    }
    return res.status(200).json(added);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Remove user from Group
// @access  Protected

exports.removeFromGroup = asyncHandler(async(req,res)=>{
    const { chatId, userId } = req.body;
    try {
        const removed = await Chat.findByIdAndUpdate(
          chatId,
          {
            $pull: {
              users: userId,
            },
          },
          { new: true }
        )
          .populate("users", "-password")
          .populate("groupAdmin", "-password");
    
        if (!removed) {
          res.status(400);
          throw new Error("User Not Removed");
        }
        return res.status(200).json(removed);
      } catch (error) {
        res.status(400);
        throw new Error(error);
      }
})
