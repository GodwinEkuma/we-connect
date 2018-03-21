import business from '../data/business';

const findBusiness = (businessId) => {
  if (businessId) {
    return business.find(profile => profile.id === businessId);
  }
};

export default findBusiness;
