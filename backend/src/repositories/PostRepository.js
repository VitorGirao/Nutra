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
}

export const PostRepository = new PostRepositoryClass();