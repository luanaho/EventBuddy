import { database } from "../firebaseConfig"; // ajuste o caminho conforme seu projeto

const seedEvents = async () => {
  const eventos = [
    {
    titulo: "Workshop de Fotografia",
    descricao: "Aprenda técnicas profissionais de fotografia com especialistas.",
    data: new Date("2025-08-05T14:00:00"),
    local: "Porto, Centro Cultural",
    imagem: "https://exemplo.com/imagem-fotografia.jpg",
    favoritos: [],
    participantes: []
  },
  {
    titulo: "Maratona Solidária",
    descricao: "Corrida beneficente para arrecadação de fundos para hospitais.",
    data: new Date("2025-09-10T08:00:00"),
    local: "Coimbra, Jardim Botânico",
    imagem: "https://exemplo.com/imagem-maratona.jpg",
    favoritos: [],
    participantes: []
  },
  {
    titulo: "Festival de Jazz",
    descricao: "Concertos de jazz ao ar livre com artistas nacionais e internacionais.",
    data: new Date("2025-07-25T19:00:00"),
    local: "Faro, Praça da República",
    imagem: "https://exemplo.com/imagem-jazz.jpg",
    favoritos: [],
    participantes: []
  },
  {
    titulo: "Feira de Livros",
    descricao: "Exposição e venda de livros com sessões de autógrafos.",
    data: new Date("2025-10-12T11:00:00"),
    local: "Braga, Biblioteca Municipal",
    imagem: "https://exemplo.com/imagem-livros.jpg",
    favoritos: [],
    participantes: []
  },
  {
    titulo: "Palestra sobre Sustentabilidade",
    descricao: "Debate sobre práticas sustentáveis para empresas e indivíduos.",
    data: new Date("2025-11-05T16:00:00"),
    local: "Aveiro, Auditório da Universidade",
    imagem: "https://exemplo.com/imagem-sustentabilidade.jpg",
    favoritos: [],
    participantes: []
  },
  {
    titulo: "Encontro de Gamers",
    descricao: "Torneios e workshops para entusiastas de games e desenvolvimento.",
    data: new Date("2025-09-20T13:00:00"),
    local: "Lisboa, Centro de Convenções",
    imagem: "https://exemplo.com/imagem-gamers.jpg",
    favoritos: [],
    participantes: []
  },
  {
    titulo: "Mostra de Cinema Independente",
    descricao: "Exibição de curtas e longas metragens independentes.",
    data: new Date("2025-12-01T18:00:00"),
    local: "Porto, Cine Teatro",
    imagem: "https://exemplo.com/imagem-cinema.jpg",
    favoritos: [],
    participantes: []
  }
];

  try {
    for (const evento of eventos) {
      await database.collection("eventos").add(evento);
      console.log(`Evento '${evento.titulo}' adicionado com sucesso!`);
    }
    console.log("Todos os eventos foram adicionados!");
  } catch (error) {
    console.error("Erro ao adicionar eventos:", error);
  }
};

seedEvents();
