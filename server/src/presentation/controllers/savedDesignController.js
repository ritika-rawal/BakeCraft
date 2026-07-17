const { saveDesign } = require('../../application/use-cases/saveDesign');
const { getMySavedDesigns } = require('../../application/use-cases/getMySavedDesigns');
const { deleteSavedDesign } = require('../../application/use-cases/deleteSavedDesign');

exports.create = async (req, res) => {
  try {
    const design = await saveDesign({ userId: req.user.userId, ...req.body });
    res.status(201).json({ message: 'Design saved.', design });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const designs = await getMySavedDesigns(req.user.userId);
    res.status(200).json({ designs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await deleteSavedDesign({ designId: req.params.id, userId: req.user.userId });
    res.status(200).json({ message: 'Design deleted.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};