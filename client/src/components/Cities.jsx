import { useEffect, useState } from "react";

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [newCityName, setNewCityName] = useState("");

  useEffect(() => {
    fetch("/api/cities")
      .then(res => res.json())
      .then(setCities);
  }, []);

  const handleAddCity = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cityName: newCityName })
    });

    if (res.ok) {
      const newCity = await res.json();
      setCities((prev) => [...prev, newCity]);
      setNewCityName(""); // reset form
    } else {
      alert("Failed to add city");
    }
  };

  return (
    <div className="container mt-4">
      <h2>🏙️ Cities</h2>

      <form className="mb-3" onSubmit={handleAddCity}>
        <label htmlFor="cityName" className="form-label">Add a city</label>
        <input
          type="text"
          id="cityName"
          className="form-control mb-2"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      <ul className="list-group">
        {cities.map((city) => (
          <li key={city.id} className="list-group-item">
            {city.cityName}
          </li>
        ))}
      </ul>
    </div>
  );
}
