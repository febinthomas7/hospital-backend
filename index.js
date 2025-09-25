const express = require("express");
const app = express();

const ExpressError=require("./Utils/expressError");
const patientRoute = require("./Routes/Pateint");
const DoctorRoute = require("./Routes/Doctor");
const HospitalRoute = require("./Routes/Hospital");

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON bodies

const bodyParser = require('body-parser');
require('dotenv').config();

const { initDoctorTable } = require('./Models/Doctor.js');
const { initNoticeTable } = require("./Models/Notice.js");
const { initPatientTable } = require("./Models/Patient.js");
const { initReportTable } = require("./Models/Reports.js");
const { initHospitalTable } = require("./Models/Hospital.js");
const { initAdvertisementTable } = require("./Models/Advertisement.js");

app.use(bodyParser.json());

// Initialize table on startup
initHospitalTable();
initDoctorTable();
initNoticeTable();
initPatientTable();
initReportTable();
initAdvertisementTable();



// Root route
app.use("/patient",patientRoute);
app.use("/doctor",DoctorRoute);
app.use("/Hospital",HospitalRoute);

// All routes Expect created routes
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

//Middleware
app.use((err,req,res,next)=>{
  let {statusCode= 500 ,message ="something went wrong"}=err;
  res.status(statusCode).send({message});
});

// Specify the port
const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
