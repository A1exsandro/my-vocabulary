# My Vocabulary

Aplicação web em React para estudo de vocabulário com autenticação via Keycloak, navegação por categorias e gerenciamento de palavras.

## Objetivo

Centralizar o aprendizado de vocabulário em categorias por usuário, com suporte a:
- login autenticado
- listagem de categorias
- listagem de palavras por categoria
- criação de categorias e palavras

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- React Router 7
- Zustand
- Axios
- Keycloak (`keycloak-js`)
- Deploy: Docker + Nginx + Kubernetes

## Estrutura Atual

```text
src/
  components/      # componentes visuais e interativos
  pages/           # telas principais
  routes/          # proteção de rotas
  service/         # integração com Keycloak e camada de API
  store/           # estado global (Zustand)
  types/           # contratos de dados
  mock/            # dados mockados
k8s/               # manifests de deploy
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz com base no `.env.example`:

```env
VITE_KEYCLOAK_URL=
VITE_REALM=
VITE_CLIENT_ID=
VITE_BASE_URL_API=
```

## Rodando Localmente

Pré-requisitos:
- Node.js 20+
- npm 10+

Comandos:

```bash
npm install
npm run dev
```

Aplicação em desenvolvimento: `http://localhost:5173`.

## Scripts

```bash
npm run dev      # sobe ambiente local
npm run build    # build de produção (tsc + vite)
npm run preview  # serve build localmente
npm run lint     # análise estática
```

## Build e Deploy

### Docker

```bash
docker build -t registry.nst.art.br/vocabulary-app:0.0.2 -f Dockerfile .
docker push registry.nst.art.br/vocabulary-app:0.0.2
```

### Kubernetes

Os manifests estão em `k8s/`:
- `deployment.yaml`
- `service.yaml`
- `ingress.yaml`

## Fluxo de Navegação

Rotas principais:
- `/` -> Home
- `/profile/:userId` -> Perfil
- `/profile/:userId/categories` -> Categorias
- `/profile/:userId/category/:categoryId` -> Palavras da categoria

As rotas passam por `ProtectedRoutes`, que:
- inicializa sessão no Keycloak
- força login quando necessário
- tenta renovar token automaticamente
- encerra sessão por inatividade

## Documentação Técnica

- Diagnóstico e melhorias estruturais: `docs/ESTRUTURA_E_MELHORIAS.md`
- Arquitetura funcional do app: `docs/ARQUITETURA.md`

## Estado Atual de Qualidade

Validação realizada em 2026-03-23:
- `npm run build`: OK
- `npm run lint`: OK

## Melhorias Aplicadas

- Correção dos erros/warnings de lint e ajustes de hooks.
- Tipagem forte para usuário (`src/types/user.ts`) e remoção de `any` em `Card`.
- Criação de camada de API:
  - `src/service/apiClient.ts`
  - `src/service/categoryApi.ts`
  - `src/service/wordApi.ts`
- Extração do modal de criação para componente reutilizável:
  - `src/components/CreateItemModal.tsx`
- Remoção de store duplicada não utilizada (`src/store/userStore.ts`).
