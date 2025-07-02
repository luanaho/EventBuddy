import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebaseConfig";
import Toast from "react-native-toast-message";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [participando, setParticipando] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchParticipando = async () => {
    try {
      const snapshot = await database
        .collection("eventos")
        .where("participantes", "array-contains", user.uid)
        .get();

      const eventosParticipando = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setParticipando(eventosParticipando);
    } catch (error) {
      console.log("Erro ao buscar eventos participando:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipando();
  }, [user]);

  const cancelarParticipacao = async (eventoId, participantes) => {
    try {
      const userId = user.uid;
      const novoParticipantes = participantes.filter(id => id !== userId);
      await database.collection("eventos").doc(eventoId).update({ participantes: novoParticipantes });
      setParticipando(prev => prev.filter(e => e.id !== eventoId));
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Você saiu do evento.'
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível sair do evento.'
      });
      console.log("Erro ao cancelar participação:", error);
    }
  };

  if (loading) return <Text>Carregando seus eventos...</Text>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <Text style={styles.title}>Perfil</Text>
      <Text>Usuário: {user?.email}</Text>

      <Text style={styles.subTitle}>Eventos que você participa:</Text>

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => {
          setLoading(true);
          fetchParticipando();
        }}
      >
        <Text style={styles.refreshText}>🔄 Atualizar</Text>
      </TouchableOpacity>

      {participando.length === 0 ? (
        <Text>Você não está participando de nenhum evento.</Text>
      ) : (
        participando.map(evento => (
          <View key={evento.id} style={styles.eventoContainer}>
            {evento.imagem && (
              <Image
                source={{ uri: evento.imagem }}
                style={styles.eventoImagem}
                resizeMode="cover"
              />
            )}
            <Text style={styles.titulo}>{evento.titulo}</Text>
            <Text>{evento.descricao}</Text>
            <Text style={styles.participantes}>
              Total de participantes: {evento.participantes?.length || 0}
            </Text>
            <Text style={styles.local}>Local: {evento.local}</Text>

            <TouchableOpacity
              style={[styles.button, styles.cancelarButton]}
              onPress={() => cancelarParticipacao(evento.id, evento.participantes)}
            >
              <Text style={styles.buttonText}>Deixar de participar</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  eventoContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  eventoImagem: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  titulo: { fontWeight: "bold", fontSize: 16 },
  participantes: { marginTop: 5, fontWeight: "500" },
  local: { fontStyle: "italic", marginTop: 5 },
  button: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#555",
    alignItems: "center",
  },
  cancelarButton: {
    backgroundColor: "#f39c12",
    borderColor: "#b9770e",
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});

