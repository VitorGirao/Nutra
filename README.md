# Nutra Monorepo (Simples)

Este repositorio foi organizado em duas camadas no mesmo projeto:

- Frontend React + Vite (raiz do repositorio, default)
- Backend Express + Firebase Admin em `backend/`

O frontend nao acessa mais Firestore diretamente nos fluxos de leitura de feed, pesquisa e perfil. Agora ele consome a API HTTP do backend.

## Endpoints da API

- `GET /posts`
- `GET /nutricionistas`
- `GET /nutricionistas/featured?limit=3`
- `GET /nutricionistas/:id`

## Setup

1. Instalar dependencias do frontend (raiz):

```bash
npm install
```

2. Instalar dependencias do backend:

```bash
npm --prefix backend install
```

3. Configurar ambiente do backend:

```bash
copy backend\.env.example backend\.env
```

4. Criar pasta de segredo e adicionar `serviceAccount.json` do Firebase Admin:

```bash
mkdir backend\secrets
```

## Executar localmente

1. Rodar backend (porta `3001`):

```bash
npm --prefix backend run dev
```

2. Em outro terminal, rodar frontend (porta `5173`):

```bash
npm run dev
```

Opcional: definir URL da API no frontend com `VITE_API_BASE_URL` em `.env.local`:

```bash
VITE_API_BASE_URL=http://localhost:3001
```

## Verificacoes executadas

Frontend build:

```bash
npm run build
```

Backend syntax check:

```bash
npm --prefix backend run check
```
