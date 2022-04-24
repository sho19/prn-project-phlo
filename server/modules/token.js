
const config  = require("../config")

module.exports.generateToken = function (emailId,userId,firstName,lastName) { 
  let jwt = require('jsonwebtoken');
  var token = jwt.sign({ data:{emailId:emailId,userId:userId,firstName:firstName,lastName:lastName} }, _config.JWT_SECRET_KEY, { expiresIn: "1825d" });
  return token
};