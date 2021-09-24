import { useEffect } from "react";
import { useState } from "react";
import GalleriesService from "../services/GalleriesService";

function SearchTerm() {
  const [searchTerm, setSearchTerm] = useState("");
  
  function handleChangeSearchTerm(e) {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }


    const handleSearch = async (searchTerm) => {
    if (!searchTerm || searchTerm.length > 2) {
      await GalleriesService.getAll(searchTerm);
      }
    };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={handleChangeSearchTerm}
          placeholder="Search tearm"
        />
        <button className="btn btn-primary">Search</button>
      </form>
    </div>
  )
}

export default SearchTerm;