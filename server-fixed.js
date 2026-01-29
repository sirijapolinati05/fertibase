const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/products", require("./routes/products.js"));
app.use("/api/careers", require("./routes/careers.js"));

app.get("/", (req, res) => {
    res.send("<h1>FertiBase Backend Running Securely</h1>");
});

// Connect to MongoDB first, then start the server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Atlas Connected Successfully!");

        // Start server ONLY after MongoDB connection is established
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Exit if database connection fails
    });
