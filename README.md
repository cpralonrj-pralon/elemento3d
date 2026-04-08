# 🖨️ Elemento 3D — Loja Virtual

> Plataforma de e-commerce para produtos de impressão 3D personalizada, construída com React + Vite no frontend e Node.js + Express no backend.

---

## ✨ Tecnologias

**Frontend**
- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- [React Router DOM 6](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/) — animações
- [Lucide React](https://lucide.dev/) — ícones
- [Stripe.js](https://stripe.com/docs/js) — pagamentos

**Backend**
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [Stripe SDK](https://stripe.com/docs/api) — processamento de pagamentos
- [dotenv](https://github.com/motdotla/dotenv) — variáveis de ambiente
- [CORS](https://github.com/expressjs/cors)

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 18+
- Conta no [Stripe](https://stripe.com) (modo teste)
- npm

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/elemento-3d.git
cd elemento-3d
```

### 2. Configure as variáveis de ambiente

**Frontend (raiz do projeto):**
```bash
cp .env.example .env
```
Edite `.env` e preencha com sua chave pública do Stripe (`pk_test_...`).

**Backend:**
```bash
cp server/.env.example server/.env
```
Edite `server/.env` e preencha com sua chave secreta do Stripe (`sk_test_...`).

### 3. Instale as dependências

```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### 4. Inicie os servidores

Em dois terminais separados:

```bash
# Terminal 1 — Frontend (http://localhost:5173)
npm run dev

# Terminal 2 — Backend (http://localhost:3001)
cd server
npm run dev
```

---

## 📁 Estrutura do Projeto

```
elemento-3d/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── context/         # Contextos React (Carrinho, Auth, etc.)
│   ├── data/            # Dados estáticos de produtos
│   ├── pages/           # Páginas da aplicação
│   ├── App.jsx          # Roteamento principal
│   └── index.css        # Estilos globais
├── server/
│   ├── index.js         # Servidor Express + endpoints Stripe
│   ├── .env.example     # Template de variáveis de ambiente
│   └── package.json
├── public/              # Assets estáticos
├── .env.example         # Template de variáveis do frontend
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔐 Segurança

- **Nunca commite** os arquivos `.env` — eles estão no `.gitignore`
- A chave secreta Stripe (`sk_...`) fica **apenas no backend**
- A chave pública Stripe (`pk_...`) é exposta no frontend via prefixo `VITE_`

---

## 📋 Funcionalidades

- [x] Catálogo de produtos por categoria
- [x] Carrinho de compras dinâmico
- [x] Página de detalhes do produto
- [x] Checkout multi-etapas com Stripe
- [x] Página de conta do usuário
- [x] Solicitação de pedido personalizado
- [x] Design responsivo

---

## 📄 Licença

Este projeto é privado e proprietário. Todos os direitos reservados.
