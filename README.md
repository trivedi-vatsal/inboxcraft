# InboxCraft

<p align="center">
  <img src="public/banner.png" alt="InboxCraft banner" width="100%">
</p>

Generate PowerShell scripts to automate Outlook inbox rules — no code, no sign-up, nothing leaves your browser.

## Motivation

Creating fifty inbox rules through the Outlook Web UI for GitHub, Datadog, Slack, and Jira alerts takes dozens of clicks, is error-prone, and is impossible to version control.

**InboxCraft** solves this by letting you manage inbox rules as code. Pick a mode, enter your sender addresses, and InboxCraft instantly produces a ready-to-run, safe, and idempotent `.ps1` script that creates subfolders and inbox rules in your Microsoft 365 mailbox.

## Features

- **Quick mode** — two fields (your M365 email + sender address), one button, instant download
- **Advanced mode** — bulk senders, custom parent folder, Copy or Move, Exact or Contains match
- **Templates Library** — 10 pre-built YAML templates for popular services (Teams, Slack, GitHub, Jira, Salesforce, AWS, and more); pick a template, enter your email, download
- **COM + Exchange Online hybrid** — creates folders via Outlook COM (no sign-in), rules via Exchange Online
- **Domain-wide rules** — prefix with `@` (e.g. `@startup.io`) to match an entire domain
- **Live preview** — folder tree and rules table update as you type (Advanced mode)
- **Syntax-highlighted output** — PowerShell with line count and file size (shiki, poimandres theme)
- **Idempotent script** — safe to re-run; existing folders and rules are skipped
- **Deep links** — `?template=<id>` URL param auto-opens a template drawer

## How to Use

### Quick mode

1. Go to **`https://inboxcraft.app/`** (the home page)
2. Enter **your M365 email** and **the sender's email address**
3. Click **Download Rules** — `outlook-rules.ps1` downloads immediately
4. Run the script in PowerShell

### Advanced mode

1. Go to **`/#/advanced`** or click **Advanced** in the nav
2. Paste multiple sender addresses (one per line, comma-separated, or `@domain.com`)
3. Set your M365 email, parent folder name, rule action, and match type
4. Click **Generate Script** or press `Ctrl+Enter`
5. Copy or **Download** the `.ps1` file, then run it in PowerShell

### Templates

1. Go to **`/#/templates`** or click **Templates** in the nav
2. Browse by category or search by name
3. Click a card to open the detail drawer — review the sender list
4. Click **Get Script**, enter your M365 email, and download

### Input formats (Advanced mode) 

```
noreply@github.com               # exact sender address
@slack.com                       # domain-wide rule — matches all @slack.com senders
alerts@hdfcbank.com
```

## What the Script Does

**Step 1 — Create folders** (Outlook COM, no authentication)

- Creates `Inbox/team` (or your chosen parent folder)
- Creates one subfolder per sender alias inside it
- Falls back to Exchange Online if Outlook is not running

**Step 2 — Create inbox rules** (Exchange Online)

- Connects to Exchange Online (browser sign-in prompt appears once)
- Creates one `New-InboxRule` per address pointing to its subfolder
- Skips rules that already exist by name

## Security & Transparency

Executing PowerShell scripts that interface with Exchange Online requires trust. InboxCraft is built from the ground up for security-conscious developers and IT admins:

- **100% Client-Side:** InboxCraft is a static Vite app. Your email addresses, tenant info, and parameters never leave your browser window. There is no backend server.
- **Analytics:** Anonymous, aggregated usage data is collected via PostHog (page views, feature usage, masked session recordings). No form content is ever captured. See the [Privacy Policy](https://trivedi-vatsal.github.io/InboxCraft/#/privacy) for full details.
- **Audit-Ready Output:** The generated script uses pure, standard Microsoft `ExchangeOnlineManagement` cmdlets. It is syntax-highlighted in the browser so you can inspect every single line before executing it.
- **Idempotent by Design:** You can safely run the script multiple times. It checks `Get-InboxRule` before creating, ensuring it will never duplicate your existing rules or folders.

## Under the Hood

How does it work without a backend?

- **React + Tailwind:** Handles the state, parameter validation, and fluid UI layout.
- **AST Code Generator:** Maps your UI constraints directly to raw PowerShell syntax templates on the client.
- **Shiki:** Syntax-highlights the generated PowerShell code in real-time in the browser.
- **Blob API:** Generates a secure, local download link natively using `URL.createObjectURL(blob)`, keeping everything fully offline.

## Prerequisites

- **PowerShell 5.1+** (built into Windows)
- **Microsoft 365 mailbox** with an active license
- **ExchangeOnlineManagement** module (the script installs it automatically if missing)
- **Outlook** desktop app (optional — used for faster folder creation without sign-in)

### Install the EXO module manually (optional)

```powershell
Install-Module ExchangeOnlineManagement -Scope CurrentUser -Force
```

## Running the Script

```powershell
# Run directly
.\outlook-rules.ps1

# If you get an execution policy error
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
.\outlook-rules.ps1
```

## Troubleshooting & FAQ

**Q: I get a red error about "Execution of scripts is disabled on this system."**
By default, Windows blocks custom PowerShell scripts. You can bypass the policy for that single session without needing Administrator rights by running: `powershell -ExecutionPolicy Bypass -File .\outlook-rules.ps1`.

**Q: Why isn't Outlook COM connecting to create folders?**
The script attempts to use COM to rapidly create folders locally without sign-in prompts. This only works if the classic Outlook Desktop App is actively running on Windows. If it fails or is unavailable, the script automatically falls back to relying entirely on Exchange Online to handle folders.

**Q: Does this work on Mac or Linux?**
The script requires PowerShell Core (`pwsh`). If you install the `ExchangeOnlineManagement` module on Mac/Linux, the Exchange Online section (handling rules) will work flawlessly via device-flow login. The initial folder creation via Outlook COM will visibly error (since COM is Windows-only), but the script will catch it, skip it, and continue to Exchange Online.

## Contributing a Template

Templates are plain YAML files in the [`templates/`](templates/) directory at the project root. Adding a new one takes about two minutes:

1. Copy any existing file (e.g. `templates/github.yaml`)
2. Fill in the fields:

```yaml
id: my-service # filename without .yaml, used in URLs
name: My Service
category: Collaboration # Collaboration | Dev Tools | CRM | Finance | Cloud | Productivity
description: One-line description shown on the card
folder: my-service # Outlook subfolder name under the parent
emoji: "🚀"
updated: "2026-03-30"
senders:
  - noreply@my-service.com
  - alerts@my-service.com
  - "@my-service.com" # domain-wide — quote lines starting with @
```

3. Open a pull request — no code changes required

## Tech Stack

| Layer            | Technology                       |
| ---------------- | -------------------------------- |
| UI framework     | React 18 + TypeScript            |
| Routing          | React Router v7 (HashRouter)     |
| Build tool       | Vite 5                           |
| Styling          | Tailwind CSS v3                  |
| Icons            | Remix Icon (`@remixicon/react`)  |
| Syntax highlight | shiki (poimandres theme)         |
| Template format  | YAML (parsed via `yaml` package) |
| Changelog        | Changesets                       |

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npm run typecheck

# Production build
npm run build
```

### Releasing a new version

```bash
npm run changeset        # describe your change
npm run version-packages # bump version + update CHANGELOG.md
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

[MIT](LICENSE)
