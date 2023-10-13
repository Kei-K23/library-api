import express from "express";
import { authorController } from "../controllers/author";
import { body, param } from "express-validator";
import { validator } from "../middlewares/validation";

export default function (router: express.Router) {
  router.get("/author", authorController.getAllAuthors);
  router.get(
    "/author/:id",
    [param("id").notEmpty()],
    validator,
    authorController.getAuthorById
  );
  router.post(
    "/author",
    [
      body("name").isString().notEmpty(),
      body("email").isString().notEmpty(),
      body("nation").isString().notEmpty(),
      body("quote").isString().notEmpty(),
    ],
    validator,
    authorController.addNewAuthor
  );
  router.delete(
    "/author/:id",
    [param("id").notEmpty()],
    validator,
    authorController.deleteAuthor
  );
  router.put(
    "/author/:id",
    [param("id").notEmpty()],
    validator,
    authorController.updateAuthor
  );
}
