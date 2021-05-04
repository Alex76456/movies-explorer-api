const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true,
  },
  director: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true,
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/g.test(v);
      },
      message: 'Ссылка неверна',
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator(v) {
        return /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/g.test(v);
      },
      message: 'Ссылка неверна',
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator(v) {
        return /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/g.test(v);
      },
      message: 'Ссылка неверна',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true,
  },
  nameEN: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', movieSchema);
