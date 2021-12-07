const Tour = require('../models/tourModel');

/* Just for testing purpose
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/data/tours-simple.json`));
*/




const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAT: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours
    // }
  })
}

const getTour = (req, res) => {
  console.log(req.params);

  const id = +req.params.id;
  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tours: tour
  //   }
  // })
}

/*
-----Just for testing purpose-----
const createTour = (req, res) => {
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
}
*/

const createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save(); 

    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!!!'
    })
  }

}

const updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: '<updated tour here....>'
    }
  })
}

const deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null
  })
}

module.exports = { getAllTours, createTour, getTour, updateTour, deleteTour };