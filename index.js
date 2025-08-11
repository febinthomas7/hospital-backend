const express = require("express");
const app = express();
const AuthRouter = require("./Routes/AuthRouter")
// Root route
app.use("/auth", AuthRouter);

// Specify the port
const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
