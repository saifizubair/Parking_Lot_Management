const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const parkingLotRoutes = require('./routes/parkingLotRoutes');
const sequelize = require('./config/db.config');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/parking', parkingLotRoutes);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Models synchronized successfully');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to synchronize models:', err);
  });
