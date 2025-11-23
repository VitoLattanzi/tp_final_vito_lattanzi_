
import HabitEntryRepository from "../repositories/habitEntry.repository.js";
import Habit from "../models/Habit.model.js";
import { ServerError } from "../utils/errors.js";

class HabitEntryService {
  static normalizeDate(date) {
    if (!date) return new Date().toISOString().slice(0, 10);
    return typeof date === "string"
      ? date.slice(0, 10)
      : new Date(date).toISOString().slice(0, 10);
  }

  // CREA / ACTUALIZA UNA ENTRADA Y ACTUALIZA RACHA
  static async createOrUpdateEntry(userId, habitId, date, value) {
    const dateStr = this.normalizeDate(date);

    // 1) validar hábito + dueño
    const habit = await Habit.findOne({ _id: habitId, active: true });
    if (!habit) throw new ServerError(404, "Hábito no encontrado");

    if (habit.userId.toString() !== userId.toString()) {
      throw new ServerError(403, "No podés modificar hábitos de otro usuario");
    }

    // 2) normalizar valor según tipo
    let finalValue;
    if (habit.type === "boolean") {
      finalValue = value ? 1 : 0;
    } else {
      finalValue = Number(value || 0);
      if (!Number.isFinite(finalValue)) {
        throw new ServerError(400, "Valor inválido");
      }
    }

    // 3) crear / actualizar entrada
    const entry = await HabitEntryRepository.createOrUpdate(
      habit._id,
      dateStr,
      finalValue
    );

    const goal =
      habit.type === "boolean" ? 1 : Number(habit.dailyGoal || 1);

    const hasProgress = finalValue > 0;
    const goalMet = finalValue >= goal;

    const lastDate = habit.lastEntryDate
      ? habit.lastEntryDate.toString().slice(0, 10)
      : null;

    const sameDay = lastDate === dateStr;

    const today = new Date(dateStr);
    today.setHours(0, 0, 0, 0);

    // 4) racha: si hubo corte de más de 1 día, reseteo
    if (!sameDay && lastDate) {
      const last = new Date(lastDate);
      last.setHours(0, 0, 0, 0);

      const diffDays =
        (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);

      if (diffDays > 1) {
        habit.currentStreak = 0;
      }
    }

    // 5) lógica de racha con tipos de día
    if (!hasProgress) {
      // registró 0 → rompe racha
      habit.currentStreak = 0;
      habit.lastEntryDate = dateStr;
    } else if (!goalMet) {
      // parcialmente cumplido → mantiene racha pero no suma
      habit.lastEntryDate = dateStr;
    } else {
      // meta cumplida
      if (!sameDay) {
        habit.currentStreak = (habit.currentStreak || 0) + 1;
        habit.bestStreak = Math.max(
          habit.bestStreak || 0,
          habit.currentStreak
        );
      }
      habit.lastEntryDate = dateStr;
    }

    await habit.save();
    return entry;
  }

  // HISTORIAL ÚLTIMOS N DÍAS (para las pelotitas q ma4rcan el registro)
  static async getLastNDaysStatus(userId, habitId, days = 7) {
    const habit = await Habit.findOne({ _id: habitId, active: true });
    if (!habit) throw new ServerError(404, "Hábito no encontrado");

    if (habit.userId.toString() !== userId.toString()) {
      throw new ServerError(403, "No podés ver hábitos de otro usuario");
    }

    const end = new Date();
    end.setHours(0, 0, 0, 0);

    const start = new Date(end);
    start.setDate(start.getDate() - (days - 1));

    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);

    // date en la BD es STRING (YYYY-MM-DD)
    const entries = await HabitEntryRepository.getBetween(
      habitId,
      startStr,
      endStr
    );

    // Mapa: "YYYY-MM-DD" -> entry
    const map = new Map();
    for (const e of entries) {
      const key = String(e.date).slice(0, 10);
      map.set(key, e);
    }

    const goal =
      habit.type === "boolean" ? 1 : Number(habit.dailyGoal || 1);

    const resultDays = [];

    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const ds = d.toISOString().slice(0, 10); 

      const entry = map.get(ds);

      let status = "NONE"; // bolit EN rojo
      if (entry) {
        const val = Number(entry.value || 0);
        if (val >= goal) status = "FULL";       // bolit EN verde
        else if (val > 0) status = "PARTIAL";   // bolit EN amarillo
      }

      resultDays.push({ date: ds, status });
    }

    return { habitId, days: resultDays };
  }
}

export default HabitEntryService;
