const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const challengesRouter = require('./routes/challenges');
const workoutsRouter = require('./routes/workouts');
const journalsRouter = require('./routes/journals');
const adminsRouter = require('./routes/admins');
const challengesRouter = require('./routes/challenges');
const usersRouter = require('./routes/users');
const achievementsRouter = require('./routes/achievements');
const gardensRouter = require('./routes/gardens');

app.use('/challenges', challengesRouter);
app.use('/workouts', workoutsRouter);
app.use('/journals', journalsRouter);
app.use('/admins', adminsRouter);
app.use('/challenges', challengesRouter);
app.use('/users', usersRouter)
app.use('/achievements', achievementsRouter)
app.use('/gardens', gardensRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
