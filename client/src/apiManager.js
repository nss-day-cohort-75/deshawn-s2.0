// client\src\apiManager.js
export const getAllDogs = async () => {
  console.log("Fetching all dogs...");
  const res = await fetch("/api/dogs");
  return res.json();
};

export const getDogById = async (id) => {
  const res = await fetch(`/api/dogs/${id}`);
  if (!res.ok) throw new Error("Dog not found");
  return res.json();
};

export const addDog = async (dogObj) => {
  const res = await fetch("/api/dogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dogObj),
  });
  if (!res.ok) throw new Error("Failed to create dog");
  return res.json();
};

export const getAllCities = async () => {
  const res = await fetch("/api/cities");
  return res.json();
};

export const getWalkersByCity = async (cityId) => {
  const res = await fetch(`/api/walkers-by-city?cityId=${cityId}`);
  return res.json();
};

// This name is confusing! Remove or rename:
export const getWalkers = async () => {
  throw new Error("Use getWalkersByCity(cityId) instead");
}


export const getAssignableDogs = async (walkerId) => {
  const res = await fetch(`/api/dog-assign?walkerId=${walkerId}`);
  if (!res.ok) throw new Error("Failed to fetch assignable dogs");
  return res.json();
};

export const assignDogToWalker = async (walkerId, dogId) => {
  const res = await fetch(`/api/walkers/${walkerId}/assign-dog/${dogId}`, {
    method: "POST"
  });
  if (!res.ok) throw new Error("Failed to assign walker");
  return res.json();
};

export const getWalkerCityAssignments = async (walkerId) => {
  const res = await fetch(`/api/walkers/${walkerId}`);
  if (!res.ok) throw new Error("Failed to load walker city assignments");
  return res.json();
};

export const updateWalkerCities = async (walkerId, cityIds, walkerName) => {
  const res = await fetch(`/api/walkers/${walkerId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: walkerId,
      walkerName, // ✅ now in scope
      cities: cityIds.map(id => ({ id }))
    }),
  });
  if (!res.ok) throw new Error("Failed to update walker cities");
  return res;
};
