require("dotenv").config();
const express = require("express");
const app = express();
require("./db-config.js");

const cors = require("cors");
const patientRoute = require("./Routes/Pateint");
const DoctorRoute = require("./Routes/Doctor");
const HospitalRoute = require("./Routes/Hospital");
// const ExpressError = require("./Utils/expressError");

// const UserRoute = require("./Routes/User.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON bodies

const bodyParser = require("body-parser");

app.use(
  cors({
    origin: process.env.CORS_ORIGINS, // Or your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json()); // Middleware to parse JSON bodies

app.use(bodyParser.json());

app.use("/api/patient", patientRoute);
app.use("/api/doctor", DoctorRoute);
app.use("/api/hospital", HospitalRoute);

// // All routes Expect created routes
// app.use((req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });

//Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).send({ message });
});

// Specify the port
const port = 5000;

// Start the server
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
