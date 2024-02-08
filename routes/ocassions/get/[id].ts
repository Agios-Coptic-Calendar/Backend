import PocketBase from 'pocketbase';

const pb = new PocketBase('https://agios-calendar.pockethost.io');

import formatRecord from '../../../utils/formatRecord';

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