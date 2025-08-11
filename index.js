const express = require("express");
const app = express();

// Root route
app.get("/", (req, res) => {
  res.socket.setTimeout(1000 * 60 * 60); // Set timeout to 1 hour
  res.send("<h1>backend</h1>");
});

// Specify the port
const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
