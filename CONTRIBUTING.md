# Contributing to InboxCraft

First of all, thank you for considering contributing to **InboxCraft**! It's people like you who make it a great tool for everyone.

This document provides guidelines and instructions for contributing to the project.

## 🚀 Quick Start

1.  **Fork** the repository on GitHub.
2.  **Clone** your fork locally:
    ```bash
    git clone https://github.com/your-username/InboxCraft.git
    cd InboxCraft
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Start the development server**:
    ```bash
    npm run dev
    ```

## 🛠️ Development Workflow

### Branching Strategy

- Always create a new branch from `main` for your changes:
  ```bash
  git checkout -b feature/your-feature-name
  # or
  git checkout -b fix/your-fix-name
  ```

### Code Style

- The project uses **TypeScript** and **Tailwind CSS**.
- Follow the visual identity defined in [DESIGN.md](DESIGN.md).
- Ensure your changes are type-safe by running `npm run typecheck`.

### Adding a Template

Adding a new PowerShell rule template is the easiest way to contribute:
1.  Add a new `.yaml` file to the [`templates/`](templates/) directory.
2.  Follow the structure in existing templates (e.g., `github.yaml`).
3.  The app will automatically detect and include your template at build time.

## 📦 Versioning & Changesets

InboxCraft uses **Changesets** for versioning and changelog management.

1.  After making your changes, run:
    ```bash
    npx changeset
    ```
2.  Follow the prompts to describe your changes (patch, minor, or major).
3.  Commit the generated `.changeset` file along with your code.

## 🤖 Automating with Antigravity (Agents)

If you are using an AI coding assistant (like Antigravity), you can use built-in workflows to automate common tasks.

### Open a Pull Request

You can ask the agent to **"Open a PR"** or use the `/open-pr` command. This will:
1.  Verify your changes and branch name.
2.  Create a clean commit.
3.  Push your branch to GitHub.
4.  Open a Pull Request with the correct template.

See [.agents/workflows/open-pr.md](.agents/workflows/open-pr.md) for details.

## 📬 Submitting a Pull Request

1.  **Verify** your changes locally (`npm run build` & `npm run typecheck`).
2.  **Commit** your changes with a clear, descriptive message.
3.  **Push** to your fork.
4.  **Open a Pull Request** against the `main` branch of the original repository.
5.  Fill out the **PR Template** to help us review your work faster.

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
