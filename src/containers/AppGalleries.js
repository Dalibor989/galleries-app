import { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import useFormattedDate from "../hooks/useFormattedDate";
import galleriesService from "../services/GalleriesService";

function AppGalleries() {
  const [galleries, setGalleries] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const dateFormat = useFormattedDate(
    galleries.length ? galleries[0].created_at : ""
  );

  const handleDeleteGallery = async (galleryId) => {
    const response = prompt(
      "To delete this gallery, type yes. "
    )
    if(response !== 'yes'){
      return;
    }

    await galleriesService.deleteGallery(galleryId);

    setGalleries(galleries.filter(({id}) => id !== galleryId));
  }

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
            <button className="btn btn-primary" type="button" onClick={() => history.push(`/edit/${gallery.id}`)}>Edit</button>
            <button className="btn btn-primary" onClick={() => handleDeleteGallery(gallery.id)} >Delete</button>
          </li>
        ))}
      </ul> : ''
    }
      {maxPage !== page && <button className="btn btn-primary" onClick={() => setPage(page + 1)}>{loading ? 'Loading...' : 'Load More'}</button>}
    </div>
  )
}

export default AppGalleries;