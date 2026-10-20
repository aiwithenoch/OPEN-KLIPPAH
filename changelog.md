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

## 2026-10-20T20:57:21+00:00 — Full upstream-name cleanup

- Objective: honor the follow-up requirement that the working tree contain no remaining SupoClip product identifiers while keeping application behavior and the clipping pipeline equivalent.
- Correction to earlier entries: the prior pass intentionally preserved lowercase `supoclip` identifiers and upstream URLs. That decision was superseded by the user’s explicit request for no remaining SupoClip traces.
- Action: replaced remaining lowercase and uppercase identifiers with Open Klippah equivalents across tracked source, configuration, tests, docs, MCP environment names, API headers, Docker/service/database/network names, queue/cache/storage prefixes, route slugs, and URLs. Renamed the MCP package directory and two blog image assets to their Open Klippah names.
- Preserved intentionally: `LICENSE`, the append-only historical entries in this changelog, and Git history containing upstream provenance. These are not runtime branding and must remain for attribution and auditability.
- Domain assumption: `openklippah.com`, `api.openklippah.com`, and `mcp.openklippah.com` are provisional branded replacements because no production domain was supplied. They should be changed together if the final domain differs.
- Push status: the first push attempt was interrupted before the target branch advanced; `origin/main` remained at the target repository’s initial README commit. No partial branch update was observed.
- Current state: full cleanup is uncommitted and requires frontend, backend, and MCP verification before a new commit and push.

## 2026-10-20T21:00:10+00:00 — Cleanup verification and Python identifier repair

- Objective: remove the syntax regression introduced when the no-traces pass changed Python class identifiers containing the visible product name.
- Action: repaired the MCP identifiers to valid `OpenKlippahClient`, `OpenKlippahError`, and `OpenKlippahApiKeyVerifier` names, while keeping human-facing strings branded `Open Klippah`.
- Verification: bundled Python `compileall` passed for `backend/src`, `backend/tests`, `mcp/src`, `mcp/tests`, and `scripts`; `git diff --check` passed; tracked source and paths contain no case-insensitive `supoclip` references outside the preserved changelog and license. Frontend lint, typecheck, full Vitest, and production build had already passed after the full cleanup; the one email-deliveries timeout passed when rerun alone.
- Limitation: `mcp/tests/test_client_download.py` could not run because the bundled Python environment does not include `pytest`; no dependency installation was performed.
- Current state: cleanup is syntactically valid and ready for final review, commit, and non-force push to the configured Open Klippah origin.

## 2026-10-20T21:00:46+00:00 — Published Open Klippah cleanup

- Objective: publish the completed Open Klippah customization to the requested GitHub repository.
- Commands: committed as `4b99cb9` with `git commit -m "Remove upstream SupoClip identifiers"`; pushed with `GIT_TERMINAL_PROMPT=0 git push --progress -u origin main`; verified with `git ls-remote --heads origin main`.
- Result: local `HEAD` and remote `origin/main` both resolve to `4b99cb9be8c9e4009fd9309b7f979e9efca04ffe`; the worktree is clean and tracks `origin/main`.
- Deferred: the `openklippah.com`/API/MCP hostnames remain provisional until a production domain is chosen. The historical changelog and Git ancestry retain upstream provenance for licensing/auditability; runtime and tracked working-tree branding do not.

## 2026-10-20T21:06:03+00:00 — Replaced editor screenshot with supplied clip-projects image

- Objective: replace the remaining old editor screenshot with the user-supplied Open Klippah clip-projects screenshot.
- Action: removed `frontend/public/blog/openklippah-editor.webp`, added the supplied 1195×874 PNG as `frontend/public/blog/openklippah-editor.png`, and updated `frontend/src/components/supo-live-article.tsx` metadata, image references, dimensions, alt text, and caption.
- Verification: frontend lint, typecheck, and production build passed with the bundled Node runtime. The build emitted the existing Better Auth base URL/default-secret warnings but completed successfully; `git diff --check` passed and all asset references resolve to the new PNG.
- Current state: the image change is ready to commit and push to `origin/main`.
