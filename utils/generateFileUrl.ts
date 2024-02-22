/**
 * Generates the URL for a file.
 * @param {object} file - The file object.
 * @param {string} file.id - The ID of the file.
 * @param {string} file.image - The image file name.
 * @returns {Promise<string>} The URL of the file.
 */
export default async function generateFileUrl(file) {
    if (!file) {
        return "";
    }
    if (!file.image) {
        return "";
    }
    let fileUrl = `https://agios-calendar.pockethost.io/api/files/nwill40feaquna2/${file.id}/${file.image}`;
    return fileUrl;
}