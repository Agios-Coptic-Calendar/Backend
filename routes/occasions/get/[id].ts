import PocketBase from 'pocketbase';

const pb = new PocketBase('https://agios-calendar.pockethost.io');

import formatRecord from '../../../utils/formatRecord';

/**
 * Defines the event handler for retrieving an occasion by its ID.
 * @param event The event object.
 * @returns A Promise that resolves to a TLD_Response object.
 */
export default defineEventHandler(async event => {
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
        return 'OK'
      }
    const id = getRouterParam(event, 'id')
    let record = await pb.collection('occasion').getOne(id, {
        expand: 'copticDate,facts,icons,stories,icons.story'
    });
    let formattedRecord = await formatRecord(record, true);
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
})