import { useParams } from "react-router";
import { useState, useEffect } from "react";
import galleriesService from "../services/GalleriesService";
import useFormattedDate from "../hooks/useFormattedDate";

function ViewGallery() {
  const [gallery, setGallery] = useState([]);
  const { id } = useParams()

  const dateFormat = useFormattedDate(gallery.created_at);
  
  useEffect(() => {
    const fetchGallery = async () => {
      const data = await galleriesService.getGallery(id);
      
      setGallery(data);
    }
    
    fetchGallery();
  }, [id])
  
  return (
    <div>
      <h3>{gallery.title}</h3>
      
      <p>{gallery.description}</p>

      {gallery.user ? <p>{gallery.user.firstName} {gallery.user.lastName}</p> : ""}
    
      <p>{dateFormat}</p>
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            {gallery.images && gallery.images.length ? gallery.images.map((image, index) => (
              <a target="_blank" rel="noreferrer" key={index} href={image.imageUrl}><img className="d-block w-100" key={image.id} src={image.imageUrl} alt=""/></a> 
            )) : ""}
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <p><strong>Comments: </strong></p>

      {gallery.comments ? 
      <ul>
        {gallery.comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul> : ''
      }
    </div>
  )
}

export default ViewGallery;