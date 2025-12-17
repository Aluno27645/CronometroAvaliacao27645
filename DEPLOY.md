# Guia de Deploy na Vercel

## Passos para Deploy

### 1. Preparar o Repositório Git

```bash
git init
git add .
git commit -m "Initial commit - Sistema de Cronómetros"
```

### 2. Criar Repositório no GitHub

1. Aceda a https://github.com/new
2. Crie um novo repositório
3. Siga as instruções para adicionar o remote:

```bash
git remote add origin https://github.com/SEU_USERNAME/SEU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

### 3. Deploy na Vercel

1. Aceda a https://vercel.com
2. Faça login com a sua conta GitHub
3. Clique em "Add New..." → "Project"
4. Selecione o repositório do GitHub
5. A Vercel detetará automaticamente as configurações do Next.js
6. Clique em "Deploy"

### 4. Configurações Automáticas

A Vercel detetará automaticamente:
- Framework: Next.js
- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install`

### 5. URLs de Acesso

Após o deploy, terá acesso a:
- **URL Principal**: `https://seu-projeto.vercel.app`
- **Dashboard**: `https://seu-projeto.vercel.app/dashboard`
- **Projeção**: `https://seu-projeto.vercel.app/projection`

### 6. Deploy Automático

Cada push para o branch `main` acionará automaticamente um novo deploy.

## Funcionalidades na Produção

✅ **Sincronização em Tempo Real**: Múltiplos dispositivos podem aceder simultaneamente
✅ **Performance**: Next.js otimizado para produção
✅ **Responsivo**: Funciona em desktop, tablet e mobile
✅ **SSL Automático**: HTTPS incluído gratuitamente

## Suporte

Para questões sobre o deploy, consulte:
- Documentação Vercel: https://vercel.com/docs
- Documentação Next.js: https://nextjs.org/docs
