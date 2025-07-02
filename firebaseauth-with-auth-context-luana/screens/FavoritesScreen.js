import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebaseConfig";

export default function FavoritesScreen() {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
const fetchFavoritos = async () => {
  try {
    const snapshot = await database.collection("eventos")
      .where("favoritos", "array-contains", user.uid)
      .get();

    const eventosFavoritos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setFavoritos(eventosFavoritos);
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const snapshot = await database.collection("eventos")
          .where("favoritos", "array-contains", user.uid)
          .get();

        const eventosFavoritos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFavoritos(eventosFavoritos);
      } catch (error) {
        console.log("Erro ao buscar favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, [user]);

  const desfavoritar = async (eventoId, favoritos) => {
    const userId = user.uid;
    const novoFavoritos = favoritos.filter(id => id !== userId);
    await database.collection("eventos").doc(eventoId).update({ favoritos: novoFavoritos });
    setFavoritos(prev => prev.filter(e => e.id !== eventoId));
  };

  if (loading) return <Text>Carregando favoritos...</Text>;

  if (favoritos.length === 0) return <Text>Você ainda não favoritou nenhum evento.</Text>;

  return (
    
    <ScrollView style={styles.container}
  contentContainerStyle={{ paddingBottom: 60 }} >
  <TouchableOpacity
  style={styles.refreshButton}
  onPress={() => {
    setLoading(true);
    fetchFavoritos();
  }}
>
  <Text style={styles.refreshText}>🔄 Atualizar</Text>
</TouchableOpacity>
      {favoritos.map(evento => (
        <View key={evento.id} style={styles.eventoContainer}>
          {/* Imagem */}
          {evento.imagem ? (
            <Image source={{ uri: evento.imagem }} style={styles.imagem} />
          ) : null}

          <Text style={styles.titulo}>{evento.titulo}</Text>
          <Text>{evento.descricao}</Text>
            <Text style={styles.local}>Local: {evento.local}</Text>
<Text style={styles.participantes}>
  Participantes: {evento.participantes?.length || 0}
</Text>

          <TouchableOpacity
            style={[styles.button, styles.desfavoritarButton]}
            onPress={() => desfavoritar(evento.id, evento.favoritos)}
          >
            <Text style={styles.buttonText}>Desfavoritar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  eventoContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  imagem: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  titulo: { fontWeight: "bold", fontSize: 16 },
  participantes: {  marginTop: 5,  color: "#555"},
  local: { fontStyle: "italic", marginTop: 5 },
  button: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#f44336",
    alignItems: "center",
  },
  desfavoritarButton: {},
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});




