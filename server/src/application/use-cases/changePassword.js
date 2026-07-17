const bcrypt = require('bcryptjs');
const userRepository = require('../../infrastructure/repositories/userRepository');

exports.changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found.');

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error('Current password is incorrect.');

  if (newPassword.length < 6) {
    throw new Error('New password must be at least 6 characters.');
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await userRepository.updateById(userId, { password: hashed });
};