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
  const [inputList, setInputList] = useState([{}]);

  const activeUser = useSelector(selectActiveUser);
  const { id } = useParams();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let data = null;
    
    if (!activeUser) {
      return ;
    }
    
    newGallery.images = inputList.map((image) => (
      image.imageUrl
    ))
    
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

  const handleCancel = () => {
    history.push('/my-galleries')
  }

  useEffect(() => {
    const fetchGallery = async () => {
      const { id: _, created_at, ...data } = await galleriesService.getGallery(id);
      
      setNewGallery({...data, imageUrl: data.images.imageUrl});
    };

    if (id) {
      fetchGallery();
    }
  }, [id]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    
    list[index][name] = value;
    setInputList(list);
  };
  
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  
  const handleAddClick = () => {
    setInputList([...inputList, { imageUrl: "" }]);
  };

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
        {inputList.map((x, i) => (
        <div key={i} className="form-group">
          <label htmlFor="imageUrl">Image</label>
          <input type="url" className="form-control" id="imageUrl" name="imageUrl" placeholder="Image url" value={x.imageUrl} onChange={e => handleInputChange(e, i)} />
          <div className="btn-box">
            {inputList.length !== 1 && <button
              className="btn btn-primary"
              onClick={() => handleRemoveClick(i)}>Remove</button>}
            {inputList.length - 1 === i && <button className="btn btn-primary" onClick={handleAddClick}>Add</button>}
          </div>
        </div>))}
        <button className="btn btn-primary">{id ? 'Edit' : 'Create'}</button>
        <button className="btn btn-primary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}

export default CreateGallery;