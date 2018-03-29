import models from '../models';

const { Business, Review } = models;

/**
 * A class that mannipulates all the business routes
 */
export default class BusinessController {
  /**
   * Add a new business
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   */
  static create(req, res) {
    const {
      businessName,
      businessAddress,
      businessCategory,
      businessEmail,
      businessDescription,
      businessPhone,
      businessWebsite
    } = req.body;
    const { userId } = req;
    Business
      .findOrCreate({
        where: { businessName },
        defaults: {
          businessName,
          businessAddress,
          businessCategory,
          businessEmail,
          businessDescription,
          businessPhone,
          businessWebsite,
          userId
        }
      })
      .spread((business, created) => {
        if (created === false) {
          return res.status(409).json({
            message: 'Business with such name already exist'
          });
        }
        return res.status(201).json({
          message: 'Business creaated succesfully',
          data: business
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: 'an error ocurred',
          error: error.name
        });
      });
  }
  /**
   * Retrieve a  business
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   */
  static get(req, res) {
    const { businessId } = req.params;
    Business
      .findById(businessId)
      .then((foundBusiness) => {
        if (foundBusiness === null) {
          return res.status(404).json({
            message: 'Business not found'
          });
        }
        return res.status(200).json({
          message: 'Business retrived succesfully',
          data: foundBusiness
        });
      })
      .catch((error) => {
        if (error) {
          return res.status(500).json({
            message: 'An error occured',
            error: error.name
          });
        }
      });
  }
  /**
   * Retrive all businesses
   * @param {object} req
   * @param {object} res
   * @returns {json} response of all businesses
   */
  static getAll(req, res) {
    const { location, category } = req.params;
    if (location || category) {
      return Business.findAll({
        where: {
          $or: [
            {
              businessAddress: {
                $ilike: `%${location}%`
              },
              businessCategory: category
            }
          ]
        }
      })
        .then((foundBusiness) => {
          if (foundBusiness.length === 0) {
            return res.status(404).json({
              message: 'There are no businesses found in this location'
            });
          }
          return res.status(200).json({
            message: 'Businesses has been retrived successfully',
            data: foundBusiness
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: 'An error has occured',
            error: error.name
          });
        });
    }
    if (location && category) {
      Business.findAll({
        where: {
          $and: [
            {
              businessAddress: {
                $ilike: `%${location}%`
              },
              businessCategory: category
            }
          ]
        }
      })
        .then((foundBusiness) => {
          if (foundBusiness.length === 0) {
            return res.status(404).json({
              message: 'There are no businesses found in this location'
            });
          }
          return res.status(200).json({
            message: 'Businesses has been retrived successfully',
            data: foundBusiness
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: 'An error has occured',
            error: error.name
          });
        });
    }
    return Business
      .findAll()
      .then((allBusiness) => {
        if (allBusiness.length === 0) {
          return res.status(404).json({
            message: 'No business has been added to the database'
          });
        }
        return res.status(200).json({
          message: 'All businesses has been retrived succesfully',
          data: allBusiness
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: 'An error has occured',
          error: error.name
        });
      });
  }
  /**
   * update the details of a  business
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   */
  static update(req, res) {
    const { businessId } = req.params;
    const {
      businessName, businessEmail, businessPhone, businessDescription,
      businessCategory, businessWebsite, businessLocation
    } = req.body;
    return Business
      .findById(businessId)
      .then((foundBusiness) => {
        if (foundBusiness === null) {
          return res.status(404).json({
            message: 'Business not found'
          });
        }
        return foundBusiness
          .update({
            businessName,
            businessEmail,
            businessPhone,
            businessCategory,
            businessDescription,
            businessWebsite,
            businessLocation,
          })
          .then((updatedBusiness) => {
            if (updatedBusiness) {
              return res.status(200).json({
                message: 'Business has been updated succesfully',
                business: updatedBusiness
              });
            }
          })
          .catch((error) => {
            res.status(500).json({
              message: 'An error occured',
              error: error.name
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          message: 'An error occured',
          error: error.name
        });
      });
  }
  /**
   * Delete a business
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   */
  static delete(req, res) {
    const { businessId } = req.params;
    const { userId } = req;
    return Business
      .findById(businessId)
      .then((foundBusiness) => {
        if (foundBusiness === null) {
          return res.status(404).json({
            message: 'You cannot delete a business that does not exist'
          });
        }
        if (userId !== foundBusiness.userId) {
          return res.status(401).json({
            message: 'You cannot delete a business that does not belong to you'
          });
        }
        return foundBusiness
          .destroy()
          .then(() => {
            res.status(200).json({
              message: 'Business deleted successfully'
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          message: 'An error occured',
          error: error.name
        });
      });
  }
  /**
   * Add review to business
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   */
  static createReview(req, res) {
    const { businessId } = req.params;
    const { userId } = req;
    const {
      reviewTitle, reviewName, reviewDescription
    } = req.body;
    Business.findById(businessId)
      .then((foundBusiness) => {
        if (foundBusiness === null) {
          return res.status(404).json({
            message: 'You cannot review a business that does not exist'
          });
        }
        return Review
          .create({
            reviewTitle,
            reviewName,
            reviewDescription,
            userId,
            businessId
          })
          .then((newReview) => {
            if (newReview) {
              return res.status(201).json({
                message: 'A review has been added successfully',
                review: newReview
              });
            }
          })
          .catch((error) => {
            res.status(500).json({
              message: 'An error occured',
              error: error.name
            });
          });
      });
  }
  /**
   * Retrieve reviews for a business
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   */
  static getReviews(req, res) {
    const { businessId } = req.params;
    Business.findById(businessId)
      .then((foundBusiness) => {
        if (foundBusiness) {
          return Review
            .findAll({
              where: { businessId: foundBusiness.id }
            })
            .then((foundReviews) => {
              if (foundReviews.length === 0) {
                return res.status(404).json({
                  message: 'There are no reviews for this business'
                });
              }
              return res.status(200).json({
                message: 'Reviews has been retrieved successfully',
                data: foundReviews
              });
            })
            .catch((error) => {
              res.status(500).json({
                message: 'An error occured',
                error: error.name
              });
            });
        }
      });
  }
}
