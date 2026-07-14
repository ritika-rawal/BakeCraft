const pricingRepository = require('../../infrastructure/repositories/pricingRepository');

exports.getPricing = async () => {
  return pricingRepository.getConfig();
};