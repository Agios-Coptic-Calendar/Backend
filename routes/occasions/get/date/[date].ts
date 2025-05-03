import PocketBase, { RecordModel } from 'pocketbase';
const pb = new PocketBase('https://pb.agios.co');

import formatRecord from '../../../../utils/formatRecord';

/**
 * GET /occasions/get/date/:date   (YYYY-MM-DD)
 * Returns the occasion whose `date` field falls on that UTC day.
 */
export default defineEventHandler(async (event) => {
  /* ----------  CORS pre-flight  ---------- */
  setResponseHeaders(event, {
    'Access-Control-Allow-Methods'     : 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Access-Control-Allow-Origin'      : '*',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Headers'     : '*',
    'Access-Control-Expose-Headers'    : '*',
  });
  if (getMethod(event) === 'OPTIONS') {
    event.res.statusCode    = 204;
    event.res.statusMessage = 'No Content.';
    return 'OK';
  }

  /* ----------  Validate YYYY-MM-DD  ---------- */
  const param = getRouterParam(event, 'date');            // e.g. “2025-04-10”
  if (!/^\d{4}-\d{2}-\d{2}$/.test(param ?? '')) {
    return { status: 400, statusText: 'Bad date format (YYYY-MM-DD expected)' };
  }

  /* ----------  Build PocketBase-friendly range strings  ---------- */
  // NB: PocketBase stores "2025-04-10 00:00:00.000Z" (space, not “T”)
  const startPB = `${param} 00:00:00.000Z`;
  const endPB   = `${param} 23:59:59.999Z`;

  const expand = [
    'copticDate',
    'facts',
    'icons',
    'stories',
    'icons.story',
    'notables',
    'notables.copticDate',
    'notables.facts',
    'notables.icons',
    'notables.stories',
    'notables.icons.story',
  ].join(',');

  /* ----------  Query PocketBase  ---------- */
  const res = await pb.collection('occasion').getList(1, 1, {
    filter : `date >= "${startPB}" && date <= "${endPB}"`,
    sort   : '+date',                                     // earliest first
    expand,
  });

  if (res.totalItems === 0) {
    return { status: 404, statusText: 'Not Found' };
  }

  /* ----------  Format & merge notables  ---------- */
  const record          = res.items[0] as RecordModel;
  const formattedRecord = await formatRecord(record);

  if (record.notables?.length) {
    formattedRecord.notables = record.expand?.notables ?? [];
  }

  /* ----------  Done  ---------- */
  return {
    data       : formattedRecord,
    status     : 200,
    statusText : 'OK',
  };
});
