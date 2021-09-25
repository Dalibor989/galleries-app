import { useState } from "react";

function SearchTerm({handleCallback}) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleChangeSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }


    const handleSearch = () => {
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