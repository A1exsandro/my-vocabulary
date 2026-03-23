# Diagnóstico de Estrutura e Melhorias

## Resumo do Diagnóstico

O projeto está funcional para build e lint, com melhorias estruturais já aplicadas na camada de API e na reutilização de componentes. Ainda há espaço para evoluir para organização completa por feature e adicionar testes automatizados.

## Melhorias Aplicadas

1. Qualidade estática corrigida.
- `src/pages/Categories.tsx`: correção do fluxo de carregamento e dependências de hooks.
- `src/pages/Category.tsx`: correção do fluxo de carregamento e dependências de hooks.
- `src/components/Card.tsx`: remoção de `any`.
- `src/service/keycloak.ts`: `let` substituído por `const`.

2. Camada de API extraída das páginas.
- Novo cliente Axios central: `src/service/apiClient.ts`.
- Serviços dedicados:
  - `src/service/categoryApi.ts`
  - `src/service/wordApi.ts`

3. Reuso de UI para formulários de criação.
- Novo componente `src/components/CreateItemModal.tsx`.
- Reaproveitado em `Categories` e `Category`.

4. Duplicidade de store removida.
- Remoção de `src/store/userStore.ts` (não utilizado).
- Tipagem compartilhada de usuário em `src/types/user.ts`.

## Melhorias Pendentes

### Prioridade Média

1. Migrar estrutura para modelo por feature.

Sugestão:

```text
src/
  app/
    router/
    providers/
  features/
    auth/
      routes/
      store/
      services/
    categories/
      api/
      hooks/
      components/
      pages/
    words/
      api/
      hooks/
      components/
      pages/
  shared/
    components/
    types/
    lib/
```

2. Extrair lógica repetida de modal/formulário para componentes reutilizáveis.
- Parcialmente concluído com `CreateItemModal`; ainda é possível evoluir para estados e validações compartilhadas via hooks.

3. Padronizar tratamento de erro e loading.
- Criar utilitários para mensagens de erro da API.
- Padronizar estados assíncronos por hook (`isLoading`, `error`, `refetch`).

4. Definir cliente Axios central com interceptors.
- `baseURL` única.
- anexo automático de token do Keycloak quando necessário.
- tratamento uniforme para `401/403`.

### Prioridade Baixa

1. Adicionar testes.
- Unitários para stores e hooks.
- Integração para páginas críticas (fluxo de login, listagem, criação).

2. Revisar componentes não utilizados e mocks legados.
- `NewCategory.tsx` e arquivos de mock podem virar pasta de sandbox/dev-only.

3. Incluir alias de import no TypeScript/Vite (`@/`).
- Reduz caminhos relativos longos.

## Estado dos Comandos (2026-03-23)

- `npm run build`: OK
- `npm run lint`: OK

## Plano de Evolução Recomendado

1. Sprint 1: adicionar interceptors de autenticação no `apiClient`.
2. Sprint 2: criar hooks por feature (`useCategories`, `useWords`) para desacoplar páginas.
3. Sprint 3: reorganizar pastas para `features/`.
4. Sprint 4: incluir testes e CI de qualidade.
