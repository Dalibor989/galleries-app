import { useState } from "react";
import GalleriesService from "../services/GalleriesService";

function SearchTerm({handleCallback}) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleChangeSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    console.log('value', e.target.value);
  }


    const handleSearch = async () => {
      console.log('search term', searchTerm);
      handleCallback(searchTerm);
    };

  return (
    <div>
        <input
          type="text"
          onChange={handleChangeSearchTerm}
          placeholder="Search tearm"
        />
        <button onClick={handleSearch} className="btn btn-primary">Search</button>
    </div>
  )
}

export default SearchTerm;