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

      {gallery.images && gallery.images.length ? gallery.images.map((image) => (
        <a target="_blank" rel="noreferrer" key={image.id} href={image.imageUrl}><img key={image.id} src={image.imageUrl} alt=""/></a> 
      )) : ""} 
    </div>
  )
}

export default ViewGallery;