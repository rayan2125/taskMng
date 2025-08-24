const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const sequelize = require("./config/db.js");
const app =express();
app.use(cors());
app.use(express.json());
app.use(routes);
const port = 8080;

app.listen(port, async (err) => {
      if (err) throw err;
  try {
    await sequelize.sync();
    console.log("DB Connected");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log("Your server is running on port", port);
    });
  
