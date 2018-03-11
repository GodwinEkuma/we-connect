import BusinessData from '../data/business';
import ReviewData from '../data/review';

/**
 * A class that mannipulates all the business
 */
export default class Business {
/**
 * @param {int} req the request object
 * @param {int} res the response object
 */
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  /**
  * checks if a business exists and creates a new business if such business does not exist
  * @returns {init} returns error or status 200
 */
  createBusiness() {
    const findBusiness = BusinessData.find(data => this.req.body.id === data.id);
    if (findBusiness) {
      return this.res.status(400).json({ business: 'already exist' });
    }
    BusinessData.push(this.req.body);
    return this.res.status(200).json({ business: 'has been created' });
  }
  /**
  * checks if a business exists and fectchs the business
  * @returns {init} returns error or status 200
 */
  getBusiness() {
    const findBusiness = BusinessData
      .find(data => parseInt(this.req.params.businessId, 10) === data.id);
    if (findBusiness) {
      return this.res.status(200).json(findBusiness);
    }
    return this.res.status(404).json({ business: 'not found' });
  }
  /**
  * returns all businessesgod
  * @returns {init} returns error or status 200
 */
  getAllBusiness() {
    if (BusinessData.length >= 1) return this.res.status(200).json({ BusinessData });
    return this.res.json({ business: 'No business has been added to database' });
  }
  /**
  * checks if a business exists and updates the details of the business
  * @returns {init} returns error or status 200
 */
  updateBusiness() {
    for (let i = 0; i <= BusinessData.length; i += 1) {
      if (BusinessData[i].id === parseInt(this.req.params.businessId, 10)) {
        BusinessData[i] = this.req.body;
        return this.res.status(200).json({ business: 'has been updated' });
      }
    }
    return this.res.status(400).json({ business: 'not found' });
  }
  /**
  * deletes a business
  * @returns {init} returns error or status 200
 */
  deleteBusiness() {
    const findBusiness = BusinessData
      .findIndex(data => parseInt(this.req.params.businessId, 10) === data.id);
    if (findBusiness !== -1) {
      BusinessData.splice(findBusiness, 1);
      return this.res.status(200).json({ business: 'has been deleted' });
    }
    return this.res.status(404).json({ business: 'cannot delete a business that  does not exist' });
  }
  /**
  * adds a review to a business
  * @returns {init} returns  status 201
 */
  createReview() {
    const {
      id, reviewTitle, reviewname, reviewDescription, reviewDate
    } = this.req.body;
    ReviewData.push({
      id,
      businessId: this.req.params.businessId,
      reviewTitle,
      reviewname,
      reviewDescription,
      reviewDate
    });
    return this.res.status(200).json({ review: 'has been added' });
  }
  /**
  * checks if a business exists and adds a review to it
  * @returns {init} returns error or status 200
 */
  getReviews() {
    const reviews = ReviewData
      .filter(review => parseInt(this.req.params.businessId, 10) === review.businessId);
    if (reviews.length > 0) return this.res.status(200).json({ reviews });
    return this.res.status(404).json({ business: 'there are no reviews for this business' });
  }
}
