const PricingModel = require('../database/pricingSchema');

exports.getConfig = async () => {
  let config = await PricingModel.findOne();
  if (!config) {
    // Seed sensible defaults the very first time
    config = await PricingModel.create({
      basePricePerLayer: 500,
      baseFlatFee: 300,
      deliveryFee: 150,
      flavors: [
        { id: 'vanilla', label: 'Vanilla', price: 0 },
        { id: 'strawberry', label: 'Strawberry', price: 0 },
        { id: 'dark-chocolate', label: 'Dark Chocolate', price: 120 },
        { id: 'red-velvet', label: 'Red Velvet', price: 120 },
        { id: 'white-forest', label: 'White Forest', price: 180 },
        { id: 'black-forest', label: 'Black Forest', price: 180 },
      ],
      toppings: [
        { id: 'sprinkles', label: 'Sprinkles', price: 60 },
        { id: 'berries', label: 'Berries', price: 120 },
        { id: 'flowers', label: 'Flowers', price: 150 },
        { id: 'chocolate', label: 'Chocolate', price: 100 },
        { id: 'pearls', label: 'Pearls', price: 90 },
        { id: 'fruits', label: 'Fruits', price: 120 },
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
