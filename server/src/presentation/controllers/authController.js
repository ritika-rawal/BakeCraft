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