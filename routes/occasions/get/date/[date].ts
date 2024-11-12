import PocketBase, { RecordModel } from "pocketbase";

const pb = new PocketBase("https://agios-calendar.pockethost.io");

import formatRecord from "../../../../utils/formatRecord";

/**
 * Defines the event handler for retrieving an occasion by its ID.
 * @param event The event object.
 * @returns A Promise that resolves to a TLD_Response object.
 */
export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "*",
  });
  if (getMethod(event) === "OPTIONS") {
    event.res.statusCode = 204;
    event.res.statusMessage = "No Content.";
    return "OK";
  }
  const date = getRouterParam(event, "date");
  const dateIn10Days = new Date(new Date(date).getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  
  let record: RecordModel;
  let res = await pb
    .collection("occasion")
    .getList(1, 10, {
      filter: `date >= "${date}" && date <= "${dateIn10Days}"`,
      expand: 'copticDate,facts,icons,stories,icons.story,notables,notables.copticDate',
    });
  if (res.totalItems == 0) {
    return {
      status: 404,
      statusText: "Not Found",
    };
  }
  
  record = res.items[0];
  let formattedRecord = await formatRecord(record);

  let notables = [];
  for (let i = 0; i < res.items.length; i++) {
    if (res.items[i].notables.length > 0) {
      notables = notables.concat(res.items[i].expand.notables);
    }
  }

  if (notables.length > 0) {
    formattedRecord.notables = notables
  }

  return {
    data: formattedRecord,
    status: 200,
    statusText: "OK",
  };
});
