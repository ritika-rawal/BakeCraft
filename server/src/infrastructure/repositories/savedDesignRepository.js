const SavedDesignModel = require('../database/savedDesignSchema');

exports.create = (data) => SavedDesignModel.create(data);
exports.findByUser = (userId) => SavedDesignModel.find({ user: userId }).sort({ createdAt: -1 });
exports.findById = (id) => SavedDesignModel.findById(id);
exports.deleteById = (id) => SavedDesignModel.findByIdAndDelete(id);