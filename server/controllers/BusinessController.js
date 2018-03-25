import business from '../data/business';
import review from '../data/review';
import models from '../models';

const { Business } = models;

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
  static createBusiness(req, res) {
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
      .findOne({ where: { businessName } })
      .then((foundBusiness) => {
        if (foundBusiness) {
          return res.status(403).json({
            message: 'A business with such name already exist'
          });
        }
        return Business
          .create({
            businessName,
            businessAddress,
            businessCategory,
            businessEmail,
            businessDescription,
            businessPhone,
            businessWebsite,
            userId
          });
      })
      .then((newBusiness) => {
        if (newBusiness) {
          return res.status(201).json({
            message: 'business has been added succesfully',
            newBusiness
          });
        }
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
  static getBusiness(req, res) {
    const { businessId } = req.params;
    Business
      .findById(businessId)
      .then((foundBusiness) => {
        if (!foundBusiness) {
          return res.status(404).json({
            message: 'Business not found'
          });
        }
        return res.status(200).json({
          message: 'Business retrived succesfully',
          foundBusiness
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
  static getAllBusiness(req, res) {
    const { location, category } = req.params;
    if (location || category) {
      Business.findAll({
        where: {
          $or: [
            {
              businessAddress: {
                $ilike: `%${location}'%`
              },
              businessCategory: category
            }
          ]
        }
      })
        .then((foundBusiness) => {
          if (!foundBusiness) {
            return res.status(404).json({
              message: 'There are no businesses found in this location'
            });
          }
          return res.status(200).json({
            message: 'Businesses has been retrived successfully',
            foundBusiness
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
                $ilike: `%${location}'%`
              },
              businessCategory: category
            }
          ]
        }
      })
        .then((foundBusiness) => {
          if (!foundBusiness) {
            return res.status(404).json({
              message: 'There are no businesses found in this location'
            });
          }
          return res.status(200).json({
            message: 'Businesses has been retrived successfully',
            foundBusiness
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
        if (!allBusiness) {
          return res.status(404).json({
            message: 'No business has been added to the database'
          });
        }
        return res.status(200).json({
          message: 'All businesses has been retrived succesfully'
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
  static updateBusiness(req, res) {
    const { businessId } = req.params.business;
    const {
      businessName, businessEmail, businessPhone, businessDescription,
      businessCategory, businessWebsite, businessAddress
    } = req.body;
    business.forEach((profile) => {
      if (profile.id === parseInt(businessId, 10)) {
        profile.businessName = businessName || profile.businessName;
        profile.businessEmail = businessEmail || profile.businessEmail;
        profile.businessPhone = businessPhone || profile.businessPhone;
        profile.businessCategory = businessCategory || profile.businessCategory;
        profile.businessDescription = businessDescription || profile.businessDescription;
        profile.businessWebsite = businessWebsite || profile.businessWebsite;
        profile.businessAddress = businessAddress || profile.businessAddress;
        return res.status(200).json({ business: 'has been updated' });
      }
    });
    return res.status(404).json({ business: 'not found' });
  }
  /**
   * Delete a business
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   */
  static deleteBusiness(req, res) {
    const { businessId } = req.params;
    business.forEach((profile, index) => {
      if (profile.id === parseInt(businessId, 10)) {
        business.splice(index, 1);
        return res.status(200).json({ business: 'has been deleted' });
      }
    });
    return res.status(404).json({ business: 'cannot delete a business that  does not exist' });
  }
  /**
   * Add review to business
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   */
  static createReview(req, res) {
    const { businessId } = req.params;
    const {
      id, reviewTitle, reviewname, reviewDescription, reviewDate
    } = req.body;
    review.push({
      id, businessId, reviewTitle, reviewname, reviewDescription, reviewDate
    });
    return res.status(200).json({ review: 'has been added' });
  }
  /**
   * Retrieve reviews for a business
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   */
  static getReviews(req, res) {
    const { businessId } = req.params;
    const businessReviews = review
      .filter(reviews => parseInt(businessId, 10) === reviews.businessId);
    if (businessReviews.length > 0) return res.status(200).json({ businessReviews });
    return res.status(404).json({ business: 'there are no reviews for this business' });
  }
}
