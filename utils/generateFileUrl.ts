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