require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const linkRoutes = require("./routes/link");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

//DATABASE
mongoose
  .connect(process.env.DATABASE_CLOUD, {
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    useCreateIndex: true,
  })
  .then(() => console.log("DB is connected!!"))
  .catch((err) => console.log(err));

app.use(morgan("dev"));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "5mb", type: "application/json" }));
// app.use(cors());
app.use(cors({ origin: process.env.CLIENT_URL }));

//routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", linkRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
