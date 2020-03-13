const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
// .env Variables
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
// Connecting to DB
connectDB();
// MIDDLEWARES
// Body Parser
app.use(express.json());
// CORS
app.use(cors());
// Setting Public Files
app.use(express.static(path.join(__dirname, "public")));
//ROUTES
app.use("/api/v1/stores", require("./routes/stores"));
app.listen(PORT, () => {
  NODE_ENV === "development"
    ? console.log(`Listening on PORT:${PORT}. Running in ${NODE_ENV} mode`)
    : null;
});
