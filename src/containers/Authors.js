import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import galleriesService from "../services/GalleriesService";

function Authors() {
  const { id } = useParams();
  const [authorsGalleries, setAuthorsGalleries] = useState([]);

  useEffect(() => {
    const fetchMyGalleries = async () => {
      const data = await galleriesService.getMyGalleries(id);

      setAuthorsGalleries(data);
    }
    fetchMyGalleries();
  }, [id]);

  return (
    <div>
      {authorsGalleries.length ? 
        <ul>
          {authorsGalleries.map((gallery) => (
            <li key={gallery.id}>
              <Link to={`/galleries/${gallery.id}`}>
              <h3>{gallery.title}</h3>
              </Link>
              <p className="container">{gallery.description}</p>
              {gallery.images && gallery.images.length ? <img src={gallery.images[0].imageUrl} alt="" /> : <p><strong>You have no images in this gallery</strong></p>}
            </li>
          ))}
        </ul> : <p>You have no galleries</p>
      }
    </div>
  )
}

export default Authors;