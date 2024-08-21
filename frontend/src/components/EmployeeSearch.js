import React, { useState } from "react";

const EmployeeSearch = ({ handleSearch }) => {
    const [searchText, setSearchText] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleSearch(searchText);
    };

    return (
        <form className="searchformcontainer" onSubmit={(e) => handleSubmit(e)}>
            <input
                type="text"
                className="form-control me-2"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit" className="btn btn-outline-light">Search</button>
        </form>
    );
};

export default EmployeeSearch;
