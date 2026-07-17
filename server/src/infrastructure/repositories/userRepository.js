const UserModel = require('../database/userSchema');

exports.findByEmail = (email) => UserModel.findOne({ email });
exports.create = (userData) => UserModel.create(userData);
exports.findById = (id) => UserModel.findById(id);
exports.updateById = (id, updates) => UserModel.findByIdAndUpdate(id, updates, { new: true });