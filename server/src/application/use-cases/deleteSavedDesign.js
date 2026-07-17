const savedDesignRepository = require('../../infrastructure/repositories/savedDesignRepository');

exports.deleteSavedDesign = async ({ designId, userId }) => {
  const design = await savedDesignRepository.findById(designId);
  if (!design) {
    throw new Error('Design not found.');
  }
  if (design.user.toString() !== userId) {
    throw new Error('You can only delete your own designs.');
  }
  await savedDesignRepository.deleteById(designId);
};