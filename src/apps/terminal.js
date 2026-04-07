import { createWindow } from '../os/window-manager.js'
import { profile, experience, skills, filesys, getYOE } from '../shared/data.js'
import { openApp } from './registry.js'

export function open() {
  createWindow({
    id: 'terminal',
    title: 'Terminal',
    icon: '🖥️',
    width: 700,
    height: 480,
    content: (el) => {
      el.style.cssText = 'padding:0;background:#0d0d1a;font-family:"JetBrains Mono",monospace;font-size:13px;display:flex;flex-direction:column;'

      el.innerHTML = `
        <div id="term-output" style="flex:1;overflow-y:auto;padding:12px;line-height:1.7;"></div>
        <div style="display:flex;align-items:center;padding:8px 12px;border-top:1px solid #1a1a30;flex-shrink:0;">
          <span style="color:#10b981;margin-right:8px;white-space:nowrap;">arun@portfolio:~$</span>
          <input id="term-input" type="text" autocomplete="off" spellcheck="false" style="flex:1;background:none;border:none;color:#ccc;font-family:inherit;font-size:13px;outline:none;" />
        </div>
      `

      const output = el.querySelector('#term-output')
      const input = el.querySelector('#term-input')
      let history = []
      let histIdx = -1
      let cwd = '~'

      // Welcome message
      appendOutput(output, `<span style="color:#10b981;">Welcome to ArunOS Terminal v${getYOE()}</span>
<span style="color:#666;">Type 'help' to see commands, or just start typing random stuff. I won't judge.</span>
`)

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = input.value.trim()
          if (!cmd) return
          history.unshift(cmd)
          histIdx = -1
          appendOutput(output, `<span style="color:#10b981;">arun@portfolio:${cwd}$</span> ${escapeHtml(cmd)}`)
          processCommand(cmd, output, cwd, (newCwd) => { cwd = newCwd })
          input.value = ''
          output.scrollTop = output.scrollHeight
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx] }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          if (histIdx > 0) { histIdx--; input.value = history[histIdx] }
          else { histIdx = -1; input.value = '' }
        } else if (e.key === 'Tab') {
          e.preventDefault()
          // Simple tab completion
          const val = input.value
          const cmds = Object.keys(commandHandlers)
          const matches = cmds.filter(c => c.startsWith(val))
          if (matches.length === 1) input.value = matches[0] + ' '
        }
      })

      // Focus input on click anywhere
      el.addEventListener('click', () => input.focus())
      setTimeout(() => input.focus(), 100)
    }
  })
}

