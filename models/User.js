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

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.passwordHash, (err, isMatch) => {
    if (err) return cb(err, false);

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
      return cb(new Error('invalid password'));
    });
  });
};

UserSchema.statics.createUser = function (userName, password, cb) {

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return cb(err);

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return err;

      const user = new User({ userName, passwordHash: hash });

      user.save((err) => {
        if (err) {
          return cb(err);
        }

        cb(null, user);
      });
    });
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
