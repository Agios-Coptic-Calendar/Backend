import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.agios.co');

/**
 * Retrieves the iconagrapher record from the 'iconagraphers' collection based on the provided iconagrapher ID.
 * @param {Iconagrapher} iconagrapher - The ID of the iconagrapher.
 * @returns {Promise<Iconagrapher>} - The iconagrapher record if found, otherwise an empty string.
 */
export default async function getIconagrapher(iconagrapher) {
    if (!iconagrapher) {
        return "";
    }
    let iconagrapherRecord = await pb.collection('iconagraphers').getOne(iconagrapher);
    delete iconagrapherRecord.collectionId;
    delete iconagrapherRecord.collectionName;
    return iconagrapherRecord;
}