const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  conversation: { type: Schema.Types.ObjectId, ref: 'Conversation' },
});


UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    const user = ret;
    delete user.passwordHash;
    return user;
  },
});

UserSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return err;

    bcrypt.hash(user.passwordHash, salt, (err, hash) => {
      if (err) return err;

      user.passwordHash = hash;
      next(err);
    });
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.passwordHash, (err, isMatch) => {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

UserSchema.statics.authenticate = function (userName, password, cb) {
  this.findOne({ userName }, (err, user) => {
    if (err) return cb(err);

    if (!user) return cb({ error: 'user not found' });

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

UserSchema.statics.createUser = function (userName, password, cb) {
  const user = new User({ userName, passwordHash: password });

  user.save((err) => {
    if (err) {
      return cb(err);
    }
    cb(null, this);
  });
};

module.exports = User;
