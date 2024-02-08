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