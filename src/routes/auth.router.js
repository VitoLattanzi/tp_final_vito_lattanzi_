import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

// Validador inline (Joi)
function validateRequest(schema) {
  return (req, res, next) => {
    if (!schema) return next();
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos",
        details: error.details.map(d => ({ message: d.message, path: d.path })),
      });
    }
    req.body = value;
    return next();
  };
}

const authRouter = Router();

authRouter.post("/register", validateRequest(registerSchema), AuthController.register);
authRouter.get("/verify-email/:verification_token", AuthController.verifyEmail);
authRouter.post("/login", validateRequest(loginSchema), AuthController.login);

export default authRouter;
