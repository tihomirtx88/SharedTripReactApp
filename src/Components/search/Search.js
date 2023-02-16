import { useEffect, useState } from "react";
import SingleTrip from "../tripcatalog/singletrip/SingleTrip";
import { Splide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { LOCAL_URL } from "../../urls";

const Search = () => {
    const [trips, setTrips] = useState([]);
    const [search, setSearch] = useState(``);
    const [criteria, setCriteria] = useState(`all`);
    const [filteredTrips, setFilteredTrips] = useState([]);

    useEffect(() => {
        fetch(`${MONGO_URL}/data/trips`, {})
            .then((res) => {
                if (!res.ok) {
                    throw Error({ message: "Bad Request!" });
                }
                return res.json();
            })
            .then((data) => {
                setTrips(data);
            });
    }, []);

    const filterTrip = (text, criteria = `all`) => {
        if (criteria === `all`) {
            setFilteredTrips(trips);
        } else {
            setFilteredTrips(trips.filter((trip) => trip[criteria].toLowerCase().includes(text.toLowerCase())));
        }
    };

    const onSearchChange = (ev) => {
        setSearch(ev.target.value);
    };

    const onSearchSubmit = (ev) => {
        ev.preventDefault();
        console.log(filterTrip(search, criteria));
        // ;
    };

    const onSearchCriteriaConst = (ev) => {
        setCriteria(ev.target.value);
        console.log(ev.target.value);
    };

    return (
        <section className="container trip" id="shared-trips-page">
            <p className="lead">"Here you can find existing trips and join to your friends"</p>
            <form onSubmit={onSearchSubmit} className="search-form">
                <h2>
                    <span className="search-criteria-span">Trips</span>
                </h2>
                <div className="search-input-container">
                    <input
                        type="text"
                        placeholder="Please, select the search criteria"
                        name="search"
                        onChange={onSearchChange}
                        value={search}
                    />

                    {search.length > 0 && (
                        <>
                            <button className="btn close-btn" onClick={() => setSearch(``)}>
                                X
                            </button>
                        </>
                    )}

                    <button className="btn" title="Please, select the search criteria">
                        S
                    </button>
                </div>

                <div className="filter">
                    <span>Search Criteria:</span>
                    <select name="criteria" className="criteria" onChange={onSearchCriteriaConst}>
                        <option value="all">Not selected</option>
                        <option value="start">Start Point</option>
                        <option value="end">End Point</option>
                    </select>
                </div>
            </form>
            <>
                <Splide
                    options={{
                        perPage: "4",
                        arrows: true,
                        drag: `free`,
                        gap: `5rem`,
                        width: "100%",
                    }}
                >
                    <div className="search-result">
                        {filteredTrips?.map((trip) => (
                            <SingleTrip key={trip._id} trip={trip} />
                        ))}
                    </div>
                </Splide>
            </>
        </section>
    );
};

export default Search;
