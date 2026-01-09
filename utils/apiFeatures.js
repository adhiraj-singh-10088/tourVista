class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObject = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'perRow'];
    excludedFields.forEach((el) => delete queryObject[el]);

    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const queryObjectParsed = JSON.parse(queryStr);

    this.query = this.query.find(queryObjectParsed);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    let entriesToLoad;
    const perRow = Number(this.queryString.perRow);
    if (this.queryString.limit) {
      entriesToLoad = this.queryString.limit;
    } else if (perRow > 0 && Number.isInteger(perRow)) {
      entriesToLoad = perRow * 5;
    } else {
      entriesToLoad = 15;
    }
    const page = Number(this.queryString.page) || 1;
    const skip = (page - 1) * entriesToLoad;
    this.query = this.query.skip(skip).limit(entriesToLoad);

    return this;
  }
}

module.exports = APIFeatures;