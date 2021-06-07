const router = require('express').Router();

const validator = require('validator');
const { celebrate, Joi, CelebrateError } = require('celebrate');

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(300),
    director: Joi.string().required().min(1).max(300),
    duration: Joi.number().required(),
    year: Joi.string().required().min(1).max(300),
    description: Joi.string().required().min(1).max(3000),
    image: Joi.string().required().custom((url) => {
      if (!validator.isURL(url)) {
        throw new CelebrateError('Неверный URL');
      }
      return url;
    }),
    trailer: Joi.string().required().custom((url) => {
      if (!validator.isURL(url)) {
        throw new CelebrateError('Неверный URL');
      }
      return url;
    }),
    thumbnail: Joi.string().required().custom((url) => {
      if (!validator.isURL(url)) {
        throw new CelebrateError('Неверный URL');
      }
      return url;
    }),
    owner: Joi.string().alphanum().length(24).hex(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(1).max(300),
    nameEN: Joi.string().required().min(1).max(300)
  })
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string()
  })
});

const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovieById);

module.exports = router;
