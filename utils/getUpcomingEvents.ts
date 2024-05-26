import PocketBase from "pocketbase";

const pb = new PocketBase("https://agios-calendar.pockethost.io");

export default async function getUpcomingEvents(date) {
  let occasions: any = await pb.collection("occasion").getList(1, 10, {
    filter: 'date >= "' + date.toISOString().split("T")[0] + '"',
  });
  console.log(occasions);
  occasions = occasions.items;
  return occasions;
}
