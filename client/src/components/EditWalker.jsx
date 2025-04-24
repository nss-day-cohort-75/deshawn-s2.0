import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getWalkerCityAssignments,
  getAllCities,
  updateWalkerCities,
} from "../apiManager";

export default function EditWalker() {
  const { id } = useParams(); // walkerId
  const navigate = useNavigate();

  const [walker, setWalker] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCityIds, setSelectedCityIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [walkerName, setWalkerName] = useState("");
  useEffect(() => {
    const loadData = async () => {
      try {
        const [walkerData, citiesData] = await Promise.all([
          getWalkerCityAssignments(id),
          getAllCities(),
        ]);
        console.log("WALKER DATA:", walkerData); // 🔍 log this
        setWalkerName(walkerData.walkerName);
        setWalker(walkerData);
        setCities(citiesData);
        setSelectedCityIds(walkerData.cityIds);
      } catch (err) {
        console.error(err);
        alert("Failed to load walker or cities.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleToggleCity = (cityId) => {
    setSelectedCityIds((prev) =>
      prev.includes(cityId)
        ? prev.filter((id) => id !== cityId)
        : [...prev, cityId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWalkerCities(parseInt(id), selectedCityIds, walkerName);
      navigate("/walkers");
    } catch {
      alert("Failed to update walker’s cities.");
    }
  };

  if (loading) return <p className="m-4">Loading...</p>;
  if (!walker) return <p className="m-4 text-danger">Walker not found.</p>;

  return (
    <div className="container mt-4">
      <h2>Edit {walker.walkerName}'s Cities</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="walkerName">
            Walker Name
          </label>
          <input
            type="text"
            id="walkerName"
            className="form-control mb-2"
            value={walkerName}
            onChange={(e) => setWalkerName(e.target.value)}
          />

          {cities.map((city) => (
            <div className="form-check" key={city.id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`city-${city.id}`}
                checked={selectedCityIds.includes(city.id)}
                onChange={() => handleToggleCity(city.id)}
              />
              <label className="form-check-label" htmlFor={`city-${city.id}`}>
                {city.cityName}
              </label>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
