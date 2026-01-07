const Tour = require('./../models/tourModel.js');



exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res
      .status(400)
      .json({ status: 'Fail', message: 'Name and/or price are missing' });
  next();
}

exports.getAllTours = (req, res) => {
  return res.status(200).json({
    status: 'success',
    // results: tours.length,
    // requestTime: req.requestTime,
    // data: {
    //   tours,
    // },
  });
};

exports.createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);

  return res.status(201).json({
        status: 'success',
        requestTime: req.requestTime,
        // data: {
        //   tour: newTour,
        // },
      });
};

exports.getTour = (req, res) => {
  const { tour } = req;
  return res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  const { tour } = req;

  const index = tours.indexOf(tour);
  Object.assign(tours[index], req.body.updatedTour);

  return res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      updatedTour: tours[index],
    },
  });
};

exports.deleteTour = (req, res) => {
  const { tour } = req;
  return res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    message: 'Tour deleted successfully',
  });
};
