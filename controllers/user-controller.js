const User = require("../model/user");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const check = await User.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (error) {
    res.json("fail");
  }
};

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await User.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (error) {
    res.json("fail");
  }
};

exports.login = login;
exports.signup = signup;
