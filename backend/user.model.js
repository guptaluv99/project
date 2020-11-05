const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    sparse: true,
    index: true
  },
  mobile: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  }, 
  favorites: [mongoose.Schema.Types.Mixed],
  _created: {
    type: Date,
    default: Date.now
  }
});

//custom method to generate authToken 
UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, name: this.name }, process.env.PRIVATE_KEY, { expiresIn: '1d' });
  return token;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;