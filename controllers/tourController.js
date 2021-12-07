const Tour = require('../models/tourModel');

/* Just for testing purpose
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/data/tours-simple.json`));
*/




const getAllTours = async (req, res) => {
  try {
    // console.log(req.query);
    // Build Query
    // 1a) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    console.log(queryObj)

    // 1b) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);


    // console.log(JSON.parse(queryStr))

    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');

      // console.log(sortBy)

      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }


    // 3) Field Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');

      console.log(fields)

      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Execute query
    const tours = await query;

    // const query = await Tour
    //   .find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy')

    // Send response
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