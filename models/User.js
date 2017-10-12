const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  conversation: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
});

UserSchema.pre('save', function () {
  const user = this;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return err;

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return err;

      user.password = hash;
    });
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
