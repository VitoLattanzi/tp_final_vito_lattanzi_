import AuthService from "../services/auth.service.js";
import ENVIRONMENT from "../config/environment.config.js";

class AuthController {
  static async register(request, response) {
    try {
      const { email, password, name } = request.body;
      await AuthService.register(email, password, name);
      return response.status(201).json({
        ok: true,
        message: "Usuario registrado con exito. Revisa tu email para verificar la cuenta.",
      });
    } catch (error) {
      const status = error?.status || 500;
      console.error("ERROR REGISTER:", error);
      return response.status(status).json({
        ok: false,
        message: error?.message || "Error interno del servidor",
      });
    }
  }

  static async verifyEmail(request, response) {
    try {
      const { verification_token } = request.params;
      await AuthService.verifyEmail(verification_token);
      const redirectUrl = `${ENVIRONMENT.URL_FRONTEND}/login?from=verified_email`;
      return response.redirect(302, redirectUrl);
    } catch (error) {
      const status = error?.status || 500;
      console.error("ERROR VERIFY EMAIL:", error);
      return response.status(status).json({
        ok: false,
        message: error?.message || "Error interno del servidor",
      });
    }
  }

  static async login(request, response) {
    try {
      const { email, password } = request.body;

      const { token, user } = await AuthService.login(email, password);

      return response.status(200).json({
        ok: true,
        token,
        user,
      });
    } catch (error) {
      const status = error?.status || 500;
      console.error("ERROR LOGIN:", error);

      return response.status(status).json({
        ok: false,
        message: error?.message || "Error interno del servidor",
      });
    }
  }
}

export default AuthController;
