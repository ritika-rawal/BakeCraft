const Product = require('../../infrastructure/database/productSchema');

exports.publicProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate('baker', 'name')
      .sort({ createdAt: -1 })
      .limit(24);

    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.myProducts = async (req, res) => {
  try {
    const products = await Product.find({ baker: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, description, imageData } = req.body;

    if (!name || !category || price === undefined || !imageData) {
      return res.status(400).json({ error: 'Name, category, price, and image are required.' });
    }

    if (!String(imageData).startsWith('data:image/')) {
      return res.status(400).json({ error: 'Please upload a valid image file.' });
    }

    const product = await Product.create({
      baker: req.user.userId,
      name,
      category,
      price: Number(price),
      description,
      imageData,
    });

    res.status(201).json({ message: 'Cake added to marketplace.', product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
