const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  conversation: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    const user = ret;
    delete user.password;
    return user;
  },
});

UserSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return err;

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return err;

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

UserSchema.statics.authenticate = function (userName, password, cb) {
  this.findOne({ userName }, (err, user) => {
    if (err) return cb(err);

    if (!user) return cb({ error: new Error('user not found') });

    user.comparePassword(password, (err, isMatch) => {
      if (err) return cb(err);

      if (isMatch) {
        return cb(null, user);
      }
      return cb({ error: 'invalid password' });
    });
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
