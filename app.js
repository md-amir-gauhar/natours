const fs = require('fs');
const express = require("express");

const app = express();

// Defining routes
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hello from the server", app: "Natours" })
// })

// app.post('/', (req, res) => {
//   res.send('You cannot post to this endpoint..')
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
});

// Starting the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});


