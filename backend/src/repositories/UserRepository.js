import { PacienteRepository } from "./PacienteRepository.js";
import { NutricionistaRepository } from "./NutricionistaRepository.js";

class UserRepositoryClass {
  async findByEmail(email) {
    const paciente = await PacienteRepository.findByEmail(email);
    if (paciente) {
      return {
        tipo_usuario: "Paciente",
        ...paciente,
      };
    }

    const nutricionista = await NutricionistaRepository.findByEmail(email);
    if (nutricionista) {
      return {
        tipo_usuario: "Nutricionista",
        ...nutricionista,
      };
    }

    return null;
  }
}

export const UserRepository = new UserRepositoryClass();
