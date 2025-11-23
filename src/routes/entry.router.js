import HabitEntryController from "../controllers/habitEntry.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";

const entryRouter = Router();

entryRouter.post(
  "/",
  authMiddleware,
  HabitEntryController.createOrUpdate
);

entryRouter.get(
  "/:habitId/history",
  authMiddleware,
  HabitEntryController.getLastDays
);

export default entryRouter;
