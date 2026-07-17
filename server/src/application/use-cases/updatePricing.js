const pricingRepository = require('../../infrastructure/repositories/pricingRepository');

exports.updatePricing = async (updates) => {
  return pricingRepository.updateConfig(updates);
};