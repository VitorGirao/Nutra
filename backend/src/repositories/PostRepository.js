import { db } from "../config/firebaseAdmin.js";

const COLLECTION = "posts";

class PostRepositoryClass {
  async findAll() {
    const snapshot = await db.collection(COLLECTION).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}

export const PostRepository = new PostRepositoryClass();
