const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
cors = require("cors");

// Serve out any static assets correctly
app.use(express.static('../client/build'));

// api routes
const trafficRouter = require('./api/traffic');

//Use the routes
app.use('/api/traffic', trafficRouter);

// Any routes that don't match on our static assets or api should be sent to the React Application
// This allows for the use of things like React Router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

app.use(cors());

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})
