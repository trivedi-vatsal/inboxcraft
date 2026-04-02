---
description: Automatically open a GitHub Pull Request with the correct template and metadata
---

This workflow automates the process of pushing current changes and opening a Pull Request on GitHub.

1. **Check Git Status**
   Review any uncommitted changes and the current branch name.
   ```bash
   git status
   ```

2. **Verify Branch**
   Check that you are NOT on the `main` branch. If you are, the user should be prompted to create a new branch first.
   ```bash
   git branch --show-current
   ```

3. **Stage and Commit**
   If there are uncommitted changes, stage them and prompt the user for a commit message (or suggest one).
   ```bash
   git add .
   git commit -m "[Your Commit Message]"
   ```

4. **Verify Changeset**
   For logic or feature changes, ensure a changeset exists.
   ```bash
   ls .changeset
   ```
   If missing, run `npx changeset` first.

// turbo
5. **Push to Remote**
   Push the current branch to the origin.
   ```bash
   git push -u origin $(git branch --show-current)
   ```

// turbo
6. **Create Pull Request**
   Use the GitHub CLI (`gh`) to create the PR. It will automatically use the `.github/PULL_REQUEST_TEMPLATE.md` if it exists.
   ```bash
   gh pr create --fill --web
   ```
   *Note: `--fill` uses commit messages for the title/body; `--web` opens the browser for final review.*

7. **Final Review**
   Show the PR URL to the user and confirm it's live.

---
**Tip**: Run this workflow by saying "Open a PR" or similar.
