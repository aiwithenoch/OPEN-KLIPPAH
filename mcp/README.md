# Open Klippah MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io) server for
[Open Klippah](https://openklippah.com) — turn long-form videos (YouTube links or
direct URLs) into short, vertical, subtitled viral clips from any MCP client
(Claude Desktop, Claude Code, Cursor, etc.).

By default it talks to the **official hosted Open Klippah API** at
`https://api.openklippah.com`. Point it at your own deployment by setting
`OPEN_KLIPPAH_API_URL`.

## What it can do

| Tool | Auth | Description |
|------|:----:|-------------|
| `openklippah_health` | – | API status + how this server is configured |
| `openklippah_list_caption_templates` | – | Available caption styles (default, hormozi, mrbeast, …) |
| `openklippah_list_transitions` | – | Available transition effects |
| `openklippah_broll_status` | – | Whether B-roll overlays are configured |
| `openklippah_list_fonts` | ✓ | Subtitle fonts available to your account |
| `openklippah_billing_summary` | ✓ | Plan, usage and remaining quota |
| `openklippah_create_clip_task` | ✓ | Start clipping a video → returns a `task_id` |
| `openklippah_list_tasks` | ✓ | List your tasks |
| `openklippah_get_task` | ✓ | Task status, progress and clips |
| `openklippah_wait_for_task` | ✓ | Poll until a task finishes |
| `openklippah_list_clips` | ✓ | List a task's generated clips |
| `openklippah_download_clip` | ✓ | Save a clip's MP4 to disk |
| `openklippah_export_clip` | ✓ | Re-encode + save with a platform preset (tiktok/reels/shorts) |
| `openklippah_cancel_task` / `openklippah_resume_task` / `openklippah_delete_task` | ✓ | Manage tasks |

Tools marked ✓ require an API key (or self-host credentials, see below).

## Getting an API key

1. Sign in at [openklippah.com](https://openklippah.com).
2. Go to **Settings → API Keys**.
3. Create a key and copy it (it's shown only once). It looks like `sk_…`.

## Configuration

All configuration is via environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `OPEN_KLIPPAH_API_KEY` | – | Your API key (recommended auth). |
| `OPEN_KLIPPAH_API_URL` | `https://api.openklippah.com` | Backend base URL. Set for self-hosting. |
| `OPEN_KLIPPAH_DOWNLOAD_DIR` | `./openklippah-downloads` | Where downloaded/exported clips are written. |
| `OPEN_KLIPPAH_TIMEOUT` | `60` | HTTP timeout (seconds) for non-download requests. |
| `OPEN_KLIPPAH_USER_ID` | – | Self-host only: authenticate by user id (see below). |
| `OPEN_KLIPPAH_AUTH_SECRET` | – | Self-host only: backend `BACKEND_AUTH_SECRET` for HMAC signing. |

### Self-hosting auth

If you run your own backend you have three options:

- **API key** (same as hosted): create a key and set `OPEN_KLIPPAH_API_KEY`.
- **Signed headers**: set `OPEN_KLIPPAH_USER_ID` + `OPEN_KLIPPAH_AUTH_SECRET` (your
  backend's `BACKEND_AUTH_SECRET`).
- **Unsigned**: if the backend runs with `ALLOW_UNSIGNED_BACKEND_AUTH=true`,
  just set `OPEN_KLIPPAH_USER_ID`.

Auth precedence is: API key → signed headers → unsigned user id.

## Install & run

Requires Python 3.10+. With [uv](https://docs.astral.sh/uv/):

```bash
cd mcp
uv run openklippah-mcp        # runs the stdio server
```

Or install into the current environment:

```bash
pip install -e .
openklippah-mcp
```

## Hosted SSE server

For clients that add a remote MCP URL, run the server over SSE and require a
Open Klippah API key as the client Bearer token:

```bash
OPEN_KLIPPAH_API_URL=https://api.openklippah.com \
OPEN_KLIPPAH_MCP_TRANSPORT=sse \
OPEN_KLIPPAH_MCP_HOST=0.0.0.0 \
OPEN_KLIPPAH_MCP_PORT=9100 \
OPEN_KLIPPAH_MCP_PUBLIC_URL=https://mcp.openklippah.com \
OPEN_KLIPPAH_MCP_REQUIRE_BEARER_AUTH=true \
openklippah-mcp
```

Then configure the MCP client with:

```text
Server URL: https://mcp.openklippah.com/sse
Transport: SSE
Authentication: Bearer Token
Token: sk_your_openklippah_api_key
```

With Docker Compose, the `mcp` service runs this mode by default and binds to
`127.0.0.1:9100` for a reverse proxy.

## Use with Claude Desktop / Claude Code

Add to your MCP client config (e.g. `claude_desktop_config.json`, or via
`claude mcp add`). Example using `uv` to run from a checkout:

```json
{
  "mcpServers": {
    "openklippah": {
      "command": "uv",
      "args": ["--directory", "/absolute/path/to/openklippah/mcp", "run", "openklippah-mcp"],
      "env": {
        "OPEN_KLIPPAH_API_KEY": "sk_your_key_here"
      }
    }
  }
}
```

For a self-hosted backend, add `"OPEN_KLIPPAH_API_URL": "http://localhost:8000"` to `env`.

With Claude Code:

```bash
claude mcp add openklippah -e OPEN_KLIPPAH_API_KEY=sk_your_key_here \
  -- uv --directory /absolute/path/to/openklippah/mcp run openklippah-mcp
```

## Example prompts

- "Use openklippah to make clips from https://youtu.be/… with the hormozi caption template, then wait for it and download the top clip."
- "List my recent openklippah tasks and show the virality scores of the latest one's clips."
- "Export clip <id> from task <id> as a TikTok preset."

## License

AGPL-3.0-or-later, matching the Open Klippah project.
