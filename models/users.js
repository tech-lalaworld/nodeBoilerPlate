const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  info: {
    type: String
  },
  updateAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (next) {
  let data = this;
  data.info = data.info.toUpper();
  next();
});

UserSchema.post('save', function() {
  let data = this;
  data.updatedAt = new Date();
});

module.exports = mongoose.model('dummyInfo', UserSchema);
