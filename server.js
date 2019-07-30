const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/estimates", require("./routes/api/estimates"));
app.use("/api/vin", require("./routes/api/vin"));

// app.unsubscribe("/api/estimate", require("./routes/api/estimate"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
