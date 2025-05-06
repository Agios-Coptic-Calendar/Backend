import PocketBase, { RecordModel } from 'pocketbase';
const pb = new PocketBase('https://pb.agios.co');

import formatRecord from '../../../../utils/formatRecord';

/**
 * GET /occasions/get/date/:date   (YYYY-MM-DD)
 * Returns the occasion on that date, with notables merged from a 10-day range.
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

  /* ----------  Validate YYYY-MM-DD ---------- */
  const param = getRouterParam(event, 'date');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(param ?? '')) {
    return { status: 400, statusText: 'Bad date format (YYYY-MM-DD expected)' };
  }

  /* ----------  Build 10-day range ---------- */
  const startPB = `${param} 00:00:00.000Z`;
  const endDate = new Date(new Date(param).getTime() + 10 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const endPB = `${endDate} 23:59:59.999Z`;

  /* ----------  Expand fields ---------- */
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

  /* ----------  Query PocketBase ---------- */
  const res = await pb.collection('occasion').getList(1, 100, {
    filter: `date >= "${startPB}" && date <= "${endPB}"`,
    sort: '+date',
    expand,
  });

  if (res.totalItems === 0) {
    return { status: 404, statusText: 'Not Found' };
  }

  /* ----------  Format the first occasion ---------- */
  const record = res.items[0] as RecordModel;
  const formattedRecord = await formatRecord(record);

  /* ----------  Aggregate notables from all items ---------- */
  let notables = [];
  for (let i = 0; i < res.items.length; i++) {
    const expandedNotables = res.items[i].expand?.notables ?? [];
    notables = notables.concat(expandedNotables);
  }

  formattedRecord.notables = notables;

  /* ----------  Done ---------- */
  return {
    data: formattedRecord,
    status: 200,
    statusText: 'OK',
  };
});
