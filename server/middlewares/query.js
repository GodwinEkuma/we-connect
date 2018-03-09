import BusinessData from '../data/business';

const query = (req, res, next) => {
  const { location, category } = req.query;
  if (location && !category) {
    const findBusinesses = BusinessData
      .filter(data => data.businessAddress.toLowerCase().includes(location.toLowerCase()));
    if (findBusinesses) return res.status(200).json({ findBusinesses });
    return res.status(404).json({ business: 'there are no businesses in this location' });
  } else if (!location && category) {
    const findBusinesses = BusinessData
      .filter(data => data.businessCategory === category);
    if (findBusinesses) return res.status(200).json({ findBusinesses });
    return res.status(404).json({ business: 'there are no businesses in this location' });
  } else if (location && category) {
    const findBusinesses = BusinessData
      .filter(data => data.businessAddress.toLowerCase().includes(location.toLowerCase())
        && data.businessCategory === category);
    if (findBusinesses) return res.status(200).json({ findBusinesses });
    return res.status(404).json({ business: 'there are no businesses in this location and category' });
  }
  next();
};

export default query;
