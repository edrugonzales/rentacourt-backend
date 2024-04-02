const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collectionName = "users";
const crypto = require("crypto");
const uuid = require("uuid").v1;
const data = {
  Name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  hashed_password: {
    type: String,
    default: null,
  },
  salt: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
};
const userSchema = new Schema(data, { timestamps: true });
userSchema
  .virtual("password") // Here 'password' is now a property on User documents.
  .set(function (pass) {
    this._password = pass;
    this.salt = uuid();
    this.hashed_password = this.encryptPassword(pass);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email , isArchived: false }).lean().exec();
  if (!user) return false;
  let encryptPassword = crypto
    .createHmac("sha1", user.salt)
    .update(password)
    .digest("hex");

  console.log(encryptPassword, user.hashed_password)

  if (encryptPassword !== user.hashed_password) return false;


  return user;
};

module.exports = mongoose.model("User", userSchema, collectionName);
