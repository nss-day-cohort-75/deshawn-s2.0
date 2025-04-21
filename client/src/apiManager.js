// client\src\apiManager.js

export const getAllDogs = async () => {
  console.log("Fetching all dogs...");
  const res = await fetch("/api/dogs");
  return res.json();
};

// ! Deprected Endpoint 
// export const getGreeting = async () => {
// const res = await fetch("/api/hello");
// return res.json();
//};