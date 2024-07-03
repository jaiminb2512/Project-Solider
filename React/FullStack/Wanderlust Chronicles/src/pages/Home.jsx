import React, { useContext, useState, useEffect } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../useFetch"; 
import { AuthContext } from '../authContext'; 
import '../style/home.css';
import Card from './Card';

const Home = () => {
    const [query, setQuery] = useState("");
    const { user } = useContext(AuthContext); 
    const [entries, setEntries] = useState([]);
    const apiUrl = `http://localhost:5500/api/entries/author/${user._id}`;
    const { data, loading } = useFetch(apiUrl);

    useEffect(() => {
        if (data) {
            setEntries(data);
        }
    }, [data]);

    const keys = ["title", "location", "date"];

    const search = (data) => {
        if (!Array.isArray(data)) return [];
        return data.filter((item) =>
            keys.some((key) =>
                item[key] && item[key].toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    return (
        <div className="home-container">
            <div className="search">
                <div className="searchBar">
                    <h2>Explore</h2>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search title or places "
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <FontAwesomeIcon
                            className="icon"
                            icon={faSearch}
                        />
                    </div>
                </div>
            </div>

            <div className="searchedPosts">
                {loading ? (
                    <div className="loading-message">
                        Loading...
                    </div>
                ) : (
                    <>
                        {search(entries).length === 0 ? (
                            <div className="no-journeys-message">
                                No journeys found.
                            </div>
                        ) : (
                            <>
                                {search(entries).map((item) => (
                                    <Card
                                        key={item._id}
                                        _id={item._id}
                                        photos={item.photos}
                                        title={item.title}
                                        location={item.location}
                                        text={item.text}
                                    />
                                ))}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
