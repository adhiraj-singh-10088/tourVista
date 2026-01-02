const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
  //   console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) res.send(err.body.message);
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((element) => element.id === id);
  if (tour === undefined)
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const updateTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((element) => element.id === id);
  if (!tour)
    return res.status(404).json({
      status: 'Fail',
      message: "User doesn't exist",
    });

  const index = tours.indexOf(tour);
  Object.assign(tours[index], req.body.updatedTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err)
        return res.status(404).json({
          status: 'Fail',
          message: err.body.message,
        });
      res.status(201).json({
        status: 'success',
        data: {
          updatedTour: tours[index],
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((element) => element.id === id);
  if (!tour)
    return res.status(404).json({
      status: 'Fail',
      message: "User doesn't exist",
    });
  const index = tours.indexOf(tour);
  tours.splice(index, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err)
        return res.status(404).json({
          status: 'Fail',
          message: err.body.message,
        });
      res.status(201).json({
        status: 'success',
        message: 'User deleted successfully',
      });
    }
  );
};

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
