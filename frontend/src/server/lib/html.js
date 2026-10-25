const HTML_ENTITIES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
};

export function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => HTML_ENTITIES[character]);
}

export function renderTemplate(template, values) {
    return template.replace(/\{\{([^{}]+)\}\}/g, (placeholder, key) => (
        Object.hasOwn(values, key) ? values[key] : placeholder
    ));
}
