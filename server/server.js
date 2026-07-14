const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/presentation/routes/authRoutes');
const orderRoutes = require('./src/presentation/routes/orderRoutes');
const pricingRoutes = require('./src/presentation/routes/pricingRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/pricing', pricingRoutes);

app.get('/', (req, res) => {
  res.send('BakeCraft API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));