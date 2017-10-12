const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  conversation: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
