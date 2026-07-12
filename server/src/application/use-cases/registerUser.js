const bcrypt = require('bcryptjs');
const userRepository = require('../../infrastructure/repositories/userRepository');

exports.registerUser = async ({ name, email, password, role }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('An account with this email already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.create({ name, email, password: hashedPassword, role });
  return user;
};