import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.agios.co');

export default defineEventHandler(async (event) => {
  try {
    // Fetch the first and only record from the collection
    const limits = await pb.collection('datePickerLimits').getFirstListItem('');
    
    return {
      status: 200,
      dateLimits: {
        startDate: limits.startDate,
        endDate: limits.endDate
      },
      statusText: "OK"
    };
  } catch (error) {
    return {
      status: 500,
      statusText: "Internal Server Error",
      error: error?.message || "Something went wrong"
    };
  }
});
