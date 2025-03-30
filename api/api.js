import express from "express";
import cors from "cors";
import dbAPI from "./routes/db.js";
import crimesAPI from "./routes/crimes.js";

const app = express();
app.use(express.json());

// Configure CORS dynamically

const allowedOrigins = [
   "http://localhost:5173",  // For local development
   "http://localhost:5000",
   "https://team-gahsp.uk.r.appspot.com"  // For production
 ];
 
 // Configure CORS middleware to allow these origins
 app.use(cors({
  origin: function (origin, callback) {
    console.log("Origin received:", origin);  // Debugging log
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));


 app.use('/api/db', dbAPI);
 app.use('/api/crimes', crimesAPI);


app.listen(5000, () => console.log("Backend running on port 5000"));