const savedDesignRepository = require('../../infrastructure/repositories/savedDesignRepository');

exports.getMySavedDesigns = async (userId) => {
  return savedDesignRepository.findByUser(userId);
};