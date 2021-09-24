import { useHistory, useParams } from "react-router";
import { useState, useEffect } from "react";
import galleriesService from "../services/GalleriesService";
import useFormattedDate from "../hooks/useFormattedDate";
import { useSelector } from "react-redux";
import { selectActiveUser, selectIsAuthenticated } from "../store/activeUser";
import AddComment from "../components/AddComment";
import SearchTerm from "../components/SearchTerm";

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

      {gallery.user ? <p>{gallery.user.firstName} {gallery.user.lastName}</p> : ""}
      <button className="btn btn-primary" onClick={handleDeleteGallery}>Delete</button>
      <button className="btn btn-primary" type="button" onClick={() => history.push(`/edit/${gallery.id}`)}>Edit</button>

      <p>{dateFormat}</p>
      <div  id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            {gallery.images && gallery.images.length ? gallery.images.map((image, index) => (
              <a target="_blank" rel="noreferrer" key={index} href={image.imageUrl}><img  className="d-block w-100" key={image.id} src={image.imageUrl} alt=""/></a> 
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
            <p>{comment.user.firstName} {comment.user.lastName}</p>
            <p>{comment.created_at}</p>
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