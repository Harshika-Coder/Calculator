const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());
app.use(cors());

//Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

//Schema
const calculationSchema = new mongoose.Schema({
  expression: { type: String, required: true },
  result: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Model
const Calculation = mongoose.model("Calculation", calculationSchema);

// POST route → save calculation
app.post("/api/calculations", async (req, res) => {
  try {
    const { expression, result } = req.body;
    if (
      !expression ||
      expression.trim() === "" ||
      !result ||
      result.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Expression and result are required" });
    }
    const newCalc = new Calculation({ expression, result });
    await newCalc.save();
    res.status(201).json(newCalc);
  } catch (error) {
    console.error("Error saving calculation:", error);
    res.status(500).json({ error: "Failed to save calculation" });
  }
});

// GET route → fetch all calculations
app.get("/api/calculations", async (req, res) => {
  try {
    // Fetch calculations from DB, sorted by date (newest -> oldest)
    const calculations = await Calculation.find().sort({ date: -1 }); //newest -> oldest
    res.json(calculations);
  } catch (error) {
    console.error("Error fetching calculations:", error);
    res.status(500).json({ error: "Failed to fetch calculations" });
  }
});

// DELETE route → clear history
app.delete("/api/calculations", async (req, res) => {
  try {
    await Calculation.deleteMany({});
    res.json({ message: "History cleared" });
  } catch (error) {
    console.error("Error clearing history:", error);
    res.status(500).json({ error: "Failed to clear history" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Express server is running");
});

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/calculatorDB")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
