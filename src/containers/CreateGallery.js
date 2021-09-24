import { useState } from "react"
import { useHistory, useParams } from "react-router";
import galleriesService from "../services/GalleriesService";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../store/activeUser";
import { useEffect } from "react";

function CreateGallery() {
  const [newGallery, setNewGallery] = useState({
    'title': '',
    'description': '',
    'imageUrl': '',
  });
  const activeUser = useSelector(selectActiveUser);
  const { id } = useParams();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = null;
    
    if (!activeUser) {
      return ;
    }
    
    if(id) {
      data = await galleriesService.edit(id, newGallery);
    } else {
      data = await galleriesService.addGallery(newGallery);
    }

    history.push('/my-galleries')
  }

  const handleTitleChange = (e) => {
    setNewGallery({
      ...newGallery,
      title: e.target.value
    })
  }

  const handleDescriptionChange = (e) => {
    setNewGallery({
      ...newGallery,
      description: e.target.value
    })
  }

  const handleImageUrlChange = (e) => {
    setNewGallery({
      ...newGallery,
      imageUrl: e.target.value
    })
  }

  useEffect(() => {
    const fetchGallery = async () => {
      const { id: _, created_at, ...data } = await galleriesService.getGallery(id);
      console.log(data.images.imageUrl);
      setNewGallery({...data, imageUrl: data.images.imageUrl});
    };

    if (id) {
      fetchGallery();
    }
  }, [id]);

  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Gallery title</label>
          <input type="text" className="form-control" id="title" placeholder="Enter title" value={newGallery.title} onChange={handleTitleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" id="description" placeholder="Description" value={newGallery.description} onChange={handleDescriptionChange} />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image</label>
          <input type="url" className="form-control" id="imageUrl" placeholder="Image url" value={newGallery.imageUrl} onChange={handleImageUrlChange} />
        </div>
        <button className="btn btn-primary">{id ? 'Edit' : 'Create'}</button>
      </form>
    </div>
  )
}

export default CreateGallery;