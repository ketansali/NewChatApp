const jwt = require("jsonwebtoken");
exports.generateToken = (_id, name, email, pic) => {
  return jwt.sign(
    {
      user: { _id: _id, name: name, email: email, pic: pic },
    },
    process.env.JWT_SECRET
  );
};
