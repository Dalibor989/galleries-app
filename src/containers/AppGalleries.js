import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import SearchTerm from "../components/SearchTerm";
import useFormattedDate from "../hooks/useFormattedDate";
import galleriesService from "../services/GalleriesService";

function AppGalleries() {
  const [galleries, setGalleries] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState("");

  const dateFormat = useFormattedDate(
    galleries.length ? galleries[0].created_at : ""
  );

  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      const data = await galleriesService.getAll(page, term);
      setMaxPage(data.last_page)
      setGalleries([...galleries,...data.data]);
      setLoading(false);
    }

    fetchGalleries();
  }, [page])

  const handleSearchCallback = async (searchTerm) => {
    setPage(1);
    setTerm(searchTerm);

    setLoading(true);
    
    const data = await galleriesService.getAll(page, term);
    setMaxPage(data.last_page)
    setGalleries(data.data);
    setLoading(false);
  }

  return (
    <div>
    <SearchTerm handleCallback={handleSearchCallback} />
    {galleries.length ? 
      <ul className="card-container">
        {galleries.map((gallery) => (
          <li
          className="cardBox" 
          key={gallery.id}>
            <Link to={`/galleries/${gallery.id}`}>
            {gallery.title} 
            {gallery.images.length ? <img className="single-page--img" src={gallery.images.length ? gallery.images[0].imageUrl : ''} alt=""/> : <p>No images</p>}
            </Link>
            <Link to={`/authors/${gallery.user.id}`}>
              <p>{gallery.user.firstName} {gallery.user.lastName}</p>
            </Link>
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