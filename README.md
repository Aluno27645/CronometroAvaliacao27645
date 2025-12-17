# Sistema de Cronómetros para Apresentações

Sistema web para gestão de múltiplos cronómetros simultâneos, ideal para apresentações de equipa, debates ou assembleias onde é necessário controlar o tempo de intervenção de diferentes participantes.

## 🎯 Funcionalidades

### Página de Controlo (Dashboard)
- ✅ Criar múltiplos cronómetros numa mesma sessão
- ✅ Configurar nome/identificador para cada cronómetro
- ✅ Definir tempo em minutos e segundos
- ✅ Iniciar/pausar cada cronómetro individualmente
- ✅ Reset individual ou geral de todos os cronómetros
- ✅ Adicionar/remover cronómetros dinamicamente
- ✅ Indicação visual de estados (pausado, em execução, terminado)

### Página de Projeção
- ✅ Visualização em tempo real de todos os cronómetros
- ✅ Sincronização automática com a página de controlo
- ✅ Design limpo e legível à distância
- ✅ Indicação visual quando o tempo termina
- ✅ Destaque do cronómetro ativo
- ✅ Suporte para múltiplos dispositivos visualizarem simultaneamente

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Zustand** - Gestão de estado global
- **React Hooks** - Lógica de componentes

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start
```

## 🎮 Como Usar

1. **Aceder ao sistema**: Abra o navegador em `http://localhost:3000`

2. **Página de Controlo**: 
   - Navegue para `/dashboard`
   - Adicione cronómetros com nome e duração
   - Controle cada cronómetro individualmente
   - Use "Abrir Projeção" para abrir a vista de apresentação

3. **Página de Projeção**:
   - Navegue para `/projection` (ou clique no botão na dashboard)
   - Projete esta página para o público
   - As alterações da dashboard refletem automaticamente

## 📁 Estrutura do Projeto

```
exercicio-cronometro/
├── app/
│   ├── dashboard/        # Página de controlo
│   ├── projection/       # Página de projeção
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Página inicial
│   └── globals.css       # Estilos globais
├── components/
│   ├── TimerCard.tsx     # Card individual de cronómetro
│   └── AddTimerForm.tsx  # Formulário de adição
├── lib/
│   ├── store.ts          # Estado global (Zustand)
│   ├── types.ts          # Tipos TypeScript
│   └── utils.ts          # Funções utilitárias
└── package.json
```

## 🎨 Design

O design foi inspirado em plataformas profissionais de gestão de tempo como o StageTimer.io, com foco em:
- Legibilidade à distância
- Indicadores visuais claros de estado
- Interface intuitiva e responsiva
- Temas escuros para melhor visualização em ambientes de apresentação

## 🌐 Deploy na Vercel

1. Faça push do código para o GitHub
2. Importe o projeto na Vercel
3. A Vercel detetará automaticamente as configurações do Next.js
4. Deploy automático em cada push

## 📝 Notas Técnicas

- **Sincronização**: A sincronização entre páginas é feita através do Zustand store que mantém o estado global
- **Timers**: Cada cronómetro usa `setInterval` para contagem regressiva
- **Estados**: Três estados possíveis: `paused`, `running`, `finished`
- **Tempo negativo**: Quando um cronómetro termina e continua a correr, mostra tempo negativo em vermelho

## 👨‍💻 Desenvolvimento

Desenvolvido como projeto académico para gestão de cronómetros em apresentações e eventos.

## 📄 Licença

Este projeto é de uso académico.
