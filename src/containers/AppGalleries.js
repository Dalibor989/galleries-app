import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useFormattedDate from "../hooks/useFormattedDate";
import galleriesService from "../services/GalleriesService";

function AppGalleries() {
  const [galleries, setGalleries] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [loading, setLoading] = useState(false);

  const dateFormat = useFormattedDate(
    galleries.length ? galleries[0].created_at : ""
  );

  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      const data = await galleriesService.getAll(page);
      setMaxPage(data.last_page)
      setGalleries([...galleries,...data.data]);
      setLoading(false);
    }

    fetchGalleries();
  }, [page])

  return (
    <div>
    <form>
      <input type="text" placeholder="search..." />
      <button className="btn btn-primary">Search</button>
    </form>
    {galleries.length ? 
      <ul>
        {galleries.map((gallery) => (
          <li key={gallery.id}>
            <Link to={`/galleries/${gallery.id}`}>
            {gallery.title} 
            {gallery.images.length ? <img src={gallery.images.length ? gallery.images[0].imageUrl : ''} alt=""/> : <p>No images</p>}
            </Link>
            <p>{gallery.user.firstName} {gallery.user.lastName}</p>
            <p className="date">{dateFormat}</p>
          </li>
        ))}
      </ul> : ''
    }
      {maxPage !== page && <button className="btn btn-primary" onClick={() => setPage(page + 1)}>{loading ? 'Loading...' : 'Load More'}</button>}
    </div>
  )
}

export default AppGalleries;