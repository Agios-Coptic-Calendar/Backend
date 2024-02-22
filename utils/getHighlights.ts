/**
 * Formats an array of highlights by converting the "created" and "updated" properties to Date objects.
 * @param {Highlight[]} highlights - The array of highlights to be formatted.
 * @returns {Highlight[]} - The formatted array of highlights.
 */
export default async function getHighlights(highlights) {
    if (!highlights) return [];
    let formattedHighlights = [];
    for (let highlight of highlights) {
        let formattedHighlight = {
            created: new Date(highlight.created),
            id: highlight.id,
            updated: new Date(highlight.updated),
            highlight: highlight.highlight,
        }
        formattedHighlights.push(formattedHighlight);
    }
    return formattedHighlights;
}