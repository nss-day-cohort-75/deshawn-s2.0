// client\src\Home.jsx~
import { getAllDogs } from "./apiManager";
import { useEffect, useState } from "react";

export default function Home() {
  const [dogs, setDogs] = useState({
    message: "Not Connected to the API",
  });



  useEffect(() => {

    getAllDogs().then(setDogs).catch(() => {
      console.log("Failed to load dogs");
    });
  }, []);

  return (
    <div className="container mt-4">
      <p>{dogs.message}</p>
      <h2>🐶 Dogs</h2>
      {dogs.length > 0 ? (
        <ul className="list-group">
          {dogs.map((dog) => (
            <li
              key={dog.id}
              className="list-group-item d-flex justify-content-between"
            >
              <span>{dog.name}</span>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No dogs found.</p>
      )}
    </div>
  );
}
