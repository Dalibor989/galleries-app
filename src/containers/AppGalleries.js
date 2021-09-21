import { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import galleriesService from "../services/GalleriesService";

function AppGalleries() {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      const data = await galleriesService.getAll();
      console.log(data)
      setGalleries(data);
    }

    fetchGalleries();
  }, [])

  return (
    <div>
    {galleries.length ? <ul>
        {galleries.map((gallery) => (
          <li key={gallery.id}><Link to={`/galleries/${gallery.id}`}>{gallery.title} <img src={gallery.images.length ? gallery.images[0].imageUrl : ''}/></Link></li>
        ))}
      </ul> : ''
    }
      
    </div>
  )
}

export default AppGalleries;