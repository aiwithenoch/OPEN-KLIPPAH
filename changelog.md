# Changelog

## 2026-10-20T20:46:23+00:00 — Initial repository inspection

- Objective: evaluate the SupoClip repository as the base for a separately branded fork and determine how to provide a working self-hosting guide under the new product name.
- Starting state: cloned `https://github.com/FujiwaraChoki/supoclip.git` into `work/supoclip`; checkout is at commit `f49cc3b` on `main`, with no local modifications before this entry.
- Inspected repository instructions in `AGENTS.md`, licensing in `LICENSE`, project overview in `README.md`, and the root deployment/documentation layout (`docker-compose.yml`, `.env.example`, `start.sh`, and `docs/`).
- Key constraints identified: the project is AGPL-3.0; the repository currently contains SupoClip-specific names, URLs, assets, and hosted-app references; no replacement product name, domain, logo, or scope of rebranding has been supplied yet.
- Commands run: `git clone https://github.com/FujiwaraChoki/supoclip.git work/supoclip`; `git status --short --branch`; `git log -1 --format='%h %ad %s' --date=iso-strict`; read-only inspection commands for repository files.
- Current state: no branding or code changes made. The next useful step is to choose the new product identity and audit all SupoClip references before editing; then update the deployment guide and verify it from a clean environment.

## 2026-10-20T20:48:00+00:00 — Branding audit completed

- Objective: identify the work required to turn the clone into a separately branded product without leaving misleading upstream references.
- Inspected: `README.md`, `QUICKSTART.md`, `start.sh`, `.env.example`, `docker-compose.yml`, `init.sql`, `CONTRIBUTING.md`, `CLAUDE.md`, `scripts/setup-media-storage.py`, `scripts/monitor-production.py`, `mcp/`, frontend attribution tests, backend test configuration, and documentation files.
- Findings: SupoClip-specific references are present in user-facing copy, hosted/API URLs, custom protocol and MCP identifiers, Docker container/network/database defaults, email defaults, storage helpers, monitoring scripts, tests, screenshots/assets, and the iOS/Product Hunt links. A global text replacement would be unsafe because it could alter protocol names, API compatibility, migrations, or third-party references without a migration plan.
- Decision: do not edit branding until the replacement product name, primary domain, repository URL, and desired compatibility policy are supplied. Preserve the AGPL license and upstream notices; remove upstream hosted-app/store/marketing links only where the fork will not use them.
- Verification: `git status --short --branch` showed the original checkout clean before adding this required changelog; the audit was read-only apart from `changelog.md`.
- Current state: repository is cloned and documented; no application behavior has changed. Next step is to confirm brand identity and scope, then apply the rebrand in grouped passes with clean-install verification.

## 2026-10-20T20:50:00+00:00 — Open Klippah display-name pass

- Objective: apply the confirmed product name `Open Klippah` without changing the clipping pipeline, APIs, persistence model, Docker topology, or internal compatibility identifiers.
- Action: performed a bulk exact-case replacement of the visible `SupoClip` product name with `Open Klippah` across the user-facing application, email templates, seeded announcement copy, documentation, MCP descriptions, tests, and startup/configuration messaging.
- Preserved intentionally: lowercase `supoclip` database/service names, `SUPOCLIP_*` environment variables and auth headers, route slugs, storage/cache keys, MCP package/module names, upstream source URLs, and the AGPL license file. These are compatibility identifiers or references that need a separate migration decision and were not changed mechanically.
- Files affected: 96 text files, including `frontend/src/`, backend email/configuration code, `README.md`, `QUICKSTART.md`, `docs/`, `mcp/`, `docker-compose.yml`, `init.sql`, and `start.sh`.
- Verification: `git diff --check` passed. No functional tests or builds have run yet. The working tree contains only the intentional rebrand edits plus this changelog.
- Risk/follow-up: some upstream domain, repository, App Store, and Product Hunt URLs remain because no Open Klippah domain or repository URL has been supplied. The logo asset is also still the upstream image. Replace those in a later configuration/asset pass once the destinations and visual identity are confirmed.

## 2026-10-20T20:54:40+00:00 — Open Klippah repository-link pass and verification

- Objective: prepare the customized fork for publication in `https://github.com/aiwithenoch/OPEN-KLIPPAH.git`.
- Action: changed source links and self-hosting clone instructions to the Open Klippah repository, set the frontend source-link constant to that repository, and added an `Open Klippah` README heading. Internal `supoclip` compatibility identifiers were left unchanged.
- Verification completed: `git diff --check` passed; frontend ESLint passed with `--max-warnings 0`; TypeScript typecheck passed; Vitest passed with 63 files and 345 tests; production `next build` passed and generated all routes. Build output emitted existing configuration warnings because no production `BETTER_AUTH_URL`/`BETTER_AUTH_SECRET` was supplied in the test environment; no build failure occurred.
- Target remote check: `git ls-remote --heads https://github.com/aiwithenoch/OPEN-KLIPPAH.git` confirmed an existing `main` branch containing only an initial README commit. The original source was retained as the `upstream` remote; the target repository is configured as `origin`.
- Current state: changes are ready to commit and publish. The target branch has unrelated history, so the initial target README must be preserved through an explicit unrelated-history merge before pushing; no force push is planned.
