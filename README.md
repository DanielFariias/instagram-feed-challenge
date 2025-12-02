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

- **React**
- **TypeScript**
- **Vite**

### Estilização

- **TailwindCSS**
- **shadcn/ui**

### Gerenciamento de Estado

- **TanStack Query (React Query)**
- **Zustand**

### Testes

- **Vitest**
- **React Testing Library**
- **@testing-library/jest-dom**

### Qualidade de Código

- **ESLint**
- **Prettier**
- **EditorConfig**

### Utilitários

- **lucide-react**
- **date-fns**

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/DanielFariias/instagram-feed-challenge.git
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

## 👨‍💻 Autor

Desenvolvido por Daniel Farias como parte do desafio técnico para vaga de Frontend Sênior.
