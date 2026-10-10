import fs from "node:fs/promises";
import path from "node:path";

const templateNames = new Set([
    "welcome.html",
    "support-contact.html",
    "new-post.html",
    "contact-confirmation.html",
]);

const templatesDirectory = path.join(process.cwd(), "src", "server", "templates");

export function loadTemplate(name) {
    if (!templateNames.has(name)) {
        throw new Error(`Unknown email template: ${name}`);
    }
    return fs.readFile(path.join(templatesDirectory, name), "utf8");
}
