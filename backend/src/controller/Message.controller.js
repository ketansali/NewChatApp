const User = require('../models/userModel')
const Chat = require('../models/chatModel')
const Message = require('../models/messageModel');
const asyncHandler = require('express-async-handler');


//@description     Create New Message
//@access          Protected
exports.sendMessage = asyncHandler(async(req,res)=>{
    const { content, chatId } = req.body;
    if(!content || !chatId){
        res.status(400)
        throw new Error('Invalid data passed into request')
    }
    let newMessage = {
        sender : req.user._id,
        content : content,
        chat : chatId
    }
    try{
        let message = await Message.create(newMessage)
        message = await message.populate("sender","name pic")
        message = await message.populate("chat")
        message = await User.populate(message,{
            path : "chat.users",
            select : "name pic email"
        })
        await Chat.findByIdAndUpdate(chatId,{latestMessage:message})
        return res.status(201).json(message)
    }catch (error) {
    res.status(400);
    throw new Error(error);
  }
})

//@description     Get all Messages
//@access          Protected
exports.allMessages = asyncHandler(async(req,res)=>{
    try {
        let messages = await Message.find({ chat: req.params.chatId })
          .populate("sender", "name pic email")
          .populate("chat")
          messages =await Chat.populate(messages,{
              path:"chat.latestMessage"
          })
          
        res.json(messages);
      } catch (error) {
        res.status(400);
        throw new Error(error);
      }
})