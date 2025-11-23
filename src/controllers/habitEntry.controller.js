import HabitEntryService from "../services/habitEntry.service.js";

class HabitEntryController {
  static async createOrUpdate(request, response) {
    try {
      const userId = request.user.id; // viene del middleware JWT
      const { habitId, date, value } = request.body;

      if (!habitId || !date) {
        return response.status(400).json({
          ok: false,
          message: "habitId y date son obligatorios",
        });
      }
      
    const entry = await HabitEntryService.createOrUpdateEntry(
        userId,
        habitId,
        value.date,
        value.value
    );

      return response.status(200).json({
        ok: true,
        entry,
      });
    } catch (error) {
      const status = error?.status || 500;
      console.error("ERROR CREATE/UPDATE HABIT ENTRY:", error);
      return response.status(status).json({
        ok: false,
        message: error?.message || "Error interno del servidor",
      });
    }
  }

  static async getLastDays(request, response) {
    try {
        const userId = request.user.id;
        const { habitId } = request.params;
        const days = Number(request.query.days) || 7;

        const data = await HabitEntryService.getLastNDaysStatus(
        userId,
        habitId,
        days
        );

        return response.status(200).json({
            ok: true,
            ...data,
        });
    } 
    catch (error) {
        const status = error?.status || 500;
        console.error("ERROR GET LAST DAYS:", error);
        return response.status(status).json({
            ok: false,
            message: error?.message || "Error interno del servidor",
        });
    }
  }
}

export default HabitEntryController;
