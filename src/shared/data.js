// All portfolio content lives here — the single source of truth

// Dynamic YOE calculation — started Jan 2019
const CAREER_START = new Date(2019, 0, 1) // Jan 1, 2019
export function getYOE() {
  const now = new Date()
  const diff = (now - CAREER_START) / (1000 * 60 * 60 * 24 * 365.25)
  return diff.toFixed(1)
}

export const profile = {
  name: 'Arun Munaganti',
  title: 'Solutions Architect',
  company: 'Echor Tech',
  get yoe() { return getYOE() },
  email: 'arunsai63@gmail.com',
  github: 'https://github.com/arunsai63',
  linkedin: 'https://linkedin.com/in/arunmunaganti',
  portfolio: 'https://arunsai63.github.io/portfolio',
  blog: 'https://arunsai63.github.io/blogs',
  education: {
    school: 'JNTUH College of Engineering Hyderabad',
    degree: "Bachelor's degree, Computer Science & Engineering",
  },
}

export const experience = [
  {
    company: 'Echor Tech',
    title: 'Solutions Architect',
    dates: '09/2024 - Present',
    year: 2024,
    bullets: [
      'Leading technical initiatives across frontend, backend, mobile apps, databases, and cloud.',
      'Heading DevOps and backend operations, ensuring infrastructure efficiency, security and scalability.',
      'Building and leading a VC backed decentralized creator monetization platform.',
      'Implemented open-source solutions saving costs while maintaining performance.',
    ],
    tech: ['Kafka', 'Python', 'NestJS', 'AWS', 'ECS', 'Fargate', 'FastAPI', 'CloudFormation', 'Docker', 'Linux', 'React', 'NodeJS', 'New Relic'],
    // humor fields
    processName: 'solutions-architect.exe',
    cpu: '110%',
    mem: 'ALL OF IT',
    status: 'CANNOT BE KILLED',
  },
  {
    company: 'Echor Tech',
    title: 'Software Engineer 3',
    dates: '01/2023 - 09/2024',
    year: 2023,
    bullets: [
      'Built and scaled three high-impact crypto projects from scratch (~$50M market cap).',
      'Owned and managed crypto projects end-to-end, listed on OpenSea, MEXC, HTX.',
      'Built and owned landwey.in, scaling to 30k+ users, optimizing infrastructure costs.',
    ],
    tech: ['Solidity', 'Python', 'AWS', 'Node', 'Redis', 'NextJS', 'React', 'Rust', 'GitHub Actions', 'Docker', 'Web3', 'Svelte'],
    processName: 'crypto-wizard.exe',
    cpu: '89%',
    mem: '4.2GB',
    status: 'PRINTING MONEY',
  },
  {
    company: 'Echor Tech',
    title: 'Lead Developer',
    dates: '12/2021 - 01/2023',
    year: 2021,
    bullets: [
      'Led end-to-end development of an advanced trading automation platform.',
      'Built a multi-media content marketing platform with crypto incentives and AI/ML integration.',
      'Built scalable backend systems for real-time apps (payments, algorithms).',
      'Established core tech workflows (Jira, GitHub) and managed technical hiring/training.',
    ],
    tech: ['RabbitMQ', 'Python', 'Flask', 'Node', 'Express', 'MongoDB', 'Postgres', 'Docker', 'Serverless', 'Lambda', 'AWS', 'React', 'Solidity', 'Web3'],
    processName: 'lead-dev.exe',
    cpu: '78%',
    mem: '3.1GB',
    status: 'RUNNING',
  },
  {
    company: 'Grow Indigo Pvt. Ltd.',
    title: 'Software Development Engineer',
    dates: '04/2021 - 12/2021',
    year: 2021,
    bullets: [
      'Migrated internal dashboards from asp.net to react and .net core microservices.',
      'Migrated services from on-prem to AWS with CI/CD setup (10+ microservices).',
      'Fixed critical security vulnerabilities and implemented proper IAM.',
      'Built and owned a referral and offers microservice, scaling to tens of thousands of users.',
    ],
    tech: ['.NET Core', 'C#', 'AWS', 'MongoDB', 'MySQL', 'Microservices', 'Python', 'TypeScript', 'React'],
    processName: 'migration-bot.exe',
    cpu: '65%',
    mem: '2.8GB',
    status: 'COMPLETED',
  },
  {
    company: 'GGK Tech',
    title: 'Software Engineer',
    dates: '08/2020 - 04/2021',
    year: 2020,
    bullets: [
      'Worked as a full stack developer (.net core, react, mysql, redis).',
      'Worked on Azure (CI/CD, deployments, serverless, multi-environment setup).',
      'Improved application load times significantly (query optimization & cache) for 100k+ users.',
    ],
    tech: ['C#', 'Azure', 'Serverless', '.NET Core', 'React', 'MySQL', 'Redis', 'Azure Service Bus', 'Python', 'SQL Server'],
    processName: 'fullstack-grind.exe',
    cpu: '55%',
    mem: '2.1GB',
    status: 'COMPLETED',
  },
  {
    company: 'GGK Tech',
    title: 'Associate Software Engineer',
    dates: '01/2019 - 08/2020',
    year: 2019,
    bullets: [
      'Worked as a full stack developer (.net core, react, oracle).',
      'Worked on a large migration project ($10M), migrating DB & .net projects.',
      'Built and owned an internal employee management system (10k+ users).',
    ],
    tech: ['React', 'C#', '.NET', 'Oracle', 'Sybase', 'Python'],
    processName: 'baby-dev.exe',
    cpu: '42%',
    mem: '1.5GB',
    status: 'COMPLETED (with dignity)',
  },
]

