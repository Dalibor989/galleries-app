import { useParams } from "react-router";
import { useState, useEffect } from "react";
import galleriesService from "../services/GalleriesService";

function ViewGallery() {
  const [gallery, setGallery] = useState([]);
  const { id } = useParams()

  useEffect(() => {
    const fetchGallery = async () => {
      const data = await galleriesService.getGallery(id);
      console.log('ViewGallery', data)
      setGallery(data);
    }

    fetchGallery();
  }, [id])

  return (
    <div>
      <h3>{gallery.title}</h3>

      <p>{gallery.description}</p>
      {gallery.images && gallery.images.length ?
      <img src={gallery.images.length ? gallery.images[0].imageUrl : ''}/> : "No image"
      }
    </div>
  )
}

export default ViewGallery;