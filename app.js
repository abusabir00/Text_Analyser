const express = require('express');
const  sequelize = require('./db/mysql');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('./config/logger');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });

module.exports = app;

