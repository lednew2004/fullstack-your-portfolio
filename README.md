# YourFolio - Backend

Um aplicativo moderno e completo para criar e gerenciar portfólios profissionais. Construído com Next.js, Prisma, Stripe.

## 📋 Sobre o Projeto

YourFolio é uma plataforma que permite aos desenvolvedores criar portfólios profissionais, gerenciar projetos, skills (tecnologias) e links sociais. O aplicativo oferece:

- ✅ Autenticação segura com Next Auth
- ✅ Perfis de usuário customizáveis
- ✅ Gerenciamento de projetos e portfólio
- ✅ Sistema de skills e tecnologias
- ✅ Links para redes sociais
- ✅ Integração com Stripe para planos VIP
- ✅ Upload de imagens via Cloudinary
- ✅ Banco de dados PostgreSQL com Prisma

## 🛠️ Stack Tecnológico

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js 16.2.4
- **ORM**: Prisma 7.8.0
- **Banco de Dados**: PostgreSQL
- **Autenticação**: NextAuth.js 5.0.0-beta
- **Pagamentos**: Stripe
- **Upload de Imagens**: Cloudinary
- **Segurança**: bcryptjs, JWT
- **Validação**: TypeScript

### Frontend
- **React**: 19.2.4
- **Styling**: Tailwind CSS 4
- **Ícones**: React Icons

## 📋 Requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados:

- **Node.js** >= 18.x
- **npm** >= 8.x ou **yarn**
- **Git**
- **PostgreSQL** >= 12

### Serviços Externos (Necessários)
- Conta no **Stripe** (para pagamentos)
- Conta no **Cloudinary** (para upload de imagens)

## 🚀 Instalação

### 1. Clone o Repositório

```bash
git clone <https://github.com/lednew2004/fullstack-your-portfolio.git>
```

### 2. Instale as Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Preencha as variáveis de ambiente no arquivo `.env.local`:

```env
# Banco de Dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/yourfolio"

# Autenticação
JWT_SECRET="sua-chave-secreta-aleatória"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PRICE_ID="price_..."
STRIPE_SUBSCRIPTION_PRICE_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUB_KEY="pk_test_..."

# Cloudinary
CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_API_KEY="sua-api-key"
CLOUDINARY_API_SECRET="sua-api-secret"
```

### 4. Configure o Banco de Dados

#### Opção A: Usando PostgreSQL Local

```bash
# Crie um banco de dados
createdb yourfolio

# Execute as migrations
npx prisma migrate deploy
```

#### Opção B: Usando Docker (Recomendado)

O projeto inclui um arquivo `docker-compose.yml` com PostgreSQL pré-configurado:

```bash
docker-compose up -d
```

Isso iniciará um container PostgreSQL na porta 5432 com as credenciais:
- **Usuário**: postgres
- **Senha**: password
- **Banco**: yourfolio

### 5. Gere o Prisma Client

```bash
npx prisma generate
```

### 6. (Opcional) Popule o Banco de Dados

```bash
npx prisma db seed
```

## 📁 Estrutura do Projeto

```
backend/
├── app/
│   ├── actions/              # Server actions do Next.js
│   ├── api/                  # Rotas API (Stripe, etc)
│   ├── components/           # Componentes React reutilizáveis
│   ├── (pages)/              # Páginas da aplicação
│   │   ├── login/
│   │   ├── register/
│   │   ├── pricing/
│   │   └── profile/
│   ├── data/                 # Dados estáticos
│   ├── hooks/                # React hooks customizados
│   ├── lib/                  # Utilitários e helpers
│   ├── u/                    # Rotas dinâmicas de usuários
│   ├── layout.tsx            # Layout raiz
│   ├── page.tsx              # Página inicial
│   └── globals.css           # Estilos globais
├── prisma/
│   ├── schema.prisma         # Definição do banco de dados
│   ├── seed.ts               # Script para popular BD
│   └── migrations/           # Histórico de migrações
├── generated/
│   └── prisma/               # Cliente Prisma gerado
├── public/                   # Arquivos estáticos
├── .env.example              # Exemplo de variáveis de ambiente
├── package.json              # Dependências e scripts
├── tsconfig.json             # Configuração TypeScript
├── next.config.ts            # Configuração Next.js
├── tailwind.config.ts        # Configuração Tailwind CSS
└── postcss.config.mjs        # Configuração PostCSS
```

