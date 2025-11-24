const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connect
connectDB(process.env.MONGO_URI);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/customers", require("./routes/customers"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
