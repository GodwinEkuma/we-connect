import business from '../data/business';
import review from '../data/review';
import findBusiness from '../helpers/findBusiness';

/**
 * A class that mannipulates all the business routes
 */
export default class Business {
  /**
   * Add a new business
   * @param {*} req
   * @param {*} res
   * @returns {json} response
   */
  static createBusiness(req, res) {
    const { id } = req.body;
    if (findBusiness(id)) {
      return res.status(403).json({ business: 'already exist' });
    }
    business.push(req.body);
    return res.status(200).json({ business: 'has been created' });
  }
  /**
   * Retrieve a  business
   * @param {*} req
   * @param {*} res
   * @returns {json} response
   */
  static getBusiness(req, res) {
    const { businessId } = req.params;
    const foundBusiness = findBusiness(parseInt(businessId, 10));
    if (foundBusiness) {
      return res.status(200).json(foundBusiness);
    }
    return res.status(404).json({ business: 'not found' });
  }
  /**
   * Retrive all businesses
   * @param {*} req
   * @param {*} res
   * @returns {json} response of all businesses
   */
  static getAllBusiness(req, res) {
    if (business.length >= 1) return res.status(200).json({ business });
    return res.status(404).json({ business: 'No business has been added to database' });
  }
  /**
   * update the details of a  business
   * @param {*} req
   * @param {*} res
   * @returns {json} response
   */
  static updateBusiness(req, res) {
    const { businessId } = req.params;
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
   * @param {*} req
   * @param {*} res
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
   * @param {*} req
   * @param {*} res
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
   * @param {*} req
   * @param {*} res
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
