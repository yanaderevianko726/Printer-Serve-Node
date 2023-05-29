const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors({
  origin: "http://localhost:8001"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

require("./app/routes/thermal.routes.js")(app);
require("./app/routes/rfid.reoutes.js")(app);
require("./app/routes/usbrfid.routes.js")(app);
require("./app/routes/user.routes.js")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
