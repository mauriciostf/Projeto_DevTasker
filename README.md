# 🚀 DevTasker — Sistema de Gestão de Tarefas de Equipe

Projeto desenvolvido como atividade final do módulo Backend com TypeScript e Express, dentro da metodologia ABP (Aprendizagem Baseada em Projetos).

## 📌 Descrição

O **DevTasker** é um sistema de gestão de tarefas para equipes de desenvolvimento. Ele permite o cadastro e gerenciamento de usuários e tarefas, com autenticação segura e organização por responsabilidades. Ideal para acompanhar o progresso de projetos em equipes ágeis.

## 👥 Equipe

- Maurício Steffen Vieira ([GitHub](https://github.com/mauriciostf))
- Gabriel de Graaf ([GitHub](https://github.com/Gabi-11))
- Cauã Aquiles ([GitHub](https://github.com/CauaRodriguesZ7))

## 🛠️ Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- TypeORM
- MySQL
- JWT (JSON Web Token)
- Bcrypt
- Dotenv
- Reflect-metadata

## ⚙️ Como Rodar o Projeto

### ✅ Pré-requisitos

- Node.js (v18 ou superior)
- MySQL
- Yarn ou npm

### 🚀 Passos para iniciar

```bash
# 1. Clone o repositório
https://github.com/mauriciostf/Projeto_DevTasker.git

# 2. Instale as dependências
yarn install
# ou
npm install

# 3. Crie o arquivo .env na raiz do projeto com o conteúdo abaixo:
cat <<EOT >> .env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME= devtaskerdb
EOT

# 4. Execute as migrations (se houver)
yarn typeorm migration:run
# ou
npm run typeorm migration:run

# 5. Inicie o servidor
yarn dev
# ou
npm start
```



