const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  const id = Number(val);
  const tour = tours.find((element) => element.id === id);
  if (tour === undefined)
    return res.status(404).json({
      status: 'Fail',
      requestTime: req.requestTime,
      message: 'Invalid ID',
    });
  next();
};

exports.getAllTours = (req, res) => {
  return res.status(200).json({
    status: 'success',
    results: tours.length,
    requestTime: req.requestTime,
    data: {
      tours,
    },
  });
};

exports.createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) return res.status(500).send(err.body.message);
      return res.status(201).json({
        status: 'success',
        requestTime: req.requestTime,
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((element) => element.id === id);
  return res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((element) => element.id === id);

  const index = tours.indexOf(tour);
  Object.assign(tours[index], req.body.updatedTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err)
        return res.status(500).json({
          status: 'Fail',
          requestTime: req.requestTime,
          message: err.body.message,
        });
      return res.status(200).json({
        status: 'success',
        requestTime: req.requestTime,
        data: {
          updatedTour: tours[index],
        },
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((element) => element.id === id);
  const index = tours.indexOf(tour);
  tours.splice(index, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err)
        return res.status(500).json({
          status: 'Fail',
          requestTime: req.requestTime,
          message: err.body.message,
        });
      return res.status(200).json({
        status: 'success',
        requestTime: req.requestTime,
        message: 'Tour deleted successfully',
      });
    }
  );
};
