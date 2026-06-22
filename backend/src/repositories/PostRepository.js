import { db } from "../config/firebaseAdmin.js";

const COLLECTION = "posts";

class PostRepositoryClass {
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

  async create(dadosPost) {
    const docRef = await db.collection(COLLECTION).add(dadosPost);
    return { id: docRef.id, ...dadosPost };
  }

  async delete(id) {
    await db.collection(COLLECTION).doc(id).delete();
  }
}

export const PostRepository = new PostRepositoryClass();
