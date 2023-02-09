const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const mainRouter = require("./routes/mainRouter");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_KEY)
  .then((res) => {
    console.log("CONNECTED");
  })
  .catch((e) => {
    console.log(e);
  });

http.listen(4000);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(
  session({
    key: "admin",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use("/", mainRouter);
