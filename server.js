const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8081;

var corsOptions = {
  origin: "http://localhost:8001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

require("./app/routes/pdf.routes.js")(app);
require("./app/routes/user.routes.js")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
