const Http = require("http");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogs");

// express app
const app = express();

// register view engine
app.set("view engine", "ejs");
// use middleware for static files
app.use(express.static("public"));
// url encoding middleware
app.use(express.urlencoded({ extended: true }));
// use morgan to log
app.use(morgan("dev"));

//creating server
const server = Http.createServer(app);
const port = process.env.PORT || 3000;

// mongoDbURI
const mongoDbUri =
  "mongodb+srv://aahad:aahadtest1234@expressblogsite.y9kmb.mongodb.net/expressblogdatabase?retryWrites=true&w=majority";

// connect mongoDb with mongoose
mongoose.connect(mongoDbUri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

//checking for errors while connecting
db.on("error", (err) => {
  console.error(`Error in connecting MongoDB:\n ${err}`);
});

//checking if the connection has been established
db.on("connected", () => {
  console.log("MongoDB is up and running!");
  server.listen(port, () => {
    console.log(`Server is up and running @${port}`);
  });
});

app.get("/login", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "user logged in successfully",
  });
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
