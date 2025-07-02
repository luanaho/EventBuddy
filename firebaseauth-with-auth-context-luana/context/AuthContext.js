import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

// Criação do contexto (Área para partilha de funções e variáveis entre várias aplicações)
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// Função para resetar a senha, recebe o email do usuário
const resetPassword = async (email) => {
  if (!email) {
    alert("Por favor, informe o email para recuperação.");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email, {
      url: 'https://yourapp.page.link/reset',  // ou uma URL válida do seu app/site
      handleCodeInApp: true,
    });
    alert("Email de recuperação enviado.");
  } catch (error) {
    alert("Erro ao enviar email de recuperação: " + error.message);
    console.log(error);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
