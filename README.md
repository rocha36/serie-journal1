# 📺 Serie Journal

Seu diário pessoal de séries. Organize, acompanhe e registre tudo em um único lugar.

---

## 🎬 Demonstração

[![Serie Journal](https://img.youtube.com/vi/w6cAyQ88-hc/0.jpg)](https://youtu.be/w6cAyQ88-hc)

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior
- Chave de API gratuita da OMDB: https://www.omdbapi.com/apikey.aspx
- **API `serieJournal-api` (Back-end) ativa e rodando localmente na porta 5000**

---

### Instalação e execução

1. Extraia o arquivo `.zip` enviado e abra o terminal na pasta raiz do projeto (`serie-journal`).

2. Instale as dependências:

```bash
npm install

```

3. Crie o arquivo `.env` na raiz do projeto:

```text
VITE_OMDB_API_KEY=sua_chave_aqui

```

4. Inicie o servidor de desenvolvimento do Front-end:

```bash
npm run dev

```

5. Acesse no navegador:
   http://localhost:5173

---

## 🧩 Descrição dos Componentes

A aplicação foi estruturada de forma modular, dividindo as responsabilidades da interface em componentes funcionais e reutilizáveis:

- **`App.jsx`:** Componente principal da aplicação. Controla o estado global das séries assistidas, gerencia o roteamento entre as páginas e centraliza as funções de requisição assíncrona (GET, POST, PUT, DELETE) conectando o app à API local.
- **`NavBar` (em `components/`):** Barra de navegação fixa no topo do sistema, permitindo a alternância rápida e dinâmica entre as visões da aplicação.
- **`SerieForm` (em `components/`):** Formulário inteligente que atua tanto na criação de novos registros quanto na edição de séries existentes. Ele se comunica em tempo real com a API da OMDb para coletar detalhes técnicos e imagens de pôsteres com base no título digitado.
- **`SerieList` (em `components/`):** Gerenciador de listagem. Recebe a coleção de séries do componente principal, realiza o mapeamento dos dados e organiza os cartões ordenadamente na tela, além de disponibilizar as ações de edição e exclusão.
- **Páginas `Home` e `Sobre` (em `pages/`):** Componentes estruturais de rota. A `Home` encapsula o painel operacional de gerenciamento de séries e a página `Sobre` detalha os objetivos do projeto.
- **`serieApi.js` (em `services/`):** Módulo responsável por isolar a configuração do Axios, centralizando a URL base da API (`http://localhost:5000`) para manter as requisições HTTP organizadas fora da lógica visual.

---

### Build para produção

```bash
npm run build

```

Os arquivos otimizados serão gerados na pasta `dist/`.

---

## 🧪 Verificação de Qualidade e Validação

Para garantir a estabilidade da aplicação, integridade das rotas e aderência às boas práticas de desenvolvimento antes da entrega, foram executados os seguintes procedimentos de validação:

1. **Análise Estática de Código (Linting):**
   Execução do corretor de sintaxe para garantir a ausência de variáveis mortas, erros estruturais ou quebras de padrões no ecossistema Vite/React:

```bash
npm run lint

```

2. **Testes de Integração de Fluxo (API Endpoints):**
   Validação manual do ciclo completo das requisições HTTP (`GET` para renderização da grade, `POST` para criação e persistência de registros, e tratamento ativo de respostas com status `404` e `500` convertidos nativamente em JSON no ambiente back-end).

---

### Persistência de Dados

Os dados deste projeto **não utilizam o localStorage** do navegador. As informações coletadas são enviadas de forma assíncrona por meio de requisições HTTP para a API back-end `serieJournal-api` rodando localmente em `http://localhost:5000`, onde são persistidas e gerenciadas diretamente no servidor.

---

_Serie Journal • 2026_
