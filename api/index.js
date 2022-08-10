const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors");
const productsRoute = require("./routes/products");
const usersRoutes = require("./routes/users");

dotenv.config()

const PORT = process.env.PORT || 8888;

mongoose.connect(
    process.env.MONGO_URL
).then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log(err);
})

app.use(express.json());
app.use(cors());

app.use("/api/products", productsRoute);
app.use("/api/users", usersRoutes);


app.listen(PORT, () => {
    console.log("server started on PORT" + PORT);
})