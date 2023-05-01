import React from "react";
import "./SearchBar.css";

function SearchBar({searchText, placeholder, data, handleFilter, clearInput, item, dataResultVisibility}) {

    return (
        <div style={{marginTop: "10px"}}>
            <div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={placeholder}
                        value={searchText}
                        onChange={(event) => handleFilter(event.target.value)}
                    />
                    <label htmlFor="teacher">{placeholder}</label>
                </div>
            </div>
            {dataResultVisibility && (
                <div className="dataResult" style={{width:"100%"}}>
                    {data.slice(0, 50).map((value, key) => {
                        return <div>
                            {item(value)}
                            <hr className="rounded"/>
                        </div>
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;