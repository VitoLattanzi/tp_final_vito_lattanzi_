import { Router } from "express";
import HabitController from "../controllers/habit.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const habitRouter = Router();

// todos los endpoints de hábitos requieren estar logueado
habitRouter.use(authMiddleware);

// Habits CRUD
habitRouter.get(
    "/",
    HabitController.getHabits
);
habitRouter.post(
    "/", 
    HabitController.createHabit
);
habitRouter.put(
    "/:habitId", 
    HabitController.updateHabit
);
habitRouter.delete(
    "/:habitId", 
    HabitController.deleteHabit
);

// Entries (entradas diarias)
habitRouter.post(
    "/:habitId/entries", 
    HabitController.createEntry
);
habitRouter.get(
    "/:habitId/entries", 
    HabitController.getEntries
);

export default habitRouter;
