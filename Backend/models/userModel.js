const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter Valid email Address"],
  },
  password: {
    type: String,
    require: [true, "Please Enter password"],
    maxlength: [15, "password cannot Exceed 15 characters"],
    select: false,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  // console.log('onsave',this.password)
  if(!this.isModified('password')){
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

userSchema.methods.isValidPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetToken = function () {
  //generate token
  const token = crypto.randomBytes(20).toString("hex");

  //genrate hash and set resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  //set token expire time
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

  return token;
};

// const crypto = require("crypto");

// userSchema.methods.getResetToken = function () {
//   // Step 1: Generate a random token (used for the user to reset password)
//   const token = crypto.randomBytes(20).toString("hex");

//   // Step 2: Hash the token and store it in the database (more secure)
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(token)
//     .digest("hex");

//   // Step 3: Set token expiration time (30 minutes from now)
//   this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

//   // Return the plain token (this is what you send to the user via email)
//   return token;
// };


let model = mongoose.model("User", userSchema);

module.exports = model;
