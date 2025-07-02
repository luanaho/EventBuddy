import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { signIn } from "../services/firebaseAuth";
import { useAuth } from "../context/AuthContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, resetPassword } = useAuth();

  const handleLogin = async () => {
    try {
      const userCredential = await signIn(email, password);
      setUser(userCredential.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      alert("Por favor, insira seu email para recuperar a senha.");
      return;
    }
    try {
      await resetPassword(email);
    } catch (error) {
      alert("Não foi possível recuperar a senha: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem Vindo</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={handleResetPassword}>
        <Text style={styles.linkText}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupText: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  link: {
    marginTop: 12,
  },
  linkText: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});


