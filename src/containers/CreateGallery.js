function CreateGallery() {
  return (
    <div>
      <form>
      <form className="container">
        <div className="form-group">
          <label htmlFor="title">Gallery title</label>
          <input type="text" className="form-control" id="title" placeholder="Enter title" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" id="description" placeholder="Description" />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image</label>
          <input type="url" className="form-control" id="imageUrl" placeholder="Image url" />
        </div>
        <button className="btn btn-primary">Add Movie</button>
      </form>
      </form>
    </div>
  )
}

export default CreateGallery;