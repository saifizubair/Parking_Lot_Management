const express = require('express');
const bodyParser = require('body-parser');
const parkingLotRoutes = require('./routes/parkingLotRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/parking', parkingLotRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
