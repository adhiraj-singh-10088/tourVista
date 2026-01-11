const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`Requested id is: ${val}`);
  next();
});

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
    .route('/tour-stats')
    .get(tourController.getTourStats);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);


module.exports = router;
