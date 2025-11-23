import HabitRepository from "../repositories/habit.repository.js";
import { ServerError } from "../utils/errors.js";

class HabitService {
  static async getAll(userId) {
    try {
      return await HabitRepository.getAllByUser(userId);
    } catch (error) {
      console.error("ERROR GET ALL HABITS:", error);
      throw new ServerError(500, "No se pudieron obtener los hábitos");
    }
  }

  static async create(userId, habitData) {
    try {
      const habit = await HabitRepository.create({ ...habitData, userId });
      return habit;
    } catch (error) {
      if (error.code === 11000) {
        throw new ServerError(400, "Ya existe un hábito con ese nombre");
      }
      console.error("ERROR CREATE HABIT:", error);
      throw new ServerError(500, "No se pudo crear el hábito");
    }
  }

  static async update(userId, habitId, updates) {
    const habit = await HabitRepository.updateById(habitId, userId, updates);
    if (!habit) throw new ServerError(404, "Hábito no encontrado");
    return habit;
  }

  static async delete(userId, habitId) {
    const habit = await HabitRepository.softDeleteById(habitId, userId);
    if (!habit) throw new ServerError(404, "Hábito no encontrado");
    return habit;
  }
}

export default HabitService;
