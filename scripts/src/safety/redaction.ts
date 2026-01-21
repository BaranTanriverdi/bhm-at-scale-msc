const SECRET_PATTERNS: Array<RegExp> = [
  /\b[A-Za-z0-9]{32,}\b/g, // generic API keys / tokens
  /\bAKIA[0-9A-Z]{16}\b/g, // AWS access key id
  /\bghp_[A-Za-z0-9]{30,64}\b/g, // GitHub personal access token (variable length)
  /\b[A-Za-z0-9+/]{40,}=*/g // base64-like secrets
];

const FILE_DENYLIST = [/\.env/i, /secrets/i, /config\.(json|yaml|yml)/i];

export interface RedactionResult {
  content: string;
  redactions: number;
}

export function redactSecrets(content: string): RedactionResult {
  let redactions = 0;
  let sanitized = content;
  for (const pattern of SECRET_PATTERNS) {
  sanitized = sanitized.replace(pattern, (_match) => {
      redactions += 1;
      return "<redacted>";
    });
  }
  return { content: sanitized, redactions };
}

export function isPathDenied(path: string): boolean {
  return FILE_DENYLIST.some((pattern) => pattern.test(path));
}
