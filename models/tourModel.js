const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      minlength: [8, 'A Tour name must be at least 8 characters long'],
      maxlength: [40, "A Tour name can't be longer than 40 characters"],
    },
    slugName: {
      type: String,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy','medium','difficult'],
        message: 'Difficulty can only be: easy/medium/difficult'
      }
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        /* 'this' only points to the current document on NEW document creation (not on
        Update) */
        validator: function (val) {return (this.price > val)},
        message: "Discounted price should be less than original price"
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating can't be less than 1"],
      max: [5, "Rating can't be higher than 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: {
      type: [Date],
    },
    superDuperPooperSecretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//save works before .save() and .create(), not on insertMany() or findByIdAndUpdate()
tourSchema.pre('save', function (next) {
  this.slugName = slugify(this.name, { lower: true });
  next();
});

//post creation middleware
tourSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});

// find hook
tourSchema.pre(/^find/, function () {
  this.find({ superDuperPooperSecretTour: { $ne: true } });
  this.start = Date.now();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

//aggregate hook
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { superDuperPooperSecretTour: { $ne: true } },
  });
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
