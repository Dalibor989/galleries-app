import { useHistory, useParams } from "react-router";
import React, { useState, useEffect } from "react";
import galleriesService from "../services/GalleriesService";
import useFormattedDate from "../hooks/useFormattedDate";
import { useSelector } from "react-redux";
import { selectActiveUser, selectIsAuthenticated } from "../store/activeUser";
import AddComment from "../components/AddComment";
import SearchTerm from "../components/SearchTerm";

import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function ViewGallery() {
  const [gallery, setGallery] = useState([]);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);
  const history = useHistory();
  
  const { id } = useParams()

  const dateFormat = useFormattedDate(gallery.created_at);

  const handleAddNewComment = (comment) => {
    setGallery({ ...gallery, comments: [...gallery.comments, comment] });
  };

  const handleDeleteComment = async (id) => {
    const response = prompt(
      "To delete this comment, type yes. "
    )
    if(response !== 'yes'){
      return;
    }

    await galleriesService.deleteComment(id);
    
    setGallery({...gallery, comments:   gallery.comments.filter((comment)=> comment.id !== id)})
  }

  const handleDeleteGallery = async (galleryId) => {
    const response = prompt(
      "To delete this gallery, type yes. "
    )
    if(response !== 'yes'){
      return;
    }

    await galleriesService.deleteGallery(galleryId);

    history.push('/my-galleries');
  }
  
  useEffect(() => {
    const fetchGallery = async () => {
      const data = await galleriesService.getGallery(id);
      
      setGallery(data);
    }
    
    fetchGallery();
  }, [id])

  

  return (
    <div>
      <SearchTerm />
      <h3>{gallery.title}</h3>
      
      <p>{gallery.description}</p>
      
      {gallery.user ? <Link to={`/authors/${gallery.user.id}`}> <p>{gallery.user.firstName} {gallery.user.lastName}</p></Link> : ""}

      {activeUser && gallery.user ?
      <div>
        {activeUser.id === gallery.user.id ? 
          <div>
            <button className="btn btn-primary" onClick={() => handleDeleteGallery(gallery.id)}>Delete</button>
            <button className="btn btn-primary" type="button" onClick={() => history.push(`/edit-gallery/${gallery.id}`)}>Edit</button>
          </div>
          : ''
        }
      </div> : ''}
      
      <Carousel>
      {gallery.images && gallery.images.length
          ? gallery.images.map((image, index) => (
              <Carousel.Item key={image.id}>
                <a key={index} target="_blank" rel="noreferrer" href={image.imageUrl}>
                  <img
                    className="single-page--img"
                    src={image.imageUrl}
                    alt={image.imageUrl}
                  />
                </a>
              </Carousel.Item>
            ))
          : "This post dosen't have image"}
      </Carousel>

      <p><strong>Comments: </strong></p>

      {gallery.comments ? 
      <ul>
        {gallery.comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <p>{comment.user.firstName} {comment.user.lastName}</p>
            <p>{dateFormat}</p>
            {activeUser ?
            <p>{activeUser.id === comment.user.id ?  <button onClick={() => handleDeleteComment(comment.id)}>Delete</button> : ''}</p> : ''}
          </li>
        ))}
      </ul> : ''
      }

      {isAuthenticated ?
      <AddComment 
        galleryId={id}
        addNewCommentCallback={handleAddNewComment}
      /> : ""}

    </div>
  )
}

export default ViewGallery;