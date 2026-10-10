import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const templateUrls = {
    "welcome.html": new URL("../templates/welcome.html", import.meta.url),
    "support-contact.html": new URL("../templates/support-contact.html", import.meta.url),
    "new-post.html": new URL("../templates/new-post.html", import.meta.url),
    "contact-confirmation.html": new URL("../templates/contact-confirmation.html", import.meta.url),
};

export function loadTemplate(name) {
    const templateUrl = templateUrls[name];
    if (!templateUrl) {
        throw new Error(`Unknown email template: ${name}`);
    }
    return fs.readFile(fileURLToPath(templateUrl), "utf8");
}
