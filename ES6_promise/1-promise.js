export default function getFullResponseFromAPI(success) {
  if (success) {
    return Promise.resolve({
      status: 20,
      body: "Success"
  });
  } else {
    return Promise.reject(new Error("The fake API is not working currently"));
  }
}
