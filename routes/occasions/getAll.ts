import PocketBase from 'pocketbase';

const pb = new PocketBase('https://agios-calendar.pockethost.io');

import formatRecord from '../../utils/formatRecord';

/**
 * Retrieves all occasions from the database and formats them.
 * @returns {Promise<TLD_Response>} A promise that resolves to the formatted occasions.
 */
export default async function defineEventHandler(event): Promise<TLD_Response>{
    setResponseHeaders(event, {
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true',
        "Access-Control-Allow-Headers": '*',
        "Access-Control-Expose-Headers": '*'
      })
      if(getMethod(event) === 'OPTIONS'){
        event.res.statusCode = 204
        event.res.statusMessage = "No Content."
        return
      }
    const records = await pb.collection('occasion').getFullList({
        expand: 'copticDate,facts,icons,stories'
    });
    let formattedRecords = [];
    for (let record of records) {
        formattedRecords.push(await formatRecord(record));
    }
    return {
      data: formattedRecords,
      status: 200,
      statusText: "OK",
    }
}