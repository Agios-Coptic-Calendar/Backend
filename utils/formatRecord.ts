import PocketBase from 'pocketbase';

const pb = new PocketBase('https://agios-calendar.pockethost.io');

import getIcons from './getIcons';
import getStories from './getStories';
import getFacts from './getFacts';

export default async function formatRecord(record): Promise<Data> {
    let formattedRecord = {
        created: new Date(record.created),
        date: new Date(record.date),
        copticDate: {
            created: new Date(record.expand.copticDate.created),
            day: record.expand.copticDate.day,
            id: record.expand.copticDate.id,
            month: record.expand.copticDate.month,
            updated: new Date(record.expand.copticDate.updated),
        },
        icons: await getIcons(record.expand.icons),
        stories: await getStories(record.expand.stories),
        facts: await getFacts(record.expand.facts),
        id: record.id,
        liturgicalInformation: record.liturgicalInformation,
        name: record.name,
        updated: new Date(record.updated),
    }

    return formattedRecord;
}