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
        // 1. Intentamos verificar
        await AuthService.verifyEmail(verification_token);

        // 2. SI SALE BIEN: Redirigimos al Login con ?status=success
        const redirectUrl = `${ENVIRONMENT.URL_FRONTEND}/?verified=true`;
        return response.redirect(303, redirectUrl);
    } catch (error) {
        console.error("ERROR VERIFY EMAIL:", error);
        
        // 3. SI SALE MAL
        // Redirigimos igual al front, pero avisando que falló (?verified=error)
        const redirectUrl = `${ENVIRONMENT.URL_FRONTEND}/?verified=error`;
        return response.redirect(303, redirectUrl);
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
