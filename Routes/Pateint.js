const router = require("express").Router();
const wrapAsync=require("../utils/wrapAsync.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

// const {
//   signin,
//   login,
//   request_reset,
//   verify_otp,
//   send_welcome_email,
// } = require("../Controllers/Patient");


// const {
//   signinValidation,
//   logininValidation,
// } = require("../Middlewares/AuthValidation");
// const { cart, deleteCart } = require("../Controllers/cart");
// const getOrders = require("../Controllers/orders");
// router.post("/signin", signinValidation, signin);

// router.post("/login", logininValidation, login);

router.get("/",(req,res)=>{
    res.send("hello");
})

module.exports = router;