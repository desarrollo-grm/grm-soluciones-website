import fs from "node:fs/promises";

export function loadTemplate(name) {
    return fs.readFile(new URL(`./templates/${name}`, import.meta.url), "utf8");
}
