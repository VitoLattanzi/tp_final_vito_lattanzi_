import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El email no es válido",
    "string.empty": "El email es requerido",
    "any.required": "El email es requerido",
  }),
  name: Joi.string()
    .min(2)
    .max(80)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required()
    .messages({
      "string.min": "El nombre debe tener al menos 2 caracteres",
      "string.max": "El nombre no puede superar 80 caracteres",
      "string.pattern.base": "El nombre solo puede contener letras y espacios",
      "any.required": "El nombre es requerido",
    }),
  password: Joi.string()
    .min(6)
    .max(255)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required()
    .messages({
      "string.min": "La contraseña debe tener al menos 6 caracteres",
      "string.pattern.base": "La contraseña debe tener mayúscula, minúscula y número",
      "any.required": "La contraseña es requerida",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El email no es válido",
    "any.required": "El email es requerido",
  }),
  password: Joi.string().min(6).max(255).required().messages({
    "any.required": "La contraseña es requerida",
  }),
});
