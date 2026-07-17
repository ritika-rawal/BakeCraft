const { getPricing } = require('../../application/use-cases/getPricing');
const { updatePricing } = require('../../application/use-cases/updatePricing');

exports.fetchPricing = async (req, res) => {
  try {
    const pricing = await getPricing();
    res.status(200).json({ pricing });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.savePricing = async (req, res) => {
  try {
    const pricing = await updatePricing(req.body);
    res.status(200).json({ message: 'Pricing updated.', pricing });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};