const AccessList = require("../models/accesslist");

module.exports = (req, res, next) => {
  AccessList.findOne({
    routepath: req.originalUrl,
    method: req.method
  })
    .exec()
    .then(accessList => {
      if (!accessList) {

        next();
        return;
      }
      console.log(req.user);
      if (!req.user.role.includes(accessList.rolename) && !req.user.role.includes('ADMIN')) {
        res.status(401).send({ message: "Not authorised" });
        return;
      }
      next();
    });
};
