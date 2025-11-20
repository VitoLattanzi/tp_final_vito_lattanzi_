import { Schema, model } from "mongoose";
//modelo de la cartita de los habitos

const habitSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 80,
    },
    type: {
      type: String,
      enum: ['boolean', 'numeric'],
      required: true,
    },
    unit: {
      type: String,
      required: true,
      maxlength: 20,
    },
    dailyGoal: {
      type: Number,
      required: true,
      default: 1,
    },
    color: {
      type: String, 
      maxlength: 9,
    },
    acceleration: {
      type: Number,
      default: 100,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    bestStreak: {
      type: Number,
      default: 0,
    },
    lastEntryDate: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

habitSchema.index({ userId: 1, name: 1 }, { unique: true });


const Habit = model("Habit", habitSchema);

export default Habit;
