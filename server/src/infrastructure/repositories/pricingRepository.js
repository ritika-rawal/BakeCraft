const PricingModel = require('../database/pricingSchema');

exports.getConfig = async () => {
  let config = await PricingModel.findOne();
  if (!config) {
    // Seed sensible defaults the very first time
    config = await PricingModel.create({
      basePricePerLayer: 20,
      baseFlatFee: 5,
      deliveryFee: 150,
      flavors: [
        { id: 'vanilla', label: 'Vanilla', price: 0 },
        { id: 'strawberry', label: 'Strawberry', price: 0 },
        { id: 'dark-chocolate', label: 'Dark Chocolate', price: 5 },
        { id: 'red-velvet', label: 'Red Velvet', price: 5 },
        { id: 'white-forest', label: 'White Forest', price: 8 },
        { id: 'black-forest', label: 'Black Forest', price: 8 },
      ],
      toppings: [
        { id: 'sprinkles', label: 'Sprinkles', price: 2 },
        { id: 'berries', label: 'Berries', price: 4 },
        { id: 'flowers', label: 'Flowers', price: 5 },
        { id: 'chocolate', label: 'Chocolate', price: 3 },
        { id: 'pearls', label: 'Pearls', price: 3 },
        { id: 'fruits', label: 'Fruits', price: 4 },
      ],
    });
  }
  return config;
};

exports.updateConfig = async (updates) => {
  let config = await PricingModel.findOne();
  if (!config) {
    config = await PricingModel.create(updates);
    return config;
  }
  Object.assign(config, updates);
  await config.save();
  return config;
};