import express from "express";
import authors from "./authors";
import books from "./books";
const router = express.Router();

export default function () {
  authors(router);
  books(router);
  return router;
}
