import express from "express";
import authors from "./authors";
import books from "./books";
import user from "./user";
const router = express.Router();

export default function () {
  authors(router);
  books(router);
  user(router);
  return router;
}
