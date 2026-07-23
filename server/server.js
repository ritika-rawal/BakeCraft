const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/presentation/routes/authRoutes');
const orderRoutes = require('./src/presentation/routes/orderRoutes');
const pricingRoutes = require('./src/presentation/routes/pricingRoutes');
const messageRoutes = require('./src/presentation/routes/messageRoutes');
const savedDesignRoutes = require('./src/presentation/routes/savedDesignRoutes');
const productRoutes = require('./src/presentation/routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json({ limit: '8mb' }));

async function initDb() {
  const uri = process.env.MONGO_URI;
  if (uri) {
    try {
      await mongoose.connect(uri);
      console.log('✅ MongoDB connected');
      return;
    } catch (err) {
      console.error('❌ MongoDB connection error:', err);
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('Starting in-memory MongoDB for development...');
    try {
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      await mongoose.connect(memoryUri);
      console.log('✅ Connected to in-memory MongoDB');
    } catch (err) {
      console.error('❌ In-memory MongoDB connection error:', err);
      process.exit(1);
    }
  } else {
    console.error('No MongoDB URI and running in production — exiting.');
    process.exit(1);
  }
}

initDb();

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/saved-designs', savedDesignRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('BakeCraft API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
