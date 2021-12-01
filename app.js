const fs = require('fs');
const express = require("express");

const app = express();

app.use(express.json());

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

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  // if (id >= tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: "failed",
      messsage: "Invalid Id"
    })
  }


  res.status(200).json({
    status: "success",
    data: {
      tours: tour
    }
  })
})

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    })
  })
})

// Starting the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});


