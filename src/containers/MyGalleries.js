import { selectActiveUser } from "../store/activeUser";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import galleriesService from "../services/GalleriesService";
import { Link } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";

function MyGalleries() {
  const activeUser = useSelector(selectActiveUser);

  const [myGalleries, setMyGalleries] = useState([]);

  useEffect(() => {
    if(!activeUser) {
      return
    }
    const fetchMyGalleries = async () => {
      const data = await galleriesService.getMyGalleries(activeUser.id);

      setMyGalleries(data);
    }
    fetchMyGalleries();
  }, [activeUser]);

  return (
    <div>
      {myGalleries.length ? 
        <ul>
          {myGalleries.map((gallery) => (
            <li key={gallery.id}>
              <Link to={`/galleries/${gallery.id}`}>
              <h3>{gallery.title}</h3>
              </Link>
              <p>{gallery.description}</p>
              {gallery.images && gallery.images.length ? <img src={gallery.images[0].imageUrl} alt="" /> : <p>You have no images in this gallery</p>}
            </li>
          ))}
        </ul> : <p>You have no galleries</p>
      }
    </div>
  )
}

export default MyGalleries;