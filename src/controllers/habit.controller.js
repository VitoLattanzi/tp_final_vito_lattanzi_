import HabitRepository from "../repositories/habit.repository.js";
import HabitService from "../services/habit.service.js";

import {
    createHabitSchema,
    updateHabitSchema,
    createEntrySchema,
} from "../schemas/habit.schema.js";

class HabitController {
    static async getHabits(request, response) {
        try {
            const userId = request.user.id;
            const habits = await HabitService.getAll(userId);
            return response.status(200).json({ ok: true, habits });
        } catch (error) {
            const status = error?.status || 500;
            console.error("ERROR GET HABITS:", error);
            return response.status(status).json({
                ok: false,
                message: error?.message || "Error interno del servidor",
            });
        }
    }

    static async createHabit(request, response) {
        try {
            const { error, value } = createHabitSchema.validate(request.body, {
                abortEarly: false,
                stripUnknown: true,
        });
        if (error) {
            return response.status(400).json({
            ok: false,
            message: "Datos inválidos",
            details: error.details.map((d) => ({
                message: d.message,
                path: d.path,
            })),
            });
        }

        const userId = request.user.id;
        const habit = await HabitService.create(userId, value);

        return response.status(201).json({ ok: true, habit });
        } catch (error) {
            const status = error?.status || 500;
            console.error("ERROR CREATE HABIT:", error);
            return response.status(status).json({
                ok: false,
                message: error?.message || "Error interno del servidor",
            });
        }
  }

  static async updateHabit(request, response) {
        try {
        const { error, value } = updateHabitSchema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            return response.status(400).json({
            ok: false,
            message: "Datos inválidos",
            details: error.details.map((d) => ({
                message: d.message,
                path: d.path,
            })),
            });
        }

        const userId = request.user.id;
        const habitId = request.params.habitId;

        const habit = await HabitService.update(userId, habitId, value);

        return response.status(200).json({ ok: true, habit });
        } catch (error) {
            const status = error?.status || 500;
            console.error("ERROR UPDATE HABIT:", error);
            return response.status(status).json({
                ok: false,
                message: error?.message || "Error interno del servidor",
            });
        }
    }

  static async deleteHabit(request, response) {
        try {
        const userId = request.user.id;
        const habitId = request.params.habitId;

        await HabitService.delete(userId, habitId);

        return response.status(200).json({
            ok: true,
            message: "Hábito eliminado",
        });
        } catch (error) {
            const status = error?.status || 500;
            console.error("ERROR DELETE HABIT:", error);
            return response.status(status).json({
                ok: false,
                message: error?.message || "Error interno del servidor",
            });
        }
    }

  static async createEntry(request, response) {
        try {
        const { error, value } = createEntrySchema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            return response.status(400).json({
            ok: false,
            message: "Datos inválidos",
            details: error.details.map((d) => ({
                message: d.message,
                path: d.path,
            })),
            });
        }

        const userId = request.user.id;
        const habitId = request.params.habitId;

        const habit = await HabitRepository.getById(habitId, userId);
        if (!habit) {
            return response
            .status(404)
            .json({ ok: false, message: "Hábito no encontrado" });
        }

        const entry = await HabitService.createEntry(userId, habit, value);

        return response.status(201).json({ ok: true, entry });
        } catch (error) {
            const status = error?.status || 500;
            console.error("ERROR CREATE ENTRY:", error);
            return response.status(status).json({
                ok: false,
                message: error?.message || "Error interno del servidor",
            });
        }
    }

    static async getEntries(request, response) {
        try {
            const userId = request.user.id;
            const habitId = request.params.habitId;
            const { fromDate, toDate } = request.query;

            const habit = await HabitRepository.getById(habitId, userId);
            if (!habit) {
                return response
                .status(404)
                .json({ ok: false, message: "Hábito no encontrado" });
            }

            const entries = await HabitService.getEntries(userId, habit, {
                fromDate,
                toDate,
            });

            return response.status(200).json({ ok: true, entries });

        } catch (error) {
            const status = error?.status || 500;
            console.error("ERROR GET ENTRIES:", error);
                return response.status(status).json({
                    ok: false,
                    message: error?.message || "Error interno del servidor",
                });
        }
    }
}

export default HabitController;
