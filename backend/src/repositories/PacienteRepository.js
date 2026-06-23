import { db } from "../config/firebaseAdmin.js";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION = "pacientes";

class PacienteRepositoryClass {
  async findAll() {
    const snapshot = await db.collection(COLLECTION).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async findById(id) {
    const docRef = db.collection(COLLECTION).doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return null;
    }

    return { id: snapshot.id, ...snapshot.data() };
  }

  async create(dadosPaciente) {
    const docRef = await db.collection(COLLECTION).add(dadosPaciente);
    return { id: docRef.id, ...dadosPaciente };
  }

  async findByEmail(email) {
    const snapshot = await db.collection(COLLECTION).where("email", "==", email).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  async addFavorito(pacienteId, postId) {
    await db.collection(COLLECTION).doc(pacienteId).update({
      "id posts salvos": FieldValue.arrayUnion(postId)
    });
  }

  async removeFavorito(pacienteId, postId) {
    await db.collection(COLLECTION).doc(pacienteId).update({
      "id posts salvos": FieldValue.arrayRemove(postId)
    });
  }
}

export const PacienteRepository = new PacienteRepositoryClass();