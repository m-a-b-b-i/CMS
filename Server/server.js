require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const root = require("./routes/root");
const Mosque = require("./routes/api/Mosque");
const register = require("./routes/register");
const manageUser = require("./routes/api/manageUser");
const auth = require("./routes/auth");
const refresh = require("./routes/refresh");
const logout = require("./routes/logout");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const app = express();

const PORT = process.env.PORT || 3500;

//Connect to MongoDB
connectDB();

//custom middleware logger
app.use(logger);

//Handle options credentials check - before CORS!
//and fetch cookies credentials requirement
app.use(credentials);

//cross origin resource sharing
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded data
//in other words, form data:
//"content-type: application/x-ww-form-urlencoded"
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", root);
app.use("/register", register);
app.use("/manageuser", manageUser);
app.use("/auth", auth);
app.use("/refresh", refresh);
app.use("/logout", logout);
app.use("/mosque", Mosque);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not Found" });
  } else {
    res.type("txt").send("404 not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
