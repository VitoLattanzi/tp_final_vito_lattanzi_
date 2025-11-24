
import { Schema, model } from "mongoose";

// modelo de la carga diaria de los habitos

const habitEntrySchema = new Schema(
  {
    habitId: {
      type: Schema.Types.ObjectId,
      ref: 'Habit',
      required: true,
      index: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
      index: true,
    },
    value: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);
 
habitEntrySchema.index({ habitId: 1, date: 1 }, { unique: true });

const HabitEntry = model("HabitEntry", habitEntrySchema);

export default HabitEntry;