const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());    

// Serve frontend
app.use(express.static("frontend"));

// Proxy API requests to Flask
app.post("/api/submit-code", async (req, res) => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/submit-code", req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || "Error");
    }
});

// Start Node.js server
app.listen(3000, () => console.log("Node.js server running on http://localhost:3000"));
