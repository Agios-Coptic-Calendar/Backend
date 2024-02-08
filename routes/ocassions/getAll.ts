import PocketBase from 'pocketbase';

const pb = new PocketBase('https://agios-calendar.pockethost.io');

import formatRecord from '../../utils/formatRecord';

export default async function defineEventHandler(): Promise<TLD_Response>{
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