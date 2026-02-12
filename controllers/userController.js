const fs = require('fs');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.checkID = (req, res, next, val) => {
  const id = val;
  const user = users.find((element) => element._id === id);
  if (user === undefined)
    return res.status(404).json({
      status: 'Fail',
      requestTime: req.requestTime,
      message: 'Invalid ID',
    });
  req.user = user;
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.email)
    return res.status(400).json({
      status: 'Fail',
      message: 'Name and/or email are missing',
    });
  next();
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  const newID = users[users.length - 1]._id + 1;
  const newUser = Object.assign({ _id: newID }, req.body);

  users.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      if (err) return res.status(500).send(err.body.message);
      return res.status(201).json({
        status: 'success',
        requestTime: req.requestTime,
        data: {
          user: newUser,
        },
      });
    }
  );
};

exports.getUser = (req, res) => {
  const { user } = req;
  return res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      user,
    },
  });
};

exports.updateUser = (req, res) => {
  const { user } = req;

  const index = users.indexOf(user);
  Object.assign(users[index], req.body.updatedUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
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
          updatedUser: users[index],
        },
      });
    }
  );
};

exports.deleteUser = (req, res) => {
  const { user } = req;
  const index = users.indexOf(user);
  users.splice(index, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
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
        message: 'User deleted successfully',
      });
    }
  );
};
