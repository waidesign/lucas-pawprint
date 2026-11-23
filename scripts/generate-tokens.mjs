import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const DESIGN_MD_PATH = path.join(ROOT_DIR, "design.md");
const OUTPUT_CSS_PATH = path.join(ROOT_DIR, "src", "styles", "tokens.css");

const TAILWIND_THEME_PREFIXES = [
  "--color-",
  "--font-",
  "--text-",
  "--font-weight-",
  "--tracking-",
  "--leading-",
  "--breakpoint-",
  "--container-",
  "--spacing-",
  "--radius-",
  "--shadow-",
  "--inset-shadow-",
  "--drop-shadow-",
  "--blur-",
  "--perspective-",
  "--aspect-",
  "--ease-",
  "--animate-",
];

function stripBackticks(str) {
  return str.trim().replace(/^`+|`+$/g, "").trim();
}

function normalizeTokenName(rawName, currentSection = "") {
  let name = stripBackticks(rawName).replace(/^\*\*|\*\*$/g, "").trim();
  if (!name) return null;
  if (!name.startsWith("--")) {
    const sec = currentSection.toLowerCase();
    if (sec.includes("color") && !name.startsWith("color-")) name = `color-${name}`;
    else if (sec.includes("font") && !name.startsWith("font-")) name = `font-${name}`;
    else if (sec.includes("radi") && !name.startsWith("radius-")) name = `radius-${name}`;
    else if (sec.includes("shadow") && !name.startsWith("shadow-")) name = `shadow-${name}`;
    else if ((sec.includes("motion") || sec.includes("eas")) && !name.startsWith("ease-")) name = `ease-${name}`;
    else if (sec.includes("spac") && !name.startsWith("spacing-")) name = `spacing-${name}`;
    name = `--${name}`;
  }
  return /^--[a-zA-Z0-9-_]+$/.test(name) ? name : null;
}

export function parseDesignMd(markdown) {
  const lightTokens = new Map();
  const darkTokens = new Map();

  const lines = markdown.split(/\r?\n/);
  let currentSection = "";
  let tableHeaders = null;
  let inCssBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Track headings
    const headingMatch = line.match(/^#{1,6}\s+(.+)$/);
    if (headingMatch) {
      currentSection = headingMatch[1].trim();
      tableHeaders = null;
      continue;
    }

    // Track fenced CSS/tokens blocks
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim().toLowerCase();
      if (!inCssBlock && (lang === "css" || lang === "tokens")) {
        inCssBlock = true;
      } else if (inCssBlock) {
        inCssBlock = false;
      }
      continue;
    }

    if (inCssBlock) {
      const propMatch = line.match(/^(--[a-zA-Z0-9-_]+)\s*:\s*(.+?);?$/);
      if (propMatch) {
        const [, token, value] = propMatch;
        if (currentSection.toLowerCase().includes("dark")) {
          darkTokens.set(token, value.trim());
        } else {
          lightTokens.set(token, value.trim());
        }
      }
      continue;
    }

    // Parse Markdown tables
    if (line.startsWith("|") && line.endsWith("|")) {
      const cells = line
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());

      // Check if separator row
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) {
        continue;
      }

      if (!tableHeaders) {
        tableHeaders = cells.map((h) => h.toLowerCase());
        continue;
      }

      const tokenIdx = tableHeaders.findIndex((h) => h.includes("token") || h.includes("name") || h.includes("variable"));
      const valueIdx = tableHeaders.findIndex((h) => h.includes("value") || h.includes("light") || h.includes("default"));
      const darkIdx = tableHeaders.findIndex((h) => h.includes("dark"));

      if (tokenIdx !== -1 && valueIdx !== -1 && cells[tokenIdx] && cells[valueIdx]) {
        const token = normalizeTokenName(cells[tokenIdx], currentSection);
        const lightVal = stripBackticks(cells[valueIdx]);
        if (token && lightVal && lightVal !== "-") {
          lightTokens.set(token, lightVal);
        }
        if (token && darkIdx !== -1 && cells[darkIdx]) {
          const darkVal = stripBackticks(cells[darkIdx]);
          if (darkVal && darkVal !== "-") {
            darkTokens.set(token, darkVal);
          }
        }
      }
      continue;
    } else {
      tableHeaders = null;
    }

    // Parse bullet definitions: - `--token`: `value`
    const bulletMatch = line.match(/^[-*]\s+`?(--[a-zA-Z0-9-_]+)`?\s*:\s*`?([^`]+?)`?$/);
    if (bulletMatch) {
      const [, rawToken, rawValue] = bulletMatch;
      const token = normalizeTokenName(rawToken, currentSection);
      const val = stripBackticks(rawValue);
      if (token && val) {
        if (currentSection.toLowerCase().includes("dark")) {
          darkTokens.set(token, val);
        } else {
          lightTokens.set(token, val);
        }
      }
    }
  }

  return { lightTokens, darkTokens };
}

export function generateTokensCss({ lightTokens, darkTokens }) {
  const header = `/* AUTO-GENERATED FROM design.md — DO NOT EDIT DIRECTLY.
 * Run \`npm run tokens\` to regenerate.
 */\n\n`;

  const rootLines = [];
  for (const [token, value] of lightTokens.entries()) {
    rootLines.push(`  ${token}: ${value};`);
  }

  const darkLines = [];
  for (const [token, value] of darkTokens.entries()) {
    darkLines.push(`  ${token}: ${value};`);
  }

  const themeLines = [];
  for (const [token] of lightTokens.entries()) {
    const isTailwindToken = TAILWIND_THEME_PREFIXES.some((prefix) => token.startsWith(prefix));
    if (isTailwindToken) {
      themeLines.push(`  ${token}: var(${token});`);
    }
  }

  let css = header;
  css += `:root {\n${rootLines.join("\n")}\n}\n\n`;

  if (darkLines.length > 0) {
    css += `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${darkLines.map((l) => "  " + l).join("\n")}\n  }\n}\n\n`;
    css += `[data-theme="dark"] {\n${darkLines.join("\n")}\n}\n\n`;
  }

  css += `@theme inline {\n${themeLines.join("\n")}\n}\n`;
  return css;
}

function main() {
  if (!fs.existsSync(DESIGN_MD_PATH)) {
    console.error(`Error: design.md not found at ${DESIGN_MD_PATH}`);
    process.exit(1);
  }

  const markdown = fs.readFileSync(DESIGN_MD_PATH, "utf8");
  const parsed = parseDesignMd(markdown);
  const css = generateTokensCss(parsed);

  fs.mkdirSync(path.dirname(OUTPUT_CSS_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_CSS_PATH, css, "utf8");

  console.log(
    `✓ Generated ${parsed.lightTokens.size} tokens (${parsed.darkTokens.size} dark overrides) from design.md -> src/styles/tokens.css`
  );
}

main();
