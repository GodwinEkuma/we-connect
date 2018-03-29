import Joi from 'joi';

const validator = {
  profileValidator(req, res, next) {
    const result = Joi.validate(req.body, this.profileSchema, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        message: result.error.details
      });
    }
    return next();
  },
  signUpValidator(req, res, next) {
    const result = Joi.validate(req.body, this.signUpSchema, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        message: result.error.details
      });
    }
    return next();
  },
  signInValidator(req, res, next) {
    const result = Joi.validate(req.body, this.signInSchema, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        message: result.error.details
      });
    }
    return next();
  },
  reviewValidator(req, res, next) {
    const result = Joi.validate(req.body, this.reviewSchema, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        message: result.error.details
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
    email: Joi.string().trim().not('').email()
      .lowercase()
      .required(),
    password: Joi.string().trim().not('').required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required()
  }),
  signInSchema: Joi.object().keys({
    email: Joi.string().email()
      .lowercase()
      .required(),
    password: Joi.string().trim().not('').required()
  }),
  reviewSchema: Joi.object().keys({
    reviewTitle: Joi.string().trim().not('').required(),
    reviewDescription: Joi.string().trim().not('').required(),
    reviewName: Joi.string().trim().not('').required()
  })
};

export const profileValidator = validator.profileValidator.bind(validator);
export const signUpValidator = validator.signUpValidator.bind(validator);
export const signInValidator = validator.signInValidator.bind(validator);
export const reviewValidator = validator.reviewValidator.bind(validator);

