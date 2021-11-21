const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8800;
const URI = process.env.ATLAS_URI;

mongoose
  .connect(URI, { useUnifiedTopology: true })
  .then(() => console.log("MongodDB connected successfully"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.get("/", (req, res) => {
  res.send("Hello to Netflix API.");
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
