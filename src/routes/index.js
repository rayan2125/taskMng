const express = require("express");
const routers = require("./api/index.js");
const routes = express.Router();

routes.use("/api", routers);

// Handle 404 for unmatched routes
routes.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "404 Not Found - The requested path does not exist",
  });
});

module.exports = routes;
