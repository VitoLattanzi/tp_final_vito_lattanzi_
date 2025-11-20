import HabitRepository from "../repositories/habit.repository.js";
import HabitEntryRepository from "../repositories/habitEntry.repository.js";
import { ServerError } from "../utils/errors.js";

class HabitService {
  static async getAll(userId) {
    return await HabitRepository.getAllByUser(userId);
  }

  static async create(userId, habitData) {
    const habit = await HabitRepository.create({ ...habitData, userId });
    return habit;
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

  static async createEntry(userId, habit, { date, value }) {
    // normalizo fecha a hoy si no hay entrada
    let finalDate = date;
    if (!finalDate) {
      finalDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    }

    let finalValue = value;

    if (habit.type === "boolean") {
      finalValue = value ? 1 : 0;
    } else {
      finalValue = Number(value || 0);
      if (Number.isNaN(finalValue)) {
        throw new ServerError(400, "El valor de la entrada no es numérico");
      }
    }

    const entry = await HabitEntryRepository.createOrUpdate(
      habit._id,
      finalDate,
      finalValue
    );

    // TODO: actualizar streaks / acceleration más adelante
    return entry;
  }

  static async getEntries(userId, habit, { fromDate, toDate }) {
    const entries = await HabitEntryRepository.getByHabitAndRange(
      habit._id,
      fromDate,
      toDate
    );
    return entries;
  }
}

export default HabitService;
