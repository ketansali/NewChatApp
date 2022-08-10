
const { sendMessage, allMessages } = require("../controller/Message.controller");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/message/sendMessage",protect, sendMessage);
router.get("/message/allMessages/:chatId",protect, allMessages);


module.exports = router;
