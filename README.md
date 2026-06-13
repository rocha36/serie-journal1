# 📺 Serie Journal

Seu diário pessoal de séries. Organize, acompanhe e registre tudo em um único lugar.

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior
- Chave de API gratuita da OMDB: https://www.omdbapi.com/apikey.aspx

---

### Instalação e execução

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/serie-journal.git
cd serie-journal
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env` na raiz do projeto:

VITE_OMDB_API_KEY= **\*\*\***

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse no navegador:
   http://localhost:5173

---

### Build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

---

### Testes

O projeto não possui testes automatizados configurados na versão atual. Para adicioná-los no futuro, recomenda-se:

- **Vitest** — testes unitários integrado ao Vite
- **React Testing Library** — testes de componentes
- **MSW (Mock Service Worker)** — mock da OMDB API nos testes

Instalação futura sugerida:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom msw
```

Para rodar os testes (após configuração):

```bash
npm run test
```

---

### Limpar dados salvos

As séries são salvas no localStorage do navegador. Para resetar todos os dados, execute no console do navegador:

```javascript
localStorage.clear();
```

---

_Serie Journal • 2026_
