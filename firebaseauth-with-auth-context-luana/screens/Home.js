import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebaseConfig";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function Home() {
  const { logout, user } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null); // <- controle do expandido

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const snapshot = await database.collection("eventos").get();
        const eventosList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEventos(eventosList);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Não foi possível carregar os eventos.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const handleFavoritar = async (evento) => {
    const userId = user.uid;
    const docRef = database.collection("eventos").doc(evento.id);

    try {
      let novosFavoritos = evento.favoritos || [];
      if (novosFavoritos.includes(userId)) {
        novosFavoritos = novosFavoritos.filter((id) => id !== userId);
      } else {
        novosFavoritos.push(userId);
      }
      await docRef.update({ favoritos: novosFavoritos });

      setEventos(
        eventos.map((ev) =>
          ev.id === evento.id ? { ...ev, favoritos: novosFavoritos } : ev
        )
      );

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: novosFavoritos.includes(userId)
          ? "Evento favoritado!"
          : "Evento desfavoritado!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível atualizar favoritos.",
      });
    }
  };

  const handleParticipar = async (evento) => {
    const userId = user.uid;
    const docRef = database.collection("eventos").doc(evento.id);

    try {
      let novosParticipantes = evento.participantes || [];
      if (novosParticipantes.includes(userId)) {
        novosParticipantes = novosParticipantes.filter((id) => id !== userId);
      } else {
        novosParticipantes.push(userId);
      }
      await docRef.update({ participantes: novosParticipantes });

      setEventos(
        eventos.map((ev) =>
          ev.id === evento.id ? { ...ev, participantes: novosParticipantes } : ev
        )
      );

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: novosParticipantes.includes(userId)
          ? "Você está participando!"
          : "Você deixou de participar!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível atualizar participação.",
      });
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}
  contentContainerStyle={{ paddingBottom: 80 }} >
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Bem-vindo, {user?.email}
      </Text>

      {eventos.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={{ fontSize: 18, color: "#555" }}>Nenhum evento encontrado 😕</Text>
        </View>
      ) : (
        eventos.map((evento) => {
          const isFavorito = evento.favoritos?.includes(user.uid);
          const isParticipando = evento.participantes?.includes(user.uid);
          const isExpanded = expandedId === evento.id;

          return (
            <View
              key={evento.id}
              style={{
                marginBottom: 15,
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
              }}
            >
              {/* Sempre mostrar imagem e título */}
              <TouchableOpacity
                onPress={() =>
                  setExpandedId(isExpanded ? null : evento.id) // alterna expandido
                }
                activeOpacity={0.7}
              >
                {evento.imagem ? (
                  <Image
                    source={{ uri: evento.imagem }}
                    style={{
                      width: "100%",
                      height: 150,
                      borderRadius: 8,
                      marginBottom: 10,
                    }}
                    resizeMode="cover"
                  />
                ) : null}
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {evento.titulo}
                </Text>
              </TouchableOpacity>

              {/* Mostrar detalhes só se expandido */}
              {isExpanded && (
                <>
                  <Text style={{ marginTop: 10 }}>{evento.descricao}</Text>
                  <Text style={{ fontStyle: "italic", marginTop: 5 }}>
                    Local: {evento.local}
                  </Text>
                  <Text style={{ marginTop: 5 }}>
                    Total de participantes: {evento.participantes?.length || 0}
                  </Text>

                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => handleParticipar(evento)}
                      style={{ marginRight: 20, alignItems: "center" }}
                    >
                      <FontAwesome
                        name="hand-o-up"
                        size={24}
                        color={isParticipando ? "green" : "gray"}
                      />
                      <Text>{isParticipando ? "Participando" : "Participar"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleFavoritar(evento)}
                      style={{ alignItems: "center" }}
                    >
                      <FontAwesome
                        name="star"
                        size={24}
                        color={isFavorito ? "gold" : "gray"}
                      />
                      <Text>{isFavorito ? "Favorito" : "Favoritar"}</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          );
        })
      )}

      <Button onPress={logout} title="Logout" />
    </ScrollView>
  );
}

