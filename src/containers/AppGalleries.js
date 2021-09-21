import { useEffect } from "react";
import { useState } from "react";
import galleriesService from "../services/GalleriesService";

function AppGalleries() {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      const data = await galleriesService.getAll();

      setGalleries(data);
    }

    fetchGalleries();
  }, [])

  return (
    <div>
      <ul>
        {galleries.map((gallery) => (
          <li key={gallery.id}>{gallery.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default AppGalleries;