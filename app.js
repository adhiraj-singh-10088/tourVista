const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('You can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
