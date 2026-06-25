import { db } from "../config/firebaseAdmin.js";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION = "nutricionistas";

class NutricionistaRepositoryClass {
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

  async create(dadosNutricionista) {
    const docRef = await db.collection(COLLECTION).add(dadosNutricionista);
    return { id: docRef.id, ...dadosNutricionista };
  }

  async findByEmail(email) {
    const snapshot = await db.collection(COLLECTION).where("email", "==", email).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  async findByCrn(crn) {
    const snapshot = await db.collection(COLLECTION).where("crn", "==", crn).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  async update(nutriId, dadosAtualizados) {
    await db.collection(COLLECTION).doc(nutriId).update(dadosAtualizados);
  }

  async addFavorito(nutriId, postId) {
    await db.collection(COLLECTION).doc(nutriId).update({
      "id posts salvos": FieldValue.arrayUnion(postId)
    });
  }

  async removeFavorito(nutriId, postId) {
    await db.collection(COLLECTION).doc(nutriId).update({
      "id posts salvos": FieldValue.arrayRemove(postId)
    });
  }
}

export const NutricionistaRepository = new NutricionistaRepositoryClass();