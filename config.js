// ╔══════════════════════════════════════════════════════════════════╗
// ║  NOTLOUSYBOOK PORTFOLIO — SITE CONFIG                          ║
// ║  Edit this file to change EVERYTHING on the site.              ║
// ║  No code editing needed! Just change the values below.         ║
// ╚══════════════════════════════════════════════════════════════════╝

const SITE_CONFIG = {

  // ─── SITE IDENTITY ──────────────────────────────────────────────
  name: 'notlousybook',
  tagline: 'dev from pluto',

  // ─── SOCIAL LINKS ───────────────────────────────────────────────
  links: {
    github: 'https://github.com/notlousybook',
    discord: 'https://discord.com/users/notlousybook',
    youtube: 'https://www.youtube.com/@notlousybook',
  },

  // ─── NAVIGATION ─────────────────────────────────────────────────
  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'YouTube', href: '#youtube' },
    { label: 'About', href: '#about' },
    { label: 'Stack', href: '#stack' },
  ],

  // ─── HERO SECTION ───────────────────────────────────────────────
  hero: {
    typewriterTexts: [
      'self taught from pluto',
      'building random stuff',
      'ai & creative coding',
      'løµsʏ but chill',
    ],
    badge: {
      text: 'DM ON DISCORDD',
      detail: '@notlousybook',
    },
  },

  // ─── PROJECT STATS (shown on main page) ────────────────────────
  projectStats: [
    { target: 35, label: 'repos', icon: 'folder' },
    { target: 29, label: 'stars', icon: 'star' },
    { target: 6, label: 'pinned', icon: 'pin' },
    { target: '∞', label: 'ideas', icon: 'infinity' },
  ],

  // ─── ABOUT SECTION STATS ────────────────────────────────────────
  aboutStats: [
    { value: '14', label: 'years old', icon: 'cake' },
    { value: '∞', label: 'ramen consumed', icon: 'ramen' },
    { value: '2am', label: 'best coding hour', icon: 'moon' },
    { value: '100%', label: 'self-taught', icon: 'book' },
  ],

  // ─── TECH STACK ─────────────────────────────────────────────────
  //    icon: name of an SVG in the icons object in script.js
  //    or use a string emoji/SVG for simple ones
  techStack: [
    { name: 'Python', icon: 'python' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'Three.js', icon: 'threejs' },
    { name: 'PyWebView', icon: 'pywebview' },
    { name: 'Next.js', icon: 'nextjs' },
    { name: 'Discord.py', icon: 'discordpy' },
    { name: 'ML / AI', icon: 'ml' },
    { name: 'Git', icon: 'git' },
    { name: 'DeepSeek', icon: 'deepseek' },
    { name: 'HTML/CSS', icon: 'htmlcss' },
    { name: 'Creative Coding', icon: 'creative' },
  ],

  // ─── MARQUEE TICKER ─────────────────────────────────────────────
  marqueeItems: [
    { text: 'python', dotColor: 'var(--accent-cyan)' },
    { text: 'javascript', dotColor: 'var(--accent-violet)' },
    { text: 'creative coding', dotColor: 'var(--accent-pink)' },
    { text: 'ai stuff', dotColor: 'var(--accent-cyan)' },
    { text: 'open source', dotColor: 'var(--accent-violet)' },
    { text: '2am ideas', dotColor: 'var(--accent-pink)' },
    { text: 'geometry dash', dotColor: 'var(--accent-cyan)' },
    { text: 'building stuff', dotColor: 'var(--accent-violet)' },
  ],

  // ─── FOOTER ─────────────────────────────────────────────────────
  footer: {
    tagline: 'self taught dev from pluto',
    watermark: 'built with code & ramen',
  },

  // ─── COLLAB SECTION ─────────────────────────────────────────────
  collabCards: [
    {
      icon: 'puzzle',
      iconColor: 'var(--accent-cyan)',
      title: 'open source',
      desc: 'wanna contribute to my repos or work on something together? always down for that',
    },
    {
      icon: 'chat',
      iconColor: 'var(--accent-violet)',
      title: 'just vibing?',
      desc: "making friends is literally the best part. u code? cool. u don't? also cool. if we vibe we vibe",
    },
    {
      icon: 'bolt',
      iconColor: 'var(--accent-pink)',
      title: '2am ideas',
      desc: "got some stupid idea at 2am? same lol. let's actually make it. always down for creative coding and ai stuff",
    },
  ],

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  PINNED REPOS — Add, remove, or edit projects here!          ║
  // ║  Each project object defines a card on the main page          ║
  // ║  and a full detail page when clicked.                         ║
  // ╚══════════════════════════════════════════════════════════════╝
  projects: [
    {
      slug: 'pollinations-task-master',
      name: 'pollinations-task-master',
      tagline: 'fork of claude-task-master — use the original now, they added custom provider support',
      description: 'fork of claude-task-master using pollinations.ai — the original now supports custom providers, use that instead',
      longDescription: "a fork of eyaltoledano's claude-task-master that used pollinations.ai as the AI provider so it was 100% free — no api keys needed. works with cursor ai, cline, and roo code as an mcp server. parse prds, generate tasks, break down projects, track progress — all powered by ai. heads up: the original claude-task-master now supports custom provider endpoints natively, so you should probably just use that one instead and bring your own provider. this fork was made before that feature existed.",
      stars: 26,
      forks: 7,
      language: 'JavaScript',
      langColor: '#f1e05a',
      icon: 'target',
      url: 'https://github.com/notlousybook/pollinations-task-master',
      gradient: 'linear-gradient(135deg, #7ef9a5 0%, #7db8ff 50%, #a78bfa 100%)',
      accentColor: '#a78bfa',
      features: [
        { icon: 'seedling', title: '100% Free AI', description: 'Uses Pollinations.ai — no private keys, no API costs, completely free LLM access. Zero lock-in.' },
        { icon: 'link', title: 'Custom Provider Support', description: 'Bring your own OpenAI-compatible endpoint via CUSTOM_BASE / CUSTOM_API_KEY environment variables.' },
        { icon: 'brain', title: 'AI Task Management', description: 'Parse PRDs, generate tasks, break down complex projects into manageable pieces with AI assistance.' },
        { icon: 'refresh', title: 'MCP Integration', description: 'Works as an MCP server with Cline, Roo Code, and Cursor AI — plug right into your workflow.' },
        { icon: 'clipboard', title: 'Smart Task Tracking', description: 'Track dependencies, subtasks, and project progress. Never lose context on what needs to be done next.' },
        { icon: 'bolt', title: 'CLI & MCP Dual Mode', description: 'Use via command line for quick tasks or integrate directly into your AI coding workflow as MCP server.' },
      ],
      installCommands: [
        'npm install -g pollinations-taskmaster',
        'task-master init',
      ],
      usageCommands: [
        { command: 'task-master init', description: 'Initialize a new project' },
        { command: 'task-master parse-prd prd.txt', description: 'Parse a PRD and generate tasks' },
        { command: 'task-master list', description: 'List all tasks' },
        { command: 'task-master next', description: 'Show next task to work on' },
        { command: 'task-master generate', description: 'Generate task files' },
        { command: 'task-master models --setup', description: 'Configure AI models' },
      ],
      techStack: ['JavaScript', 'Node.js', 'Shell', 'MCP Protocol', 'Pollinations.ai'],
      tags: ['task-management', 'ai', 'free', 'cursor', 'claude', 'mcp'],
      status: 'Active',
      license: 'MIT with Commons Clause',
    },
    {
      slug: 'deepseek-desktop',
      name: 'DeepSeek-Desktop',
      tagline: 'A cozy desktop wrapper for DeepSeek Chat',
      description: 'Lightweight, feature-packed DeepSeek app built with PyWebView — no Electron bloat.',
      longDescription: 'The most cozy desktop wrapper for DeepSeek Chat — smoother, prettier, and nicer to use than any other client. Built with PyWebView for zero Electron bloat, featuring custom UI polish with the Inter font, 500+ dynamic time-based greetings, smooth fade transitions, typing animations, glassmorphic auto-updater notifications, enhanced Markdown rendering with syntax-highlighted code blocks, and a full logging system. Titlebar matches your Windows theme automatically. The DeepSeek experience, remastered.',
      stars: 6,
      forks: 2,
      language: 'Python',
      langColor: '#3572A5',
      icon: 'robot',
      url: 'https://github.com/notlousybook/DeepSeek-Desktop',
      gradient: 'linear-gradient(135deg, #7db8ff 0%, #a78bfa 50%, #f472b6 100%)',
      accentColor: '#7db8ff',
      features: [
        { icon: 'bolt', title: 'Zero Electron Bloat', description: 'Built with PyWebView — lightweight, minimal memory footprint, lightning-fast startup times.' },
        { icon: 'pencil', title: 'Custom UI Polish', description: 'Clean, calm interface with Inter font, smooth transitions, and buttery typing animations.' },
        { icon: 'wave', title: '500+ Dynamic Greetings', description: 'Time-of-day based greetings that rotate through 500+ variations — always something fresh.' },
        { icon: 'refresh', title: 'Auto-Updater', description: 'Glassmorphic update notifications with one-click update and restart. Never miss a release.' },
        { icon: 'notes', title: 'Enhanced Markdown', description: 'Full Markdown support, syntax-highlighted code blocks with JetBrains Mono, XSS protection built in.' },
        { icon: 'pywebview', title: 'Theme-Aware', description: 'Titlebar matches Windows dark/light theme automatically. Force mode via CLI flags if needed.' },
      ],
      installCommands: [
        '# Download latest release from GitHub Releases',
        '# Extract DeepSeekChat-windows.zip',
        '# Run DeepSeekChat.exe',
      ],
      usageCommands: [
        { command: 'DeepSeekChat.exe', description: 'Launch the app' },
        { command: 'Ctrl+Shift+U', description: 'Check for updates manually' },
        { command: 'Ctrl+Shift+L', description: 'Peek at logs' },
        { command: 'DeepSeekChat.exe --dark-titlebar', description: 'Force dark mode' },
        { command: 'DeepSeekChat.exe --light-titlebar', description: 'Force light mode' },
      ],
      techStack: ['Python', 'PyWebView', 'JavaScript', 'Markdown', 'Win32 API'],
      tags: ['desktop-app', 'deepseek', 'ai-client', 'python', 'lightweight', 'pywebview'],
      status: 'Active',
    },
    {
      slug: 'reloadify',
      name: 'reloadify',
      tagline: 'Blazing-fast live-reload for web devs',
      description: 'A blazing-fast, ultra-lightweight Python CLI tool for live-reloading web content.',
      longDescription: 'A super-fast, feather-light Python tool that automatically reloads your HTML, CSS, and JavaScript files in the browser while you code. Say goodbye to manual refreshing! Auto-discovers HTML files in your current directory and subdirectories, watches for changes in real-time, and serves content instantly. Perfect for rapid web development, prototyping, and anyone tired of hitting F5. Fully configurable with CLI flags for port, directory, and timeout settings.',
      stars: 0,
      forks: 0,
      language: 'Python',
      langColor: '#3572A5',
      icon: 'bolt',
      url: 'https://github.com/notlousybook/reloadify',
      gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ef4444 100%)',
      accentColor: '#fbbf24',
      features: [
        { icon: 'rocket', title: 'Blazing Fast', description: 'Built for speed and efficiency — instant browser reload the millisecond your file changes.' },
        { icon: 'search', title: 'Ultra-Lightweight', description: 'No heavy dependencies, no bloat. Just pure Python performance in a tiny package.' },
        { icon: 'refresh', title: 'Live Reloading', description: 'Automatically detects file changes and reloads your browser — zero manual effort.' },
        { icon: 'search', title: 'Auto HTML Discovery', description: 'Searches directories and subdirectories for .html files. Prompts if multiple found.' },
        { icon: 'gear', title: 'Fully Configurable', description: 'Custom file, directory, port, and auto-shutdown timeout settings via CLI flags.' },
        { icon: 'package', title: 'pip install Ready', description: 'Install globally in one command and use from anywhere on your system.' },
      ],
      installCommands: ['pip install reloadify'],
      usageCommands: [
        { command: 'reloadify', description: 'Serve index.html and watch its folder' },
        { command: 'reloadify my_app/index.html', description: 'Serve a specific HTML file' },
        { command: 'reloadify index.html -d ./src', description: 'Watch a different folder for changes' },
        { command: 'reloadify -p 8080', description: 'Serve on a custom port' },
        { command: 'reloadify -t 3600', description: 'Auto-shutdown after 1 hour' },
      ],
      techStack: ['Python', 'CSS', 'JavaScript', 'HTML'],
      tags: ['cli', 'live-reload', 'web-development', 'python', 'tool'],
      status: 'Stable',
      license: 'MIT',
    },
    {
      slug: 'lousybot',
      name: 'LousyBot',
      tagline: 'Modular Discord bot with real LLM smarts',
      description: 'My trusty Discord bot — doing the things no human should have to.',
      longDescription: "A modular, customizable Discord bot created by LousyBook01 with actual LLM intelligence. Features a flexible provider and model system so you're never locked into one AI service. Easily configurable via .env and plaintext config files with an emoji-rich, expressive interaction style that matches the LousyBook personality. Clean, modular code architecture ready for plugins and custom logic — the bot that does things no human should have to do.",
      stars: 0,
      forks: 0,
      language: 'Python',
      langColor: '#3572A5',
      icon: 'robot',
      url: 'https://github.com/notlousybook/LousyBot',
      gradient: 'linear-gradient(135deg, #5865F2 0%, #7289da 50%, #99aab5 100%)',
      accentColor: '#5865F2',
      features: [
        { icon: 'lock', title: 'Secure Configuration', description: 'Sensitive config files never committed to git. Secrets managed via .env files safely.' },
        { icon: 'robot', title: 'Flexible AI Integration', description: 'Provider-agnostic LLM system — no hardcoded OpenAI keys. Switch providers anytime.' },
        { icon: 'notes', title: 'Easy Setup', description: '.env and plaintext config files — get running in under 5 minutes with clear documentation.' },
        { icon: 'smile', title: 'Fun & Expressive', description: 'Emoji-rich interaction style that matches the LousyBook personality. Seriously fun to use.' },
        { icon: 'build', title: 'Plugin Architecture', description: 'Clean, modular code ready for your custom plugins and command extensions.' },
        { icon: 'chat', title: 'Smart Mentions', description: 'Context-aware mention handling with intelligent response generation via LLM.' },
      ],
      installCommands: [
        'git clone https://github.com/notlousybook/LousyBot.git',
        'cd LousyBot',
        'pip install -r requirements.txt',
        'cp .env.example .env  # Fill in your token',
        'python bot.py',
      ],
      usageCommands: [
        { command: 'python bot.py', description: 'Start the bot' },
        { command: '!sync', description: 'Sync slash commands (admin only)' },
      ],
      techStack: ['Python', 'discord.py', 'LLM APIs', 'asyncio'],
      tags: ['discord', 'bot', 'ai', 'python', 'modular'],
      status: 'Alpha',
    },
    {
      slug: 'lousyquiz',
      name: 'LousyQuiz',
      tagline: 'Interactive quiz app — made for exam survival',
      description: 'An interactive quiz app with AI integration (planned). Stay tuned.',
      longDescription: "Made because I forgot everything and needed to study for exams. Built with Bun, Express, and TypeScript for maximum speed. Features JSON file quiz mode where you load your own study materials, progress tracking with a visual progress bar, satisfying confetti animations for correct answers, and shuffled questions every time. AI-generated quiz mode is in the works — soon you'll be able to generate quizzes on the fly using multiple AI providers.",
      stars: 0,
      forks: 0,
      language: 'JavaScript',
      langColor: '#f1e05a',
      icon: 'question',
      url: 'https://github.com/notlousybook/LousyQuiz',
      gradient: 'linear-gradient(135deg, #f472b6 0%, #fb923c 50%, #fbbf24 100%)',
      accentColor: '#f472b6',
      features: [
        { icon: 'clipboard', title: 'JSON Quiz Mode', description: 'Load and take quizzes from local JSON files — bring your own study materials and test yourself.' },
        { icon: 'robot', title: 'AI Quiz Generation', description: 'Generate quizzes on the fly using AI — planned with multi-provider support (OpenAI, Gemini, etc.).' },
        { icon: 'confetti', title: 'Confetti Animations', description: 'Satisfying confetti burst animation for every correct answer because you deserve it.' },
        { icon: 'chart', title: 'Progress Tracking', description: 'Visual progress bar and real-time score tracking throughout your quiz session.' },
        { icon: 'refresh', title: 'Shuffled Content', description: 'Randomized question order and shuffled answer options every time you take a quiz.' },
        { icon: 'gear', title: 'Multi-Provider AI', description: 'Supports OpenAI, Gemini, Groq, Mistral, Anthropic, OpenRouter, and custom endpoints.' },
      ],
      installCommands: [
        'git clone https://github.com/notlousybook/LousyQuiz.git',
        'cd LousyQuiz',
        'bun install',
        'bun run index.ts  # Starts on port 3000',
      ],
      usageCommands: [
        { command: 'bun run index.ts', description: 'Start the quiz server on port 3000' },
        { command: 'bun run build', description: 'Build to build/lousyquiz.exe' },
      ],
      techStack: ['TypeScript', 'JavaScript', 'Bun', 'Express', 'HTML/CSS'],
      tags: ['education', 'quiz', 'ai', 'typescript', 'study'],
      status: 'Alpha',
    },
    {
      slug: 'cline-mcp-prompts',
      name: 'Cline-MCP-Prompts',
      tagline: 'Templates for building MCP servers with AI',
      description: "A set of .clinerules and llms.txt for MCP creation using Cline! or Roo Code.",
      longDescription: 'Your magical rulebook for MCP server creation — ready to use templates that supercharge your AI coding workflow. Includes .clinerules for AI coding rules and mcp-llms.txt as a comprehensive LLM reference guide. Simply clone the repo, rename the folder to your server name, run the cleanup script, open in VSCode, and prompt Cline or Roo Code to build your MCP server. Created with Gemini 2.0 Pro. Zero friction from idea to working MCP server.',
      stars: 3,
      forks: 1,
      language: 'Shell',
      langColor: '#e8fbf2',
      icon: 'notes',
      url: 'https://github.com/notlousybook/Cline-MCP-Prompts',
      gradient: 'linear-gradient(135deg, #7ef9a5 0%, #34d399 50%, #06b6d4 100%)',
      accentColor: '#34d399',
      features: [
        { icon: 'sparkle', title: '.clinerules Template', description: 'Pre-configured AI coding rules optimized specifically for MCP server development workflows.' },
        { icon: 'person', title: 'LLM Reference Guide', description: 'Comprehensive mcp-llms.txt with everything your AI assistant needs to build great MCP servers.' },
        { icon: 'pencil', title: 'Cleanup Scripts', description: 'One-command cleanup for Windows (PowerShell), Mac/Linux (Bash), and Zsh — all platforms covered.' },
        { icon: 'link', title: 'SDK References', description: 'Includes links to Python SDK, TypeScript SDK, and extra documentation for deep dives.' },
        { icon: 'rocket', title: 'Quick Start', description: 'Clone, rename, clean, open in VSCode, prompt Cline — done in under 2 minutes flat.' },
        { icon: 'link', title: 'Works With', description: 'Compatible with Cline and Roo Code — two of the best AI coding assistants for VS Code.' },
      ],
      installCommands: [
        'git clone https://github.com/notlousybook/Cline-MCP-Prompts.git',
        '# Rename folder to your server name',
        '# Run clean.ps1 (Win) or clean.sh (Mac/Linux)',
        '# Open in VSCode and prompt Cline/Roo Code',
      ],
      usageCommands: [
        { command: '.\\clean.ps1', description: 'Windows cleanup script' },
        { command: './clean.sh', description: 'Mac/Linux Bash cleanup script' },
        { command: './clean.zsh', description: 'Zsh cleanup script' },
      ],
      techStack: ['Shell', 'PowerShell', 'MCP Protocol', 'VSCode Extensions'],
      tags: ['mcp', 'cline', 'roo-code', 'templates', 'ai-coding'],
      status: 'Stable',
    },
  ],
};
