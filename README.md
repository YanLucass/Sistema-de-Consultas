# Sistema de Consultas

Este é um sistema fullstack para facilitar a marcação de consultas online para pessoas do meu bairro. Ele foi desenvolvido com uma API RESTful usando Node.js e TypeScript no backend,
e React.js no frontend.

Link do projeto demonstrado em vídeo: https://www.linkedin.com/feed/update/urn:li:activity:7152840465573130240/

## Rodando o Projeto Localmente

Siga os passos abaixo para rodar o projeto localmente em sua máquina.

### Clonando o Repositório

git clone https://github.com/YanLucass/Sistema-de-Consultas.git


### Instalando dependências

# Instale as dependências do backend
cd Sistema-de-Consultas/backend
npm install

# Instale as dependências do frontend
cd ../frontend
npm install


### Configurando Variáveis de Ambiente

Crie um arquivo .env na pasta do backend e preencha as variáveis de ambiente necessárias:

DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=exemplo
DB_PASSWORD=123
DB_DATABASE=consulta
PORT=5000
SECRET=

### Construindo tabelas

cd ../backend
Execute o seguinte comando no terminal do backend para construir as tabelas: npm run typeorm -- -d ./src/shared/typeorm/index.ts migration:run

### Iniciar

na pasta de backend e front dê npm start.

O projeto estará disponível em:  http://localhost:3000
Documentaçao das rotas:  http://localhost:5000/docs




