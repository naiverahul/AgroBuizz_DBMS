import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { setupVite, serveStatic } from "./vite.js"; // use .js extension
import routes from "./routes.js"; // use .js extension

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api", routes);

if (app.get("env") === "development") {
  setupVite(app, server); // Vite middleware
} else {
  serveStatic(app); // Production static serving
}

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});