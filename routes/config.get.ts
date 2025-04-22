import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.agios.co');

// return the single row
export default defineEventHandler(async (event) => {
    setResponseHeaders(event, {
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true',
        "Access-Control-Allow-Headers": '*',
        "Access-Control-Expose-Headers": '*'
      })
    const ress = await pb.collection('config').getFullList();
    if (ress.length == 0) {
        return {
            status: 404,
            statusText: "Not Found"
        }
    }
    const res = ress[0];
    return {
        data: {
            ...res, 
            yearAhead: res.yearAhead.split('\n').filter((line: string) => line.trim() !== '')
        },
        status: 200,
        statusText: "OK",
    }
})