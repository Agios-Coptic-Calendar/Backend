export default function defineEventHandler(event): TLD_Response{
  setResponseHeaders(event, {
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Headers": '*',
    "Access-Control-Expose-Headers": '*'
  })
  if(getMethod(event) === 'OPTIONS'){
    event.res.statusCode = 204
    event.res.statusMessage = "No Content."
    return 
  }
  return {
    status: 404,
    statusText: "Not Found",
  }
}