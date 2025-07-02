# Event Buddy

Aplicativo mobile desenvolvido em React Native para explorar, favoritar e participar de eventos locais. Utiliza Firebase para autenticação, armazenamento e gerenciamento dos dados.



**Funcionalidades**
* Cadastro e login de usuários com Firebase Authentication.
* Navegação entre telas usando React Navigation (stack e bottom tabs).
* Listagem de eventos disponíveis com detalhes, imagens e localização.
* Favoritar eventos, com persistência no Firestore.
* Participar e cancelar participação em eventos.
* Visualizar eventos que o usuário está participando na tela de perfil.
* Visualizar eventos favoritos do usuário.
* Atualização dinâmica da lista de eventos favoritos e participações.
* Feedback visual com Toast messages para ações do usuário.

**Estrutura do Projeto**
* App.js: Configuração principal da navegação, AuthProvider e Toast.
* FirebaseConfig.js: Configuração do Firebase e exportação dos serviços de autenticação e Firestore.
* context/AuthContext.js: Contexto React para gerenciar o estado do usuário autenticado.
* screens/Login.js: Tela de login com formulário para email e senha.
* screens/Signup.js: Tela de cadastro de usuário.
* screens/HomeScreen.js: Tela principal com lista de eventos e possibilidade de favoritar e participar.
* screens/ProfileScreen.js: Tela do perfil do usuário que lista eventos que ele participa e permite cancelar participação.
* screens/FavoritesScreen.js: Tela que lista os eventos favoritos do usuário, permitindo desmarcar favoritos — funcionamento semelhante ao ProfileScreen.
* services/eventService.js: Funções para alternar favorito e participação nos eventos no Firestore.
* services/firebaseAuth.js: Funções para cadastro e login usando Firebase Authentication.

**Tecnologias**
* React Native
* Firebase (Auth e Firestore)
* React Navigation (stack e bottom tabs)
* react-native-toast-message para notificações

**Como Rodar**
* Clone o repositório: <url-do-repo>
* Instale as dependências:
* Configure o Firebase:
  * Crie um projeto no Firebase Console.
  * Ative Authentication (Email/Password).
  * Crie a Firestore Database em modo test.
  * Atualize firebaseConfig.js com suas credenciais do Firebase.

**Estrutura das Coleções no Firestore**

* eventos
  * titulo (string) — Título do evento.
  * descricao (string) — Descrição detalhada.
  * data (timestamp) — Data e hora do evento.
  * local (string) — Local do evento.
  * imagem (string) — URL da imagem do evento.
  * favoritos (array) — Lista de userIds que favoritaram o evento.
  * participantes (array) — Lista de userIds que participam do evento.

**Contato**

Dúvidas e contribuições são bem-vindas!

Meu email é luanahonorio.ferreira@gmail.com

Meu perfil no LinkedIn é [@luanahoferreira](https://www.linkedin.com/in/luanahoferreira/)
