import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnection } from "./db/dbConnection.js";

const app = express();
const PORT = process.env.PORT || 4000;

// =================== MIDDLEWARES ==================== //

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
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
