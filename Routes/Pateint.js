const {
  loginPatient,
  registerPatient,
} = require("../Controllers/PatientController");

const router = require("express").Router();

router.get("/userlist", (req, res) => {
  console.log("hi");

  res.status(200).json({ data: "hello" });
});

router.post("/register", registerPatient);

router.post("/login", loginPatient);

module.exports = router;
