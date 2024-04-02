const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const port = process.env.PORT || 7002;
const routes = require("./routes");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_KEY, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(`Database Connected`))
  .catch((err) => console.log(err));
// Instantiate express
app.enable("trust proxy"); // We are using this for the express-rate-limit middleware See: https://github.com/nfriedly/express-rate-limit
app.use(express.json()); // Set body parser middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors()); // Enable cross-origin for apex purpose;
// app.use(express.static('public'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  next();
});

routes(app);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
