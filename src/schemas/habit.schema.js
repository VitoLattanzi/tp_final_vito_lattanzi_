import Joi from "joi";

// crear el habito
export const createHabitSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(80)
    .required()
    .messages({
      "string.empty": "El nombre del hábito es requerido",
      "string.min": "El nombre del hábito debe tener al menos 1 caracter",
      "string.max": "El nombre del hábito no puede superar los 80 caracteres",
      "any.required": "El nombre del hábito es requerido",
    }),

  type: Joi.string()
    .valid("boolean", "numeric")
    .required()
    .messages({
      "any.only": "El tipo debe ser 'boolean' o 'numeric'",
      "any.required": "El tipo del hábito es requerido",
    }),

  unit: Joi.string()
    .min(1)
    .max(20)
    .required()
    .messages({
      "string.empty": "La unidad es requerida",
      "string.max": "La unidad no puede superar los 20 caracteres",
      "any.required": "La unidad es requerida",
    }),

  dailyGoal: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "El objetivo diario debe ser un número",
      "number.positive": "El objetivo diario debe ser mayor a 0",
      "any.required": "El objetivo diario es requerido",
    }),

  color: Joi.string()
    .max(9)
    .optional()
    .messages({
      "string.max": "El color no puede superar los 9 caracteres",
    }),
});

//actualizar o editar el habito
export const updateHabitSchema = Joi.object({
  name: Joi.string().min(1).max(80).messages({
    "string.min": "El nombre del hábito debe tener al menos 1 caracter",
    "string.max": "El nombre del hábito no puede superar los 80 caracteres",
  }),

  unit: Joi.string().max(20).messages({
    "string.max": "La unidad no puede superar los 20 caracteres",
  }),

  dailyGoal: Joi.number().positive().messages({
    "number.base": "El objetivo diario debe ser un número",
    "number.positive": "El objetivo diario debe ser mayor a 0",
  }),

  color: Joi.string().max(9).messages({
    "string.max": "El color no puede superar los 9 caracteres",
  }),

  active: Joi.boolean(),
}).min(1);

// sbir lo diario al habito
export const createEntrySchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "La fecha debe tener el formato YYYY-MM-DD",
      "any.required": "La fecha es requerida",
    }),

  value: Joi.number()
    .required()
    .messages({
      "number.base": "El valor debe ser un número",
      "any.required": "El valor es requerido",
    }),
});
