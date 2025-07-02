import { database, auth } from "../firebaseConfig";

export const toggleFavorite = async (eventId) => {
  const userId = auth.currentUser.uid;
  const eventRef = database.collection("eventos").doc(eventId);
  const eventDoc = await eventRef.get();

  if (!eventDoc.exists) return;

  const favoritos = eventDoc.data().favoritos || [];

  if (favoritos.includes(userId)) {
    await eventRef.update({
      favoritos: database.FieldValue.arrayRemove(userId),
    });
  } else {
    await eventRef.update({
      favoritos: database.FieldValue.arrayUnion(userId),
    });
  }
};

export const toggleParticipation = async (eventId) => {
  const userId = auth.currentUser.uid;
  const eventRef = database.collection("eventos").doc(eventId);
  const eventDoc = await eventRef.get();

  if (!eventDoc.exists) return;

  const participantes = eventDoc.data().participantes || [];

  if (participantes.includes(userId)) {
    await eventRef.update({
      participantes: database.FieldValue.arrayRemove(userId),
    });
  } else {
    await eventRef.update({
      participantes: database.FieldValue.arrayUnion(userId),
    });
  }
};

