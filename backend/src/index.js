import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnection } from "./db/dbConnection.js";

const app = express();
const PORT = process.env.PORT || 4000;

// =================== MIDDLEWARES ==================== //

app.use(
  cors({
    origin: [
      "https://health-frontend-c4x4.onrender.com",
      "https://health-admin-o5vg.onrender.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// ===================== ROUTES ======================= //

import adminRouter from "./routes/admin.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  dbConnection()
    .then(() => console.log(`Server running at => http://localhost:${PORT}`))
    .catch((err) => console.log(err));
});
