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