export const skills = {
  languages: ['Python', 'Node.js', 'Rust', 'C#', 'TypeScript', 'JavaScript'],
  frontend: ['React', 'Next.js', 'Svelte', 'HTML', 'CSS'],
  cloud: ['AWS', 'Azure', 'Docker', 'CloudFormation (IaC)', 'Linux', 'Serverless', 'Microservices'],
  databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'DynamoDB', 'DocumentDB', 'Aurora', 'Redis'],
  messaging: ['Kafka', 'RabbitMQ', 'SQS', 'Azure Service Bus'],
  devops: ['CI/CD', 'GitHub Actions', 'Docker', 'New Relic', 'Security'],
  blockchain: ['Solidity', 'Web3', 'Blockchain'],
  other: ['Quant', 'LLM', 'Git'],
}

export function getBootMessages() {
  const yoe = getYOE()
  return [
    { text: `ArunOS BIOS v${yoe}`, type: 'info' },
    { text: 'Detecting hardware...', type: 'info' },
    { text: 'CPU: Solutions Architect @ 3.2GHz (4.5GHz with coffee boost)', type: 'ok' },
    { text: `RAM: ${yoe} Years Experience (non-refundable)`, type: 'ok' },
    { text: 'DISK: 30+ repositories (mostly node_modules)', type: 'ok' },
    { text: 'GPU: Problem Solving v3.8', type: 'ok' },
    { text: '', type: 'blank' },
    { text: 'Loading personality module... (warning: unfiltered)', type: 'ok' },
    { text: 'Mounting /dev/humor...', type: 'ok' },
    { text: 'Calibrating imposter syndrome... levels nominal', type: 'ok' },
    { text: `Loading ${yoe} years of mass caffeine dependency...`, type: 'ok' },
    { text: 'Loading work-life-balance... module not found', type: 'fail' },
    { text: 'Falling back to coffee-driven-development...', type: 'ok' },
    { text: 'Starting cursor-surveillance daemon...', type: 'ok' },
    { text: 'Initializing ArunOS desktop...', type: 'ok' },
    { text: '', type: 'blank' },
    { text: `Welcome to ArunOS v${yoe} (Stable Build)`, type: 'success' },
  ]
}

export const terminalCommands = {
  help: `Available commands:
  about          Show bio (the short version)
  neofetch       System info (it's actually about me)
  experience     Work history (it's a lot)
  skills         What I'm good at (allegedly)
  projects       Things I've built (that didn't catch fire)
  contact        How to reach me
  resume         Download my resume
  git log        Career history as commits
  ls             List stuff
  cat            Read stuff
  clear          Clean up this mess
  whoami         Identity crisis resolver
  sudo           Nice try
  coffee         Essential fuel
  matrix         You know what this does
  exit           You can't leave`,
}

export const filesys = {
  '~': {
    type: 'dir',
    children: {
      'README.md': { type: 'file', content: `# Arun Munaganti\n\n> Solutions Architect | 6.5+ YOE | Full Stack | AWS | Blockchain\n\nI'm a solutions architect who thinks in systems, not just code.\nCurrently leading the engineering team at EchorTech.\n\nI've mass-deployed crypto projects worth ~$50M, mass-migrated\nmore microservices than I can count, and mass-consumed enough\ncoffee to concern medical professionals.\n\nWhen I'm not architecting solutions, I'm probably:\n- Arguing about tabs vs spaces (spaces, fight me)\n- Over-engineering my personal projects\n- Pretending to understand Kubernetes` },
      'resume.pdf': { type: 'file', content: '[binary - use "resume" command to download]' },
      'projects': {
        type: 'dir',
        children: {
          'crypto-platform': { type: 'dir', children: { 'README.md': { type: 'file', content: 'VC-backed decentralized creator platform. ~$50M market cap. Yes, really.' } } },
          'landwey': { type: 'dir', children: { 'README.md': { type: 'file', content: 'Scaled to 30k+ users. Infrastructure costs? Optimized. Hotel? Trivago.' } } },
          'trading-bot': { type: 'dir', children: { 'README.md': { type: 'file', content: 'Advanced trading automation platform. Real-time algorithms. Real-time anxiety.' } } },
        }
      },
      'experience': {
        type: 'dir',
        children: {
          'echortech.md': { type: 'file', content: 'Current home. Solutions Architect. Leading technical initiatives across... basically everything.' },
          'grow-indigo.md': { type: 'file', content: 'Migrated 10+ microservices to AWS. The cloud migration era.' },
          'ggk-tech.md': { type: 'file', content: 'Where it all began. .NET, React, and the innocence of youth.' },
        }
      },
      '.secrets': { type: 'file', content: 'password: konami\n\n...you really just cat\'d a secrets file. Classic.' },
    }
  }
}
