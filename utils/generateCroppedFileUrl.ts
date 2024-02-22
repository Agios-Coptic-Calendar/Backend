/**
 * Generates the cropped URL for a file.
 * @param {object} file - The file object.
 * @param {string} file.id - The ID of the file.
 * @param {string} file.croppedImage - The cropped image file name.
 * @returns {Promise<string>} The URL of the file.
 */
export default async function generateCroppedFileUrl(file) {
    if (!file) {
        return "";
    }
    if (!file.croppedImage) {
        return "";
    }
    let fileUrl = `https://agios-calendar.pockethost.io/api/files/nwill40feaquna2/${file.id}/${file.croppedImage}`;
    return fileUrl;
}