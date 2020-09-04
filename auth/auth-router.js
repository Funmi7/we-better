const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const secrets = require("../config/secrets");
const Users = require("../models/users-models");

router.post("/register", async (req, res) => {
  let user = new Users(req.body);
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const savedUser = await user.save();
    res.status(200).json({
      message: `${savedUser.user_name} created successfully`,
      token: token
    });
  } catch (err) {
    res.status(500).json({
      error: `Cannot create a new user ${err.message}`,
    });
  }
});

router.post('/login', async (req, res) => {
  let {email, password} = req.body;
  try {
    const user = await Users.findOne({email})
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)
      res.status(200).json({
        message: `Welcome ${user.user_name}`,
        token: token
      })
    } else {
      res.status(401).json({
        message: `Invalid credentials`
      })
    }
  }
  catch (err) {
    res.status(500).json(err.message)
  }
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email
  }
  const options = {
    expiresIn: '1d'
  }
  const result = jwt.sign(
    payload,
    secrets.jwtSecret,
    options
  )
  return result;
}

module.exports = router;
