export function removeTags(html) {
    return html.replace(/<[^>]*>/g, '');
}