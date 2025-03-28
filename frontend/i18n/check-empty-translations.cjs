// biome-ignore lint/style/useNodejsImportProtocol:
const fs = require("fs");
// biome-ignore lint/style/useNodejsImportProtocol:
const path = require("path");

const CURRENT_DIR = path.dirname(__filename);
const LOCALES = ["en", "fr"];

let hasErrors = false;

LOCALES.map((locale) => {
  const filename = path.join(CURRENT_DIR, `${locale}.json`);
  const file = fs.readFileSync(filename, "utf-8");
  const translations = JSON.parse(file);
  const emptyKeys = Object.keys(translations).filter(
    (key) => translations[key].trim() === "",
  );

  if (emptyKeys.length > 0) {
    hasErrors = true;
    console.error(`Empty translations for ${locale}:`, emptyKeys);
  }
});

if (hasErrors) {
  process.exit(1);
}
