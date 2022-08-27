const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productsRoute = require("./routes/products");
const usersRoutes = require("./routes/users");
const stripe = require("stripe")(
  "sk_test_51LY8GCHlCgFo7BbfXxJrMhINhfeI6P9ieR2w3IAoKR3MgIVSRuo42zCRwB6uwfAcDow738vWTyWzFgPeAcOPOO40001djLKNUA"
);
const multer = require("multer");

dotenv.config();

const PORT = process.env.PORT || 8888;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.use("/api/products", productsRoute);
app.use("/api/users", usersRoutes);
app.use(express.static("images"));

app.post("/pay", async (req, res) => {
  const { price, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: price,
      currency: "USD",
      payment_method: id,
    });
    res.send({ message: "Оплата прошла успешно" });
  } catch (err) {
    console.log(err);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    // file.originalname = Date.now() + file.originalname;
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.json("файл загружен");
});

app.listen(PORT, () => {
  console.log("server started on PORT" + PORT);
});
