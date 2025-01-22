import express, { NextFunction, Request, Response } from "express";
import authRoutes from "./routes/Auth";
import eventRoutes from "./routes/Event";
import ticketRoutes from "./routes/Ticket";
import ticketTypeRoutes from "./routes/TicketType";
import ticketTemplateRoutes from "./routes/TicketTemplate";
import userRoutes from "./routes/User";
import authenticate from "./middleware/authentication";
import env from "./config/env";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import https from "https";

const app = express();
const PORT = env.appPort;
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};
app.use(express.json()); // To parse JSON bodies
app.use(morgan("dev"));
app.use(cors());
// Unauthenticated routes (if needed, e.g., login/register)
app.use("/api/auth", authRoutes);

app.use(authenticate);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/ticketTypes", ticketTypeRoutes);
app.use("/api/ticketTemplates", ticketTemplateRoutes);
app.use("/api/users", userRoutes);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    statusCode,
  });
});

https.createServer(options, app).listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
