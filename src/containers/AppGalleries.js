import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useFormattedDate from "../hooks/useFormattedDate";
import galleriesService from "../services/GalleriesService";

function AppGalleries() {
  const [galleries, setGalleries] = useState([]);

  const dateFormat = useFormattedDate(
    galleries.length ? galleries[0].created_at : ""
  );

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
    {galleries.length ? 
      <ul>
        {galleries.map((gallery) => (
          <li key={gallery.id}>
            <Link to={`/galleries/${gallery.id}`}>
            {gallery.title} 
            {gallery.images.length ? <img src={gallery.images.length ? gallery.images[0].imageUrl : ''}/> : <p>No images</p>}
            </Link>
            <p>{gallery.user.firstName} {gallery.user.lastName}</p>
            <p className="date">{dateFormat}</p>
          </li>
        ))}
      </ul> : ''
    }
      
    </div>
  )
}

export default AppGalleries;