const router = require("express").Router();
const { registerHospital, loginHospital } = require("../Controllers/Hospitals");

router.post("/register", registerHospital);
router.post("/login", loginHospital);

module.exports = router;