function appendOutput(container, html) {
  const line = document.createElement('div')
  line.innerHTML = html
  container.appendChild(line)
  container.scrollTop = container.scrollHeight
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const commandHandlers = {
  help: (args, output) => {
    appendOutput(output, `<span style="color:#888;">
Available commands:
  <span style="color:#10b981;">about</span>          Who am I (the short version)
  <span style="color:#10b981;">neofetch</span>       System info (it's actually about me)
  <span style="color:#10b981;">experience</span>     Work history (it's a lot)
  <span style="color:#10b981;">skills</span>         What I'm good at (allegedly)
  <span style="color:#10b981;">projects</span>       Things I've built
  <span style="color:#10b981;">contact</span>        How to reach me
  <span style="color:#10b981;">resume</span>         Download my resume
  <span style="color:#10b981;">git log</span>        Career as git commits
  <span style="color:#10b981;">ls</span>             List stuff
  <span style="color:#10b981;">cat</span>            Read stuff
  <span style="color:#10b981;">whoami</span>         Identity crisis resolver
  <span style="color:#10b981;">uptime</span>         How long I've been at this
  <span style="color:#10b981;">clear</span>          Clean up
  <span style="color:#10b981;">sudo</span>           Nice try
  <span style="color:#10b981;">coffee</span>         Essential fuel
  <span style="color:#10b981;">exit</span>           You can't leave
</span>`)
  },

  whoami: (args, output) => {
    appendOutput(output, `<span style="color:#fff;">${profile.name}</span> <span style="color:#666;">— ${profile.title} @ ${profile.company}</span>
<span style="color:#555;">Also known as: "that guy who mass-deploys on Fridays"</span>`)
  },

  about: (args, output) => {
    appendOutput(output, `<span style="color:#fff;">${profile.name}</span>
<span style="color:#10b981;">${profile.title} @ ${profile.company}</span>
<span style="color:#888;">${profile.yoe} YOE | Full Stack | AWS | DevOps | Blockchain
Currently leading the engineering team. Building things that scale.
Previously: mass-built crypto platforms worth ~$50M, mass-migrated 10+ microservices,
and mass-consumed mass amounts of coffee.</span>`)
  },

  neofetch: (args, output) => {
    appendOutput(output, `<pre style="color:#888;">
  <span style="color:#10b981;">       .---.        </span>  <span style="color:#fff;">arun</span>@<span style="color:#fff;">portfolio</span>
  <span style="color:#10b981;">      /     \\       </span>  ──────────────────
  <span style="color:#10b981;">      \\.@-@./       </span>  <span style="color:#10b981;">OS:</span>       Solutions Architect v${getYOE()}
  <span style="color:#10b981;">      /\`\\_/\`\\       </span>  <span style="color:#10b981;">Host:</span>     Echor Tech
  <span style="color:#10b981;">     //  _  \\\\      </span>  <span style="color:#10b981;">Kernel:</span>   Full Stack Engineering
  <span style="color:#10b981;">    | \\     )|_     </span>  <span style="color:#10b981;">Uptime:</span>   ${getYOE()} years (and mass counting)
  <span style="color:#10b981;">   /\`\\_\`>  <_/ \\    </span>  <span style="color:#10b981;">Packages:</span> 30+ technologies installed
  <span style="color:#10b981;">   \\__/'---'\\__/    </span>  <span style="color:#10b981;">Shell:</span>    coffee-driven-dev
                       <span style="color:#10b981;">Editor:</span>   VS Code (with mass extensions)
                       <span style="color:#10b981;">Terminal:</span>  This one (obviously)
                       <span style="color:#10b981;">CPU:</span>      Problem Solving @ 3.8GHz
                       <span style="color:#10b981;">Memory:</span>   JNTUH CSE, B.Tech
                       <span style="color:#10b981;">Disk:</span>     90% node_modules
</pre>`)
  },

  experience: (args, output) => {
    const rows = experience.map(e =>
      `  <span style="color:#f59e0b;">${e.year}</span>  <span style="color:#fff;">${e.title}</span> <span style="color:#666;">@ ${e.company}</span>  <span style="color:#555;">(${e.dates})</span>`
    ).join('\n')
    appendOutput(output, `<span style="color:#888;">Career Timeline (newest first):\n${rows}\n\nType 'git log' for the dramatic version.</span>`)
  },

  skills: (args, output) => {
    const sections = Object.entries(skills).map(([cat, items]) =>
      `  <span style="color:#10b981;">${cat}:</span> ${items.join(', ')}`
    ).join('\n')
    appendOutput(output, `<span style="color:#888;">${sections}</span>`)
  },

  projects: (args, output) => {
    appendOutput(output, `<span style="color:#888;">
  <span style="color:#3b82f6;">📁 crypto-platform/</span>   VC-backed decentralized creator platform (~$50M mcap)
  <span style="color:#3b82f6;">📁 landwey/</span>           Scaled to 30k+ users. Infrastructure: optimized.
  <span style="color:#3b82f6;">📁 trading-bot/</span>       Advanced trading automation. Real-time algorithms.
  <span style="color:#3b82f6;">📁 content-platform/</span>  Multi-media marketing with crypto incentives + AI/ML
  <span style="color:#3b82f6;">📁 employee-mgmt/</span>     Internal system, 10k+ users (at GGK Tech)

Use 'ls projects/' to browse or double-click Projects on the desktop.</span>`)
  },

  contact: (args, output) => {
    appendOutput(output, `<span style="color:#888;">
  <span style="color:#10b981;">📧 Email:</span>    <a href="mailto:${profile.email}" style="color:#3b82f6;">${profile.email}</a>
  <span style="color:#10b981;">💼 LinkedIn:</span> <a href="${profile.linkedin}" target="_blank" style="color:#3b82f6;">linkedin.com/in/arunmunaganti</a>
  <span style="color:#10b981;">🐙 GitHub:</span>   <a href="${profile.github}" target="_blank" style="color:#3b82f6;">github.com/arunsai63</a>
  <span style="color:#10b981;">🌐 Portfolio:</span> <a href="${profile.portfolio}" target="_blank" style="color:#3b82f6;">arunsai63.github.io/portfolio</a>

Or just yell into the void. I'll probably hear you.</span>`)
  },

  resume: (args, output) => {
    appendOutput(output, `<span style="color:#10b981;">Downloading resume...</span>
<span style="color:#888;">Just kidding, opening in new tab. You mass have a PDF viewer, right?</span>`)
    setTimeout(() => window.open('/resume.pdf', '_blank'), 500)
  },

  clear: (args, output) => {
    output.innerHTML = ''
  },

  uptime: (args, output) => {
    appendOutput(output, `<span style="color:#888;">${getYOE()} years, mass counting.
Last mass reboot: never (I don't believe in work-life balance)
Load average: high, higher, highest</span>`)
  },

  exit: (args, output) => {
    appendOutput(output, `<span style="color:#ef4444;">Error: You can't leave. This is a website.</span>
<span style="color:#555;">I mean, you CAN close the tab. But can you mass really?</span>`)
  },

  coffee: (args, output) => {
    appendOutput(output, `<pre style="color:#f59e0b;">
    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----'

Brewing... ☕ done.
Caffeine levels: RESTORED.
Productivity: QUESTIONABLE.
</pre>`)
  },

  ls: (args, output) => {
    const target = args[0] || '~'
    const node = resolvePath(target)
    if (!node || node.type !== 'dir') {
      appendOutput(output, `<span style="color:#ef4444;">ls: cannot access '${escapeHtml(target)}': No such directory</span>`)
      return
    }
    const items = Object.entries(node.children).map(([name, child]) =>
      child.type === 'dir'
        ? `<span style="color:#3b82f6;">${name}/</span>`
        : `<span style="color:#ccc;">${name}</span>`
    )
    appendOutput(output, items.join('  '))
  },

  cat: (args, output) => {
    const target = args[0]
    if (!target) { appendOutput(output, `<span style="color:#ef4444;">cat: missing file operand</span>`); return }
    const node = resolvePath(target)
    if (!node || node.type !== 'file') {
      appendOutput(output, `<span style="color:#ef4444;">cat: ${escapeHtml(target)}: No such file</span>`)
      return
    }
    appendOutput(output, `<span style="color:#888;">${escapeHtml(node.content)}</span>`)
  },

  pwd: (args, output) => {
    appendOutput(output, `/home/arun`)
  },

  sudo: (args, output) => {
    const rest = args.join(' ')
    if (rest.startsWith('hire')) {
      appendOutput(output, `<span style="color:#10b981;">[sudo] Verifying credentials...
Permission granted. ✅
Sending offer letter to ${profile.email}...
Just kidding. But seriously, you should.</span>`)
    } else if (rest.startsWith('rm')) {
      appendOutput(output, `<span style="color:#ef4444;">Permission denied: You cannot delete ${getYOE()} years of experience.
Also, I have mass backups. Unlike your last client. 😏</span>`)
    } else {
      appendOutput(output, `<span style="color:#ef4444;">[sudo] You're not in the sudoers file. This incident will be reported.
...to no one. I don't even have a sysadmin.</span>`)
    }
  },

  rm: (args, output) => {
    if (args.join(' ').includes('-rf')) {
      appendOutput(output, `<span style="color:#ef4444;">Nice try. I'm not falling for that again.
Last time I lost all my Kubernetes configs. 😤</span>`)
    } else {
      appendOutput(output, `<span style="color:#ef4444;">rm: permission denied (this is a portfolio, not a playground)</span>`)
    }
  },

  git: (args, output) => {
    if (args[0] === 'log') {
      const commits = experience.map((e, i) => {
        const hash = Math.random().toString(16).substr(2, 7)
        const isHead = i === 0
        return `<span style="color:#f59e0b;">* ${hash}</span>${isHead ? ' <span style="color:#10b981;">(HEAD -> career)</span>' : ''} <span style="color:#fff;">${e.title}</span> <span style="color:#666;">(${e.dates})</span>
<span style="color:#555;">|   ${e.company} — ${e.bullets[0]}</span>`
      }).join('\n<span style="color:#555;">|</span>\n')
      appendOutput(output, `<pre>${commits}</pre>`)
    } else if (args[0] === 'status') {
      appendOutput(output, `<span style="color:#888;">On branch <span style="color:#10b981;">career</span>
Your branch is ahead of 'origin/junior-dev' by 6 commits.
  (use "git push" to share your mass awesomeness)

Changes to be committed:
  <span style="color:#10b981;">modified:   skills/cloud.txt</span> (leveled up)
  <span style="color:#10b981;">modified:   experience/echortech.md</span> (promoted)
  <span style="color:#ef4444;">deleted:    imposter-syndrome.txt</span> (finally)</span>`)
    } else {
      appendOutput(output, `<span style="color:#888;">git: '${escapeHtml(args[0] || '')}' is not a git command. Try 'git log' or 'git status'.</span>`)
    }
  },

  matrix: (args, output) => {
    appendOutput(output, `<span style="color:#10b981;">Entering the Matrix...</span>`)
    // Quick matrix effect overlay
    const overlay = document.createElement('div')
    overlay.style.cssText = 'position:fixed;inset:0;background:#000;z-index:999999;overflow:hidden;'
    const canvas = document.createElement('canvas')
    overlay.appendChild(canvas)
    document.body.appendChild(overlay)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    const cols = Math.floor(canvas.width / 14)
    const drops = Array(cols).fill(1)
    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#10b981'
      ctx.font = '14px JetBrains Mono'
      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96)
        ctx.fillText(text, i * 14, drops[i] * 14)
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }, 33)
    overlay.addEventListener('click', () => { clearInterval(interval); overlay.remove() })
    setTimeout(() => { clearInterval(interval); overlay.remove() }, 5000)
  },

  ping: (args, output) => {
    const target = args[0] || 'localhost'
    appendOutput(output, `<span style="color:#888;">PING ${escapeHtml(target)} (127.0.0.1): 56 data bytes
64 bytes from ${escapeHtml(target)}: time=0ms (always responsive)
64 bytes from ${escapeHtml(target)}: time=0ms (still responsive)

--- ${escapeHtml(target)} ping statistics ---
Why are you pinging ${escapeHtml(target)} from my portfolio? Focus.</span>`)
  },

  vim: (args, output) => {
    appendOutput(output, `<span style="color:#ef4444;">Error: Real developers use VS Code.
Just kidding. Use whatever makes you mass happy.
(But seriously, VS Code.)</span>`)
  },

  man: (args, output) => {
    if (args[0] === 'arun' || !args[0]) {
      appendOutput(output, `<pre style="color:#888;">
<span style="color:#fff;">ARUN(1)                    ArunOS Manual                    ARUN(1)</span>

<span style="color:#f59e0b;">NAME</span>
       arun - solutions architect, mass coffee enthusiast

<span style="color:#f59e0b;">SYNOPSIS</span>
       arun [--hire] [--collaborate] [--coffee]

<span style="color:#f59e0b;">DESCRIPTION</span>
       Arun is a solutions architect with ${profile.yoe} years of
       experience in building things that scale and occasionally
       work on the first try. Known for mass-deploying on Fridays
       and mass-consuming unreasonable amounts of coffee.

<span style="color:#f59e0b;">OPTIONS</span>
       --hire          Send job offer (recommended)
       --collaborate   Propose a project
       --coffee        Buy him a coffee (always accepted)

<span style="color:#f59e0b;">BUGS</span>
       None. Only undocumented features.

<span style="color:#f59e0b;">SEE ALSO</span>
       github.com/arunsai63, linkedin.com/in/arunmunaganti
</pre>`)
    } else {
      appendOutput(output, `<span style="color:#ef4444;">No manual entry for ${escapeHtml(args[0])}. Try 'man arun'.</span>`)
    }
  },
}

function processCommand(cmd, output, cwd, setCwd) {
  const parts = cmd.split(/\s+/)
  const name = parts[0].toLowerCase()
  const args = parts.slice(1)

  // Special multi-word commands
  if (name === 'git') {
    commandHandlers.git(args, output)
    return
  }
  if (name === 'sudo') {
    commandHandlers.sudo(args, output)
    return
  }

  if (commandHandlers[name]) {
    commandHandlers[name](args, output)
  } else {
    const suggestions = Object.keys(commandHandlers).filter(c => c.startsWith(name.charAt(0)))
    appendOutput(output, `<span style="color:#ef4444;">Command not found: '${escapeHtml(name)}'</span>
<span style="color:#555;">${suggestions.length ? `Did you mean: ${suggestions.slice(0, 3).join(', ')}?` : "Type 'help' to see available commands."}</span>`)
  }
}

function resolvePath(path) {
  const clean = path.replace(/^~\/?/, '').replace(/\/+$/, '')
  let node = filesys['~']
  if (!clean) return node
  const parts = clean.split('/')
  for (const part of parts) {
    if (!node || node.type !== 'dir' || !node.children[part]) return null
    node = node.children[part]
  }
  return node
}
