import express from "express";
import { userController } from "../controllers/user";
import {
  isAdmin,
  isOwnerOrAdmin,
  isSessionTokenExist,
  isSuspended,
  validator,
} from "../middlewares/validation";
import { body, param } from "express-validator";
export default function (router: express.Router) {
  router.get("/user/all", isAdmin, userController.getAllUser);
  router.post(
    "/user/register",
    [
      body("name").isString().notEmpty(),
      body("email").isString().isEmail().notEmpty(),
      body("password").isString().notEmpty().isLength({ min: 6, max: 20 }),
    ],
    validator,
    userController.registerUser
  );
  router.post(
    "/user/login",
    isSessionTokenExist,
    [
      body("email").isString().isEmail().notEmpty(),
      body("password").isString().notEmpty().isLength({ min: 6, max: 20 }),
    ],
    validator,
    isSuspended,
    userController.loginUser
  );
  router.post("/user/logout", userController.logoutUser);
  router.put(
    "/user/:id",
    [param("id").notEmpty()],
    validator,
    isOwnerOrAdmin,
    userController.updateUser
  );
  router.delete(
    "/user/:id",
    [param("id").notEmpty()],
    validator,
    isOwnerOrAdmin,
    userController.deleteUser
  );
}
