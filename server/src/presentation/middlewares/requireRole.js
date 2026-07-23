module.exports = function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      const accountType = role === 'baker' ? 'Baker Admin' : 'customer';
      return res.status(403).json({ error: `Access denied. ${accountType} account required.` });
    }
    next();
  };
};
