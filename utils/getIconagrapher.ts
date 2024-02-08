import PocketBase from 'pocketbase';

const pb = new PocketBase('https://agios-calendar.pockethost.io');

export default async function getIconagrapher(iconagrapher) {
    if (!iconagrapher) {
        return "";
    }
    let iconagrapherRecord = await pb.collection('iconagraphers').getOne(iconagrapher);
    delete iconagrapherRecord.collectionId;
    delete iconagrapherRecord.collectionName;
    return iconagrapherRecord;
}