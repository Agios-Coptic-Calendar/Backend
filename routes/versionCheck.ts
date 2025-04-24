import PocketBase from 'pocketbase';
import { lt } from 'semver';

const pb = new PocketBase('https://pb.agios.co');

export default defineEventHandler(async (event) => {
    setResponseHeaders(event, {
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true',
        "Access-Control-Allow-Headers": '*',
        "Access-Control-Expose-Headers": '*'
    });

    const query = getQuery(event);
    const current_version = query.current_version;

    if (!current_version || typeof current_version !== 'string') {
        return {
            status: 400,
            statusText: "Bad Request",
            error: "Missing or invalid 'current_version' query parameter."
        };
    }

    try {
        const versionInfo = await pb.collection('appVersionStatus').getFirstListItem('');

        // Trim all string values from the record
        const {
            latestVersion,
            minRequiredVersion,
            updateUrl,
            message,
        } = versionInfo;

        return {
            type: lt(current_version, minRequiredVersion.trim()) ? 'force' : (lt(current_version, latestVersion.trim()) ? 'optional' : 'none'),
            latestVersion: latestVersion.trim(),
            minRequiredVersion: minRequiredVersion.trim(),
            updateUrl: updateUrl.trim(),
            message: message.trim(),
        };
    } catch (error) {
        return {
            status: 500,
            error: error?.message || 'Internal Server Error',
        };
    }
});