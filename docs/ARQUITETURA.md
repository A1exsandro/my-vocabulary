# Arquitetura Funcional

## Visão Geral

O frontend é uma SPA React com autenticação obrigatória via Keycloak e navegação interna por React Router.

Fluxo macro:
1. `main.tsx` monta `App`.
2. `App.tsx` define rotas protegidas.
3. `ProtectedRoutes` inicializa Keycloak, valida sessão e libera `Outlet`.
4. Páginas consomem API via Axios diretamente.

## Módulos

- `src/routes/ProtectedRoutes.tsx`
  - autenticação
  - renovação de token
  - logout por inatividade

- `src/store/useAuthStore.ts`
  - usuário autenticado
  - token
  - estado de autenticação

- `src/pages/*`
  - `Home`: entrada do usuário autenticado
  - `Profile`: atalho para áreas do usuário
  - `Categories`: CRUD parcial de categorias (lista + criação)
  - `Category`: CRUD parcial de palavras (lista + criação)

- `src/service/*`
  - `apiClient.ts`: cliente Axios base
  - `categoryApi.ts`: operações de categorias
  - `wordApi.ts`: operações de palavras

- `src/components/*`
  - blocos de UI (navbar, grid, cards, loading)
  - `CreateItemModal`: modal reutilizável para criação

## Rotas

```text
/
/profile/:userId
/profile/:userId/categories
/profile/:userId/category/:categoryId
```

## Dados

Tipos principais:
- `Category`
- `Word`
- `Phrase`

As páginas `Category` e `Categories` consomem serviços de API dedicados.

## Infraestrutura de Deploy

- Build multi-stage no `Dockerfile`
- Entrega de arquivos estáticos no Nginx (`nginx.conf`)
- Manifests Kubernetes em `k8s/`

## Limites Atuais da Arquitetura

- Sem suíte de testes automatizados.
