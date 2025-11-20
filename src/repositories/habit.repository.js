import Habit from "../models/Habit.model.js";

class HabitRepository {
    static async create(habitData) {
        try {
            return await Habit.create(habitData);
        } catch (error) {
            console.error("[SERVER ERROR]: no se pudo crear el hábito", error);
            throw error;
        }
    }

    static async getAllByUser(userId) {
        try {
            return await Habit.find({ userId, active: true }).sort({ createdAt: 1 });
        } catch (error) {
            console.error(
                `[SERVER ERROR]: no se pudieron obtener los hábitos del usuario ${userId}`,
                error
            );
            throw error;
        }
    }

    static async getById(habitId, userId) {
        try {
            return await Habit.findOne({ _id: habitId, userId, active: true });
        } catch (error) {
            console.error(
                `[SERVER ERROR]: no se pudo obtener el hábito con id ${habitId}`,
                error
            );
            throw error;
        }
    }

    static async updateById(habitId, userId, updates) {
        try {
            return await Habit.findOneAndUpdate(
                { _id: habitId, userId },
                updates,
                { new: true }
            );
        } catch (error) {
            console.error(
                `[SERVER ERROR]: no se pudo actualizar el hábito con id ${habitId}`,
                error
            );
            throw error;
        }
    }

    static async softDeleteById(habitId, userId) {
        try {
            return await Habit.findOneAndUpdate(
                { _id: habitId, userId },
                { active: false },
                { new: true }
            );
        } catch (error) {
            console.error(
                `[SERVER ERROR]: no se pudo desactivar el hábito con id ${habitId}`,
                error
            );
            throw error;
        }
    }
}

export default HabitRepository;
