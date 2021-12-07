const Tour = require('../models/tourModel');

/* Just for testing purpose
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/data/tours-simple.json`));
*/




const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      requestedAT: req.requestTime,
      results: tours.length,
      data: {
        tours
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }

}

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({ _id: req.params.id})
    res.status(200).json({
      status: "success",
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    })
  }

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

const updateTour = async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  try {
    res.status(200).json({
      status: "success",
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    })
  }
}

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: "success",
      data: null
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    })
  }
}

module.exports = { getAllTours, createTour, getTour, updateTour, deleteTour };