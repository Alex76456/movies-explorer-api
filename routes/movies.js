const router = require('express').Router();

const validator = require('validator');
const { celebrate, Joi, CelebrateError } = require('celebrate');
const auth = require('../middlewares/auth');

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(30),
    director: Joi.string().required().min(1).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(1).max(30),
    description: Joi.string().required().min(1),
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
    movieId: Joi.string().alphanum().length(24).hex(),
    nameRU: Joi.string().required().min(1).max(30),
    nameEN: Joi.string().required().min(1).max(30)
  })
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).hex()
  })
});

const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');

router.use(auth);
router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovieById);

module.exports = router;
