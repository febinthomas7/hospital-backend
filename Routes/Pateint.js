const {
  loginPatient,
  registerPatient,
} = require("../Controllers/PatientController");
const {
  signinValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");

const router = require("express").Router();

router.get("/userlist", (req, res) => {
  console.log("hi");

  res.status(200).json({ data: "hello" });
});

router.post("/register", signinValidation, registerPatient);

router.post("/login", loginValidation, loginPatient);

module.exports = router;
