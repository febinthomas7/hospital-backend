const express = require("express");
const app = express();

const ExpressError=require("./Utils/expressError");
const patientRoute = require("./Routes/Pateint");
const DoctorRoute = require("./Routes/Doctor");
const HospitalRoute = require("./Routes/Hospital");

if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

app.use(express.urlencoded({ extended: true }));

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
