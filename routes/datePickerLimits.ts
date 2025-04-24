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
    // Fetch the first and only record from the collection
    const limits = await pb.collection('datePickerLimits').getFirstListItem('');

    return {
        startDate: limits.startDate,
        endDate: limits.endDate
    };
  } catch (error) {
    return {
      status: 500,
      statusText: "Internal Server Error",
      error: error?.message || "Something went wrong"
    };
  }
});
