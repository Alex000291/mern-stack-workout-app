require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutsRouter = require('./routes/workouts');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/workouts',workoutsRouter)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log('connected to db & Server is running on port', process.env.PORT);
  });
})
.catch((err) => {
  console.log(err)
})

