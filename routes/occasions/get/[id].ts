import PocketBase from 'pocketbase';

const pb = new PocketBase('https://agios-calendar.pockethost.io');

import formatRecord from '../../../utils/formatRecord';

/**
 * Defines the event handler for retrieving an occasion by its ID.
 * @param event The event object.
 * @returns A Promise that resolves to a TLD_Response object.
 */
export default async function defineEventHandler(event): Promise<TLD_Response> {
    const id = getRouterParam(event, 'id')
    let record = await pb.collection('occasion').getOne(id, {
        expand: 'copticDate,facts,icons,stories'
    });
    let formattedRecord = await formatRecord(record);
    if (!record) {
        return {
            status: 404,
            statusText: "Not Found"
        }
    }
    return {
        data: formattedRecord,
        status: 200,
        statusText: "OK",
    }
}