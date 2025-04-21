import { getAllDogs } from "./apiManager";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllDogs()
      .then((data) => {
        setDogs(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="m-4">Loading...</p>;
  if (error) return <p className="m-4 text-danger">Not Connected to the API</p>;

  return (
    <div className="container mt-4">
      <h2>🐶 Dogs</h2>
      {dogs.length > 0 ? (
        <ul className="list-group">
          {dogs.map((dog) => (
            <li key={dog.id} className="list-group-item d-flex justify-content-between">
              <Link to={`/dogs/${dog.id}`}>{dog.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No dogs found.</p>
      )}
    </div>
  );
}
