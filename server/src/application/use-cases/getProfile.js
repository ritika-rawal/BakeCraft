const userRepository = require('../../infrastructure/repositories/userRepository');

exports.getProfile = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found.');
  return { name: user.name, email: user.email, role: user.role };
};