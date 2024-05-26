import getHighlights from './getHighlights';

/**
 * Retrieves and formats stories.
 * @param {Story[]} stories - The array of stories to be formatted.
 * @returns {Promise<Story[]>} - The formatted array of stories.
 */
export default async function getStories(stories) {
    if (!stories) return [];
    let formattedStories = [];
    for (let story of stories) {
        let formattedStory = {
            created: new Date(story.created),
            id: story.id,
            updated: new Date(story.updated),
            saint: story.title,
            story: story.story,
            highlights: await getHighlights(story.highlights)
        }
        formattedStories.push(formattedStory);
    }
    return formattedStories;
}
