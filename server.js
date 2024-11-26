// server.js
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Key = require('./models/User'); // Import the schema

const app = express();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect( MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Generate keys for a user
app.post('/generate-keys', async (req, res) => {
  try {
    const { publicKey, privateKey  } = req.body;
    console.log(req.body);

    const newKey = new Key({
      publicKey,
      privateKey,
    });

    await newKey.save();
    console.log(req.body);
    res.status(200).json({ message: 'Keys stored successfully' });
  } catch (error) {
    // res.status(500).json({ error: 'Failed to generate keys' });
    console.log(error);
  }
});

// Delete keys for a user
app.delete('/delete-keys', async (req, res) => {
  try {
    const { privateKey } = req.body;
    console.log(req.body);
    const user = await Key.findOne({ privateKey });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await Key.deleteOne({ privateKey });
    res.status(200).json({ message: 'Keys deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete keys' });
  }
});

// Fetch private key if the public key matches
app.post('/fetch-private-key', async (req, res) => {
  try {
    const { publicKey } = req.body;
    console.log(req.body);
    const user = await Key.findOne({ publicKey });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.publicKey === publicKey) {
      res.status(200).json({ privateKey: user.privateKey });
    } else {
      res.status(400).json({ error: 'Public key does not match' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch private key' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