## 🔧 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev
```

Inicia o servidor de desenvolvimento em `http://localhost:3000`. O servidor recarrega automaticamente quando você faz mudanças.

### Build (Produção)

```bash
npm run build
```

Compila a aplicação para produção:
1. Gera o cliente Prisma
2. Aplica as migrations do banco de dados
3. Constrói a aplicação Next.js otimizada

### Produção

```bash
npm start
```

Inicia o servidor de produção. Execute `npm run build` primeiro.

### Prisma CLI

```bash
# Abrir Prisma Studio (interface visual do BD)
npx prisma studio

# Ver status das migrations
npx prisma migrate status

# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Resetar banco de dados (CUIDADO: deleta todos os dados)
npx prisma migrate reset
```

## 🗄️ Modelo de Dados

### User (Usuário)
- Identificação única (UUID)
- Informações de perfil (nome, username, email)
- Biografia e imagem de perfil
- Sistema de autenticação (JWT + bcrypt)
- Status VIP para planos premium

### Projects (Projetos)
- Título e descrição
- URL do projeto
- Imagem de capa
- Associação com tecnologias (skills)
- Relacionado a um usuário

### Techs (Tecnologias/Skills)
- Nome único
- Relação muitos-para-muitos com projetos
- Relação muitos-para-muitos com usuários (como skills)

### Links (Links Sociais)
- Tipo (GitHub, Instagram, LinkedIn, Twitter)
- URL
- Associado a um usuário

## 🔐 Autenticação

O projeto usa **NextAuth.js** com adaptador Firebase:

- Autenticação segura
- Sessões gerenciadas automaticamente
- Suporte a múltiplos provedores

## 💳 Integração com Stripe

O projeto integra pagamentos com Stripe:

- Checkout de planos
- Webhooks para confirmação de pagamentos
- Portal do cliente para gerenciar assinatura

## 📸 Upload de Imagens

Imagens são hospedadas no **Cloudinary**:

- Compressão automática de imagens
- CDN global para melhor performance
- API para upload durante o formulário

## 🌍 Variáveis de Ambiente Detalhadas

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | String de conexão PostgreSQL | `postgresql://user:pass@localhost/db` |
| `JWT_SECRET` | Chave secreta para tokens JWT | `sua-chave-aleatória-forte` |
| `STRIPE_SECRET_KEY` | Chave secreta Stripe | `sk_test_...` |
| `STRIPE_PRICE_ID` | ID do produto Stripe | `price_...` |
| `STRIPE_WEBHOOK_SECRET` | Chave webhook Stripe | `whsec_...` |
| `NEXT_PUBLIC_STRIPE_PUB_KEY` | Chave pública Stripe | `pk_test_...` |
| `CLOUDINARY_CLOUD_NAME` | Nome da nuvem Cloudinary | `seu-cloud-name` |
| `CLOUDINARY_API_KEY` | API Key Cloudinary | `123456789` |
| `CLOUDINARY_API_SECRET` | API Secret Cloudinary | `abc...` |

## 🚀 Deploy

### Preparar para Produção

```bash
# Testar build
npm run build

# Verificar variáveis de ambiente em produção
# Certifique-se de que todas as variáveis estão configuradas corretamente
```

### Deploy em Plataformas Populares

#### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

#### Heroku
```bash
heroku create seu-app-name
heroku addons:create heroku-postgresql
git push heroku main
```

## 🐛 Troubleshooting

### Erro: "DATABASE_URL is not set"
- Certifique-se de que o arquivo `.env.local` existe
- Verifique se `DATABASE_URL` está definido corretamente
- Reinicie o servidor de desenvolvimento

### Erro: "Prisma Client not generated"
```bash
npx prisma generate
```

### Erro de migração
```bash
# Resete o banco de dados (em desenvolvimento)
npx prisma migrate reset

# Ou sincronize o schema
npx prisma db push
```

### Banco de dados recusa conexão
- Verifique se PostgreSQL está rodando
- Confirme credenciais em `DATABASE_URL`
- Se usando Docker: `docker-compose up -d`

## 📝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
2. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
3. Push para a branch (`git push origin feature/MinhaFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Última atualização**: Maio de 2026
