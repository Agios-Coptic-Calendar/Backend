import PocketBase from "pocketbase";

const pb = new PocketBase("https://pb.agios.co");

export default async function getUpcomingEvents(date) {
  let occasions: any = await pb.collection("occasion").getList(1, 10, {
    filter: 'date >= "' + date.toISOString().split("T")[0] + '"',
    expand: 'copticDate,facts,icons,stories'
  });
  console.log(occasions);
  occasions = occasions.items;
  for (let i = 0; i < occasions.length; i++) {
    occasions[i] = await formatRecord(occasions[i], false);
  }
  return occasions;
}
