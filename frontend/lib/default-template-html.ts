export const DEFAULT_TEMPLATE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Template preview</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: ui-sans-serif, system-ui, sans-serif;
      background: radial-gradient(1200px 600px at 20% -10%, #2e1064 0%, transparent 55%),
        radial-gradient(900px 500px at 100% 0%, #1e3a5f 0%, transparent 50%),
        #07070c;
      color: #e4e4e7;
      display: grid;
      place-items: center;
      padding: 2rem;
    }
    .shell {
      width: min(100%, 28rem);
      padding: 2rem;
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(12px);
      text-align: center;
    }
    h1 { font-size: 1.35rem; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
    p { margin: 0; color: #a1a1aa; font-size: 0.9rem; line-height: 1.55; }
    .pill {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #c4b5fd;
      border: 1px solid rgba(139, 92, 246, 0.45);
      background: rgba(139, 92, 246, 0.12);
    }
  </style>
</head>
<body>
  <div class="shell">
    <div class="pill">LumosUI · Templates</div>
    <h1 style="margin-top:1rem">Replace this HTML</h1>
    <p>Paste a full document or a fragment. The live preview updates as you type.</p>
  </div>
</body>
</html>`;

export const EMPTY_PREVIEW_FALLBACK =
  "<p style=\"font-family:system-ui;padding:2rem;color:#71717a;margin:0\">No HTML to preview.</p>";
