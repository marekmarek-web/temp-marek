const ALLOWED_EXT = new Set(["pdf", "jpg", "jpeg", "png", "webp"]);
const ALLOWED_MIME = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);

/** Bezpečný název pro uložení / e-mail přílohu — bez path traversal a řídicích znaků. */
export function sanitizeUploadFilename(name: string): string {
  const base = name.replace(/[/\\]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120);
  return base.length > 0 ? base : "attachment";
}

function extFromName(filename: string): string {
  const lower = filename.toLowerCase();
  const dot = lower.lastIndexOf(".");
  return dot >= 0 ? lower.slice(dot + 1) : "";
}

export function extensionMatchesMime(filename: string, mime: string): boolean {
  const ext = extFromName(filename);
  if (!ALLOWED_EXT.has(ext)) return false;
  if (ext === "jpg" || ext === "jpeg") return mime === "image/jpeg";
  if (ext === "png") return mime === "image/png";
  if (ext === "webp") return mime === "image/webp";
  if (ext === "pdf") return mime === "application/pdf";
  return false;
}

/** Veřejný upload z kalkulačky: MIME + přípona musí sedět; prázdný MIME povolíme jen u známé přípony. */
export function isAllowedPublicAttachment(file: File, safeFilename: string): boolean {
  const mime = file.type?.trim() ?? "";
  if (mime && !ALLOWED_MIME.has(mime)) return false;
  if (mime && !extensionMatchesMime(safeFilename, mime)) return false;
  if (!mime) {
    const ext = extFromName(safeFilename);
    return ALLOWED_EXT.has(ext);
  }
  return true;
}
