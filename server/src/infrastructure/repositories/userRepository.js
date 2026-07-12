const UserModel = require('../database/userSchema');

exports.findByEmail = (email) => UserModel.findOne({ email });
exports.create = (userData) => UserModel.create(userData);