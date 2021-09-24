import { useState } from "react";
import galleriesService from "../services/GalleriesService";

function AddComment({galleryId, addNewCommentCallback}) {
  const [newComment, setNewComment] = useState({
    'content': '',
  })

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const data = await galleriesService.addComment(newComment, galleryId);

    if(data) {
      addNewCommentCallback(data);
    }

    setNewComment({ content: ''});
  }
  
  const handleContentChange = (e) => {
    setNewComment({
      ...newComment,
      content: e.target.value,
    })
  }

  return (
    <form className="container" onSubmit={handleCommentSubmit}>
      <textarea className="form-control" placeholder="comment..." id="" cols="30" rows="5" value={newComment.content} onChange={handleContentChange}/>
      <button className="btn btn-primary">Post</button>
    </form>
  )
}

export default AddComment;