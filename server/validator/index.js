import Joi from 'joi';

const validator = {
  profileValidator(req, res, next) {
    const result = Joi.validate(req.body, this.profileSchema, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        message: result.error.annotate()
      });
    }
    return next();
  },
  signUpValidator(req, res, next) {
    const result = Joi.validate(req.body, this.signUpSchema, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        message: result.error.annotate()
      });
    }
    return next();
  },
  signInValidator(req, res, next) {
    const result = Joi.validate(req.body, this.signInSchema, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        message: result.error.annotate()
      });
    }
    return next();
  },
  reviewValidator(req, res, next) {
    const result = Joi.validate(req.body, this.reviewSchema, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        message: result.error.annotate()
      });
    }
    return next();
  },
  profileSchema: Joi.object().keys({
    businessName: Joi.string().required(),
    businessPhone: Joi.string().max(11),
    businessEmail: Joi.string().email(),
    businessCategory: Joi.string().required(),
    businessWebsite: Joi.string(),
    businessDescription: Joi.string(),
    businessAddress: Joi.string().required()
  }),
  signUpSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
  }),
  signInSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  reviewSchema: Joi.object().keys({
    reviewTitle: Joi.string().required(),
    reviewDescription: Joi.string().required(),
    reviewName: Joi.string().required()
  })
};

export const profileValidator = validator.profileValidator.bind(validator);
export const signUpValidator = validator.signUpValidator.bind(validator);
export const signInValidator = validator.signInValidator.bind(validator);
export const reviewValidator = validator.reviewValidator.bind(validator);

