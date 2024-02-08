import generateFileUrl from './generateFileUrl';
import generateCroppedFileUrl from './generateCroppedFileUrl';
import getIconagrapher from './getIconagrapher';

export default async function getIcons(icons) {
    if (!icons) return [];
    let formattedIcons = [];
    for (let icon of icons) {
        let formattedIcon = {
            created: new Date(icon.created),
            id: icon.id,
            name: icon.name,
            updated: new Date(icon.updated),
            caption: icon.caption,
            image: await generateFileUrl(icon),
            croppedImage: await generateCroppedFileUrl(icon),
            iconagrapher: await getIconagrapher(icon.iconographer),
        }
        formattedIcons.push(formattedIcon);
    }
    return formattedIcons;
}