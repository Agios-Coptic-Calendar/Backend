import PocketBase from "pocketbase";

const pb = new PocketBase("https://agios-calendar.pockethost.io");

import formatRecord from "../../../utils/formatRecord";

/**
 * Retrieves all occasions from the database and formats them.
 * @returns {Promise<TLD_Response>} A promise that resolves to the formatted occasions.
 */
export default async function defineEventHandler(): Promise<TLD_Response> {
  const records = await pb.collection("occasion").getFullList({
    expand: "copticDate,facts,icons,stories",
    filter: 'date ~ "' + new Date().toISOString().split("T")[0] + '"',
  });
  let formattedRecords = [];
  for (let record of records) {
    formattedRecords.push(await formatRecord(record, true));
  }
  return {
    data: formattedRecords,
    status: 200,
    statusText: "OK",
  };
}
