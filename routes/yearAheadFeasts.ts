import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.agios.co');

export default defineEventHandler(async (event) => {
    setResponseHeaders(event, {
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true',
        "Access-Control-Allow-Headers": '*',
        "Access-Control-Expose-Headers": '*'
      })

  try {

    // Fetch all records from the yearAheadFeasts collection
    const records = await pb.collection('yearAheadFeasts').getFullList({ 
      sort: 'sortOrder'
    });

    const transformed = records.map((record) => ({
      feastName: record.feastName.trim(),
      dateString: record.dateString.trim(),
    }));

    return transformed;
  } catch (error) {
    console.error('Error fetching TestYearAhead:', error);
    return {
      status: 500,
      statusText: 'Internal Server Error',
      error: error.message || 'Unknown error',
    };
  }
});

