const savedDesignRepository = require('../../infrastructure/repositories/savedDesignRepository');

exports.saveDesign = async ({ userId, name, shape, layers, flavor, frosting, toppings, message, total, image, sourceId }) => {
  return savedDesignRepository.create({
    user: userId,
    name: name || 'My Cake Design',
    shape,
    layers,
    flavor,
    frosting,
    toppings,
    message,
    total,
    image,
    sourceId,
  });
};
