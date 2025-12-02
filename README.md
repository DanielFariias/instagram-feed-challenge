# Instagram Feed Challenge 📸

Aplicação de feed de posts estilo Instagram, desenvolvida como desafio técnico para vaga de Frontend Sênior.

## 🚀 Demonstração

- Feed infinito de posts
- Sistema de likes com atualização otimista
- Modal de detalhes com comentários
- Tema claro/escuro
- Tracking de visualizações

## 📋 Requisitos Implementados

### ✅ Requisitos Funcionais

- [x] Listagem de posts com paginação (infinite scroll)
- [x] Exibição de informações do post (usuário, avatar, data, imagem, legenda, likes, comentários)
- [x] Curtir/Descurtir posts com atualização otimista e rollback em caso de erro
- [x] Modal de detalhes do post
- [x] Listagem de comentários
- [x] Adicionar comentários com atualização otimista
- [x] Registro de posts vistos
- [x] Tracking de tempo de visualização
- [x] Estados de UI (loading, erro, lista vazia)

### ✅ Requisitos Técnicos

- [x] React 18 com TypeScript
- [x] Arquitetura limpa (componentes de apresentação separados da lógica)
- [x] Testes unitários (Vitest + React Testing Library)
- [x] Gerenciamento de estado (Zustand para UI, React Query para dados)
- [x] Simulação de API com delays e erros
- [x] Clean Code e tipagem forte
- [x] Tratamento de erros
- [x] Performance otimizada (React.memo, useMemo, useCallback)

### 🎨 Diferenciais Implementados

- [x] React Query para gerenciamento de dados remotos
- [x] Infinite scroll com Intersection Observer
- [x] Tema claro/escuro persistente
- [x] Optimistic updates em likes e comentários
- [x] Design system com shadcn/ui

## 🛠️ Stack Tecnológica

### Core

- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 5.4+

### Estilização

- **TailwindCSS** 4.1.17 (com Vite Plugin)
- **shadcn/ui** - Componentes reutilizáveis

### Gerenciamento de Estado

- **TanStack Query (React Query)** 5.x - Cache e sincronização de dados
- **Zustand** 5.0.9 - Estado global da UI

### Testes

- **Vitest** 4.0.14
- **React Testing Library** 16.3.0
- **@testing-library/jest-dom** 6.9.1

### Qualidade de Código

- **ESLint** 9.39.1
- **Prettier** 3.7.3
- **EditorConfig**

### Utilitários

- **lucide-react** - Ícones
- **date-fns** (via utils) - Formatação de datas

## 📂 Estrutura do Projeto

```
src/
├── app/                    # Componente principal da aplicação
│   ├── index.tsx
│   └── index.spec.tsx
├── components/             # Componentes React
│   ├── ui/                # Componentes shadcn/ui
│   ├── post/              # Componentes relacionados a posts
│   │   ├── post-card.tsx
│   │   ├── post-list.tsx
│   │   ├── post-details-modal.tsx
│   │   ├── comment-item.tsx
│   │   └── add-comment-form.tsx
│   └── theme-toggle.tsx
├── hooks/                  # Custom hooks
│   ├── use-posts.ts       # Infinite query para posts
│   ├── use-like-post.ts   # Mutation de like
│   ├── use-post-comments.ts
│   ├── use-add-comment.ts
│   ├── use-post-tracking.ts
│   └── use-intersection-observer.ts
├── services/              # Camada de serviços (API mockada)
│   ├── feed-service.ts
│   └── api-simulator.ts
├── state/                 # Zustand stores
│   ├── theme.ts
│   └── tracking.ts
├── types/                 # Tipos TypeScript
│   ├── post.ts
│   ├── user.ts
│   ├── comment.ts
│   └── api.ts
├── utils/                 # Funções utilitárias
│   └── format-date.ts
├── mocks/                 # Dados mockados
│   ├── posts.ts
│   ├── users.ts
│   └── comments.ts
├── tests/                 # Configuração de testes
│   ├── setup.ts
│   └── test-utils.tsx
└── styles/
    └── global.css
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>
cd instagram-feed-challenge

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🧪 Como Rodar os Testes

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com UI
npm run test:ui

# Gerar coverage
npm run test:coverage
```

## 🏗️ Decisões Técnicas

### Gerenciamento de Estado

Optei por usar **duas ferramentas complementares**:

- **React Query**: Para gerenciar dados do servidor (posts, comentários, likes)
  - Cache inteligente
  - Invalidação automática
  - Optimistic updates
  - Estados de loading/error integrados

- **Zustand**: Para estado da UI (tema, tracking de posts)
  - Simples e leve
  - Persistência fácil com middleware
  - Sem boilerplate

### Paginação: Infinite Scroll

Escolhi **infinite scroll** ao invés de botão "Carregar mais" porque:

- Melhor UX em feeds sociais
- Uso do `useInfiniteQuery` do React Query
- Implementação com Intersection Observer (performance)
- Controle de estado de página automático

### Simulação de API

A API é simulada com:

- Delays realistas (300ms - 1s)
- Taxa de erro de 10-15% para testar tratamento de erros
- Dados em memória que persistem durante a sessão
- Promises para simular chamadas assíncronas

### Tracking de Posts

Implementado com:

- **Intersection Observer** para detectar quando o post está visível
- **Zustand** para armazenar dados de visualização
- **localStorage** para persistência
- Timer automático que inicia/para conforme scroll

## 🎨 Features de UX

- ✨ Animações suaves em transições
- 🌓 Dark mode automático baseado em preferência do sistema
- ⚡ Feedback imediato em ações (optimistic updates)
- 💬 Comentários atualizados em tempo real
- 📱 Layout responsivo
- ♿ Suporte a teclado (Enter para enviar comentário)

## 🔮 Possíveis Melhorias Futuras

- [ ] Filtros de posts (por usuário, data, etc)
- [ ] Ordenação de posts
- [ ] Busca de posts
- [ ] Virtualização de lista para performance (react-window)
- [ ] PWA (offline support)
- [ ] Compartilhamento de posts
- [ ] Notificações
- [ ] Upload de imagens
- [ ] Edição de comentários
- [ ] Sistema de replies em comentários

## 📄 Licença

MIT

## 👨‍💻 Autor

Desenvolvido como parte do desafio técnico para vaga de Frontend Sênior.
