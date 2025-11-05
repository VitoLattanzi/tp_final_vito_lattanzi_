
import User from "../models/User.model.js";

class UserRepository {
  static async create(name, email, password) {
    try {
      // Mongoose usa create(), no insertOne()
      return await User.create({
        name,
        email,
        password,
        verified_email: false,
        active: true,
      });
    } catch (error) {
      console.error("[SERVER ERROR]: no se pudo crear el usuario", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await User.find({ active: true });
    } catch (error) {
      console.error("[SERVER ERROR]: no se pudo obtener la lista de usuarios", error);
      throw error;
    }
  }

  static async getById(user_id) {
    try {
      return await User.findById(user_id);
    } catch (error) {
      console.error(`[SERVER ERROR]: no se pudo obtener el usuario con id ${user_id}`, error);
      throw error;
    }
  }

  static async getByEmail(email) {
    try {
      return await User.findOne({ email, active: true });
    } catch (error) {
      console.error(`[SERVER ERROR]: no se pudo buscar el usuario con email ${email}`, error);
      throw error;
    }
  }

  static async deleteById(user_id) {
    try {
      return await User.findByIdAndDelete(user_id);
    } catch (error) {
      console.error(`[SERVER ERROR]: no se pudo eliminar el usuario con id ${user_id}`, error);
      throw error;
    }
  }

  static async updateById(user_id, update_user) {
    try {
      return await User.findByIdAndUpdate(user_id, update_user, { new: true });
    } catch (error) {
      console.error(`[SERVER ERROR]: no se pudo actualizar el usuario con id ${user_id}`, error);
      throw error;
    }
  }
}

export default UserRepository;
