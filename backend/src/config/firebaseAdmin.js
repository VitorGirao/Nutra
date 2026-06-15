import fs from "node:fs";
import path from "node:path";
import admin from "firebase-admin";

const serviceAccountPath = path.resolve(
  globalThis.process?.cwd(),
  globalThis.process?.env?.FIREBASE_SERVICE_ACCOUNT_PATH ||
    "./serviceAccount.json",
);

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(
    `Firebase service account file not found at: ${serviceAccountPath}`,
  );
}

if (admin.apps.length === 0) {
  const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf-8"),
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
