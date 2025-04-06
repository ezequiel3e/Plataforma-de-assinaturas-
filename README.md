# Sistema de Assinaturas

Sistema de assinaturas digital desenvolvido com React, Vite e TypeScript.

## Tecnologias Utilizadas

- React 18
- Vite
- TypeScript
- TailwindCSS
- Shadcn/ui
- React Router DOM
- React Query
- React Hook Form
- Zod

## Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd sistema-assinaturas
```

2. Instale as dependências:
```bash
npm install
```

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## Build

Para criar uma build de produção:

```bash
npm run build
```

Para criar uma build com legacy peer deps (recomendado para deploy):

```bash
npm run build:deploy
```

## Deploy

### Vercel

O projeto está configurado para deploy automático no Vercel. Basta conectar o repositório e o Vercel detectará automaticamente as configurações necessárias.

### Netlify

O projeto também está configurado para deploy no Netlify. Você pode fazer o deploy de duas maneiras:

1. Conectando o repositório ao Netlify
2. Fazendo deploy manual através do comando `netlify deploy`

## Estrutura do Projeto

```
├── public/
│   └── _redirects        # Configuração de redirecionamento para SPA
├── src/
│   ├── components/       # Componentes React reutilizáveis
│   ├── pages/           # Páginas da aplicação
│   ├── hooks/           # Custom hooks
│   ├── services/        # Serviços e APIs
│   ├── utils/           # Funções utilitárias
│   └── main.tsx         # Ponto de entrada da aplicação
├── netlify.toml         # Configuração do Netlify
├── vercel.json          # Configuração do Vercel
└── vite.config.ts       # Configuração do Vite
```

## Licença

MIT
