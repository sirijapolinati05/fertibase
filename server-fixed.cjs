const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Try to mount routes if present — don't crash if they're missing
try {
    app.use("/api/products", require("./routes/products.js"));
} catch (err) {
    console.warn("Products route not found or failed to load, skipping:", err.message);
}
try {
    app.use("/api/careers", require("./routes/careers.js"));
} catch (err) {
    console.warn("Careers route not found or failed to load, skipping:", err.message);
}

app.get("/", (req, res) => {
    res.send("<h1>FertiBase Backend Running Securely (dev mode)</h1>");
});

// Connect to MongoDB only if a connection string is provided, otherwise start server
const PORT = process.env.PORT || 5000;

if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI not set — starting server without DB connection (development mode)');
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
} else {
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
}
