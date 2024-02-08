import getHighlights from './getHighlights';

export default async function getStories(stories) {
    if (!stories) return [];
    let formattedStories = [];
    for (let story of stories) {
        let formattedStory = {
            created: new Date(story.created),
            id: story.id,
            updated: new Date(story.updated),
            saint: story.saint,
            story: story.story,
            highlights: await getHighlights(story.highlights),
        }
        formattedStories.push(formattedStory);
    }
    return formattedStories;
}