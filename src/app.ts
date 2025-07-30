import { failedResponse } from "./utils/api.ts";
import { FRONTEND_ORIGIN } from "./constants.ts";
import type { Request, Response, NextFunction } from "express";

import path from "path";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// routes
import postRoutes from "./routes/post.ts";
import userRoutes from "./routes/user.ts";

const app = express();

// static files
app.use("/public", express.static(path.join(path.resolve(), "public")));

// plugins
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_ORIGIN,
  })
);

// routes
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/user", userRoutes);

// error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  failedResponse(res, error);
});

export default app;
