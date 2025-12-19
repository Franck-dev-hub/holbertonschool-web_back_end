export default function handleResponseFromAPI(promise) {
  if (promise) {
    console.log("Got a response from the API")
    return Promise.resolve({
      status: 200,
      body: "Success"
  });
  } else {
    console.log("Got a response from the API")
    return Promise.reject(new Error());
  }
}
