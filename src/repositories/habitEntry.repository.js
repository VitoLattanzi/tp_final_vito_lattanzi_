import HabitEntry from "../models/HabitEntry.model.js";

class HabitEntryRepository {
    static async createOrUpdate(habitId, date, value) {
        try {
            return await HabitEntry.findOneAndUpdate(
                { habitId, date },
                { $set: { value } },
                { upsert: true, new: true }
            );
        } catch (error) {
            console.error(
                `[SERVER ERROR]: no se pudo crear/actualizar la entrada del hábito ${habitId} en fecha ${date}`,
                error
            );
            throw error;
        }   
    }

    static async getByHabitAndRange(habitId, fromDate, toDate) {
        try {
            const filter = { habitId };

            if (fromDate || toDate) {
                filter.date = {};
                if (fromDate) filter.date.$gte = fromDate;
                if (toDate) filter.date.$lte = toDate;
            }

            return await HabitEntry.find(filter).sort({ date: 1 });
        } catch (error) {
            console.error(
                `[SERVER ERROR]: no se pudieron obtener las entradas del hábito ${habitId}`,
                error
            );
            throw error;
        }
    }

    static async getByHabitAndDate(habitId, date) {
        try {
            return await HabitEntry.findOne({ habitId, date });
        } catch (error) {
            console.error(
                `[SERVER ERROR]: no se pudo obtener la entrada del hábito ${habitId} para ${date}`,
                error
            );
            throw error;
        }
    }

    static async getBetween(habitId, startDate, endDate) {
        return HabitEntry.find({
            habitId,
            date: { $gte: startDate, $lte: endDate },
        }).sort({ date: 1 });
    }

}

export default HabitEntryRepository;
