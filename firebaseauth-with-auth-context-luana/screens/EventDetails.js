import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../firebaseConfig";
import { toggleFavorite, toggleParticipation } from "../services/eventService";

export default function EventDetails({ route }) {
  const { event } = route.params;
  const userId = auth.currentUser?.uid;

  const [isFavorited, setIsFavorited] = useState(false);
  const [isParticipating, setIsParticipating] = useState(false);

  useEffect(() => {
    if (event && userId) {
      setIsFavorited(event.favoritos?.includes(userId));
      setIsParticipating(event.participantes?.includes(userId));
    }
  }, [event, userId]);

  const handleToggleFavorite = async () => {
    await toggleFavorite(event.id);
    setIsFavorited(!isFavorited);
  };

  const handleToggleParticipation = async () => {
    await toggleParticipation(event.id);
    setIsParticipating(!isParticipating);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{event.titulo}</Text>
      <Text>{event.descricao}</Text>

      <Button
        title={isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        onPress={handleToggleFavorite}
      />

      <Button
        title={isParticipating ? "Cancelar Participação" : "Participar"}
        onPress={handleToggleParticipation}
      />
    </View>
  );
}


