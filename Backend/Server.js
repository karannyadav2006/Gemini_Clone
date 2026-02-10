import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 PUT YOUR API KEY HERE
const API_KEY = process.env.GEMINI_API_KEY;

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});




app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }]
            }
          ]
        }),
      }
    );

    const data = await response.json();
    // console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    if (data.error) {
      return res.json({ reply: "API Error: " + data.error.message });
    }

    let reply = "No response from AI";

    if (data.candidates?.length) {
      reply =
        data.candidates[0].content?.parts?.map(p => p.text).join(" ") || reply;
    }

    res.json({ reply });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ reply: "Server error talking to AI" });
  }
});



app.listen(5000, () => console.log("Server running on port 5000 🚀"));
