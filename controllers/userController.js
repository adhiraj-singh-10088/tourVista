const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.checkID = (req, res, next, val) => {
  const id = Number(val);
  const user = users.find((element) => element._id === id);
  if (user === undefined)
    return res.status(404).json({
      status: 'Fail',
      requestTime: req.requestTime,
      message: 'Invalid ID',
    });
  next();
};

exports.getAllUsers = (req, res) => {
  return res.status(200).json({
    status: 'success',
    results: users.length,
    requestTime: req.requestTime,
    data: {
      users,
    },
  });
};

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
  const id = req.params.id;
  const user = users.find((element) => element._id === id);
  return res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      user,
    },
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((element) => element._id === id);

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
  const id = req.params.id;
  const user = users.find((element) => element._id === id);
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
