module.exports = (req, res, next) => {
  const { isAdmin } = req.body;
  if (isAdmin == true) {
    next();
  } else {
    return res.status(400).send({ err: "User does not have this permission " });
  }
};
