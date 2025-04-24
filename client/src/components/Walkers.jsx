import { useEffect, useState } from "react";
import { getAllCities, getWalkersByCity, deleteWalker } from "../apiManager";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Walkers() {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [walkers, setWalkers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const toggle = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    getAllCities().then(setCities);
  }, []);

  const handleCitySelect = async (city) => {
    setSelectedCity(city);
    const cityWalkers = await getWalkersByCity(city.id);
    setWalkers(cityWalkers);
  };

  return (
    <div className="container mt-4">
      <h2>🚶 Walkers</h2>

      {/* Dropdown: choose a city */}
      <div className="mb-4">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
            {selectedCity ? selectedCity.cityName : "Select a City"}
          </DropdownToggle>
          <DropdownMenu>
            {cities.map((city) => (
              <DropdownItem
                key={city.id}
                onClick={() => handleCitySelect(city)}
              >
                {city.cityName}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Static list of cities */}
      <h4 className="mt-3">🌆 All Cities</h4>
      <ul className="list-group mb-4">
        {cities.map((city) => (
          <li key={city.id} className="list-group-item">
            {city.cityName}
          </li>
        ))}
      </ul>

      {/* Filtered walkers */}
      {selectedCity && (
        <>
          <h4>Walkers in {selectedCity.cityName}</h4>
          <ul className="list-group">
            {walkers.length > 0 ? (
              walkers.map((walker) => (
                <li
                  key={walker.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <Link
                    to={`/walkers/${walker.id}/edit`}
                    className="text-decoration-none"
                  >
                    {walker.walkerName}
                  </Link>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate(`/walkers/${walker.id}/assign`)}
                    >
                      Assign Dog
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => navigate(`/walkers/${walker.id}/edit`)}
                    >
                      Edit Cities
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={async () => {
                        try {
                          await deleteWalker(walker.id);
                          setWalkers((prev) =>
                            prev.filter((w) => w.id !== walker.id)
                          );
                        } catch {
                          alert("Failed to yeet the walker.");
                        }
                      }}
                    >
                      Yeet
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">
                No walkers available
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
