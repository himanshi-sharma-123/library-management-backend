const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const userRoute = require("./routes/user-routes");
const cors = require("cors");
const app = express();
const collection = require("./model/user");
// const { api } = require("./routes");

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// app.use("/v1", api);
// localhost:5000/books
// app.use("/", userRoute);
app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});
app.use("/books", router);

app.use((req, res) => {
  return res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  return res.status(500).json({ error: "Unknown server error" });
});

mongoose
  .connect(
    "mongodb+srv://himanshish456:library@cluster0.hye2vk9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
