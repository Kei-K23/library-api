import express from "express";
import { validationResult } from "express-validator";

export function validator(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const error = validationResult(req);

  if (!error.isEmpty())
    return res.status(400).json({
      message: "missing request fields",
      error: error.array(),
    });
  next();
}
