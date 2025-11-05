import jwt from "jsonwebtoken";
import { ServerError } from "../utils/errors.js";
import ENVIRONMENT from "../config/environment.config.js";

function authMiddleware(request, response, next) {
  try {
    const auth_header = request.headers.authorization;
    if (!auth_header) throw new ServerError(401, "No hay header de autorizacion");

    const [type, auth_token] = auth_header.split(" ");
    if (type !== "Bearer" || !auth_token) {
      throw new ServerError(401, "Formato de autorizacion invalido");
    }

    request.user = jwt.verify(auth_token, ENVIRONMENT.JWT_SECRET);
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return response.status(401).json({ ok: false, message: "Token expirado" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return response.status(400).json({ ok: false, message: "Token invalido" });
    }
    if (error.status) {
      return response.status(error.status).json({ ok: false, message: error.message });
    }
    console.error("ERROR EN AUTH MIDDLEWARE:", error);
    return response.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
}

export default authMiddleware;
