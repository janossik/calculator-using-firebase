import { logger, setGlobalOptions } from "firebase-functions/v2";
import { onDocumentWritten, onDocumentDeleted } from "firebase-functions/v2/firestore";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";

setGlobalOptions({ maxInstances: 10 });

initializeApp();
const db = getFirestore();

export const saveToCommunication = onDocumentWritten("users/{userId}/calculations/{docId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    return logger.error("No snapshot associated with the event", { structuredData: true });
  }
  const data = snapshot.after.data();
  if (!data) {
    return logger.error("No data associated with the event", { structuredData: true });
  }
  try {
    await db.doc(`communications/${event.params.userId}-${event.params.docId}`).set(data, { merge: true });
  } catch (e) {
    logger.error(e, { structuredData: true });
  }
});

export const deleteFromCommunication = onDocumentDeleted("users/{userId}/calculations/{docId}", async (event) => {
  try {
    await db.doc(`communications/${event.params.userId}-${event.params.docId}`).delete();
  } catch (e) {
    logger.error(e, { structuredData: true });
  }
});
