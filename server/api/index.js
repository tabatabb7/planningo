const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/groups", require("./groups"));
router.use("/tasks", require("./tasks"));
router.use("/groceries", require("./groceries"));


router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});


module.exports = router;
