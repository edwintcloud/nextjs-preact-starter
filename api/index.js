const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./models/user');
const dbURI = `${process.env.MONGODB_URL}/${process.env.MONGODB_DB_NAME}`;
const dbOptions = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  useCreateIndex: true,
};

// setup express to use json
app.use(express.json());

// connect to db
mongoose.connect(dbURI, dbOptions);

// index route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to my API 🎉',
  });
});

// create a user route
app.post('/api/users/create', async (req, res) => {
  try {
    const newUser = await user.create(req.body);
    res.json({
      status: 200,
      result: newUser,
    });
  } catch (err) {
    res.json({
      status: 400,
      result: err.message,
    });
  }
});

app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    error: 'not found',
    route: req.originalUrl,
  });
});

// start server
app.listen();
