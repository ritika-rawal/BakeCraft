const { registerUser } = require('../../application/use-cases/registerUser');
const { loginUser } = require('../../application/use-cases/loginUser');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await registerUser({ name, email, password, role });
    res.status(201).json({
      message: 'Account created successfully.',
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const { getProfile } = require('../../application/use-cases/getProfile');
const { updateProfile } = require('../../application/use-cases/updateProfile');
const { changePassword } = require('../../application/use-cases/changePassword');

exports.profile = async (req, res) => {
  try {
    const user = await getProfile(req.user.userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await updateProfile(req.user.userId, { name, email });
    res.status(200).json({ message: 'Profile updated.', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await changePassword(req.user.userId, { currentPassword, newPassword });
    res.status(200).json({ message: 'Password updated.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};