import getIcons from "./getIcons";
import getStories from "./getStories";
import getFacts from "./getFacts";
import { getReadings } from "./getReadings";
import getUpcomingEvents from "./getUpcomingEvents";
import { RecordModel } from "pocketbase";

/**
 * Formats a record into a specific data structure.
 * @param record - The record to be formatted.
 * @returns {Promise<Data>} A Promise that resolves to the formatted data.
 */
export default async function formatRecord(
  record: RecordModel,
  // upcoming: boolean,
): Promise<Data> {
  let formattedRecord = {
    created: new Date(record.created),
    date: new Date(record.date),
    copticDate: {
      created: new Date(record.expand.copticDate?.created),
      day: record.expand.copticDate?.day,
      id: record.expand.copticDate?.id,
      month: record.expand.copticDate?.month,
      updated: new Date(record.expand.copticDate?.updated),
      gregorianDate: new Date(record.expand.copticDate?.gregorianDate),
    },
    icons: await getIcons(record.expand.icons),
    stories: await getStories(record.expand.stories),
    facts: await getFacts(record.expand.facts),
    id: record.id,
    liturgicalInformation: record.liturgicalInformation,
    name: record.name,
    updated: new Date(record.updated),
    readings: await getReadings(new Date(record.date)),
    isWellKnown: record.isWellKnown,
    // upcomingEvents: upcoming
    //   ? await getUpcomingEvents(new Date(record.date))
    //   : [],
  };

  return formattedRecord;
}
