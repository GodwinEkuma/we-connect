import Joi from 'joi';

const validator = {
  profileValidator(req, res, next) {
    const result = Joi.validate(req.body, this.profileSchema, { abortEarly: false });
    if (result.error) return res.status(400).json(result.error);
    next();
  },
  signUpValidator(req, res, next) {
    const result = Joi.validate(req.body, this.signUpSchema, { abortEarly: false });
    if (result.error) return res.status(400).json(result.error);
    next();
  },
  signInValidator(req, res, next) {
    const result = Joi.validate(req.body, this.signInSchema, { abortEarly: false });
    if (result.error) return res.status(400).json(result.error);
    next();
  },
  reviewValidator(req, res, next) {
    const result = Joi.validate(req.body, this.reviewSchema, { abortEarly: false });
    if (result.error) return res.status(400).json(result.error);
    next();
  },
  profileSchema: Joi.object().keys({
    businessName: Joi.string().required(),
    businessPhone: Joi.number().max(11),
    businessEmail: Joi.string().email(),
    businessCategory: Joi.string().required(),
    businessWebsite: Joi.string(),
    businessDescription: Joi.string(),
    businessAddress: Joi.string().required(),
    businessLogo: Joi.string(),
    businessProfileImage: Joi.string(),
    products: [
      {
        product: Joi.string(),
        Description: Joi.string()
      },
      {
        product: Joi.string(),
        Description: Joi.string()
      },
      {
        product: Joi.string(),
        Description: Joi.string()
      },
      {
        product: Joi.string(),
        Description: Joi.string()
      }
    ]
  }),
  signUpSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    businessName: Joi.string().required(),
    businessCategory: Joi.string().required(),
    firstName: Joi.string().required(),
    lastname: Joi.string().required()
  }),
  signInSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  reviewSchema: Joi.object().keys({
    reviewTitle: Joi.string().required(),
    reviewDescription: Joi.string().required(),
    reviewname: Joi.string().required()
  })
};

export const profileValidator = validator.profileValidator.bind(validator);
export const signUpValidator = validator.signUpValidator.bind(validator);
export const signInValidator = validator.signInValidator.bind(validator);
export const reviewValidator = validator.reviewValidator.bind(validator);
