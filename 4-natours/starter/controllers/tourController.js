const Tour = require('../models/tourModel');

// FOR LOCAL FILE DATABASE
// const localFileController = function () {
//   const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
//   );

//   // Middleware function to check ID is valid
//   exports.checkID = function (req, res, next, val) {
//     if (req.params.id * 1 > tours.length) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'Invalid ID',
//       });
//     }
//     next();
//   };

//   exports.checkBody = function (req, res, next) {
//     if (!req.body.name || !req.body.price) {
//       return res.status(400).json({
//         status: 'failed',
//         message: 'Missing name or price',
//       });
//     }
//     next();
//   };

//   // Function to get all tours
//   exports.getAllTours = function (req, res) {
//     res.status(200).json({
//       status: 'success',
//       requestedAt: req.requestTime,
//       results: tours.length,
//       data: { tours: tours },
//     });
//   };

//   // Function to get specific tour
//   exports.getTour = function (req, res) {
//     const id = req.params.id * 1;
//     const tour = tours.find((element) => element.id === id);
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour: tour,
//       },
//     });
//   };

//   // Function to create tour
//   exports.createTour = function (req, res) {
//     // console.log(req.body);
//     const newId = tours[tours.length - 1].id + 1;
//     const newTour = Object.assign({ id: newId }, req.body);

//     tours.push(newTour);
//     fs.writeFile(
//       `${__dirname}/dev-data/data/tours-simple.json`,
//       JSON.stringify(tours),
//       () => {
//         res.status(201).json({
//           status: 'success',
//           data: {
//             tour: newTour,
//           },
//         });
//       },
//     );
//   };

//   // Function to update tour
//   exports.updateTour = function (req, res) {
//     // Check if tour with ID exists

//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour: '<Updated tour here...>',
//       },
//     });
//   };

//   // Function to delete tour
//   exports.deleteTour = function (req, res) {
//     // Check if tour with ID exists

//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   };
// };

// Function to get all tours
exports.getAllTours = async function (req, res) {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

// Function to get specific tour
exports.getTour = async function (req, res) {
  try {
    const tour = await Tour.findById(req.params.id);
    // Can also be done like this => Tour.findOne({_id:req.params.id})

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

// Function to create tour
exports.createTour = async function (req, res) {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};

// Function to update tour
exports.updateTour = async function (req, res) {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

// Function to delete tour
exports.deleteTour = async function (req, res) {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
