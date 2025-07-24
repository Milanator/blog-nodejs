import type { Request, Response, NextFunction } from "express";

import path from "path";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// routes
import postRoutes from "./routes/post.ts";

import { failedResponse } from "./utils/api.ts";

const app = express();

// static files
app.use("/public", express.static(path.join(path.resolve(), "public")));

// plugins
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// auth user
app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = { _id: "684bdf17c925da514c1ea699" };

  next();
});

// routes
app.use("/api/v1/post", postRoutes);

// error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  failedResponse(res, error);
});

export default app;
