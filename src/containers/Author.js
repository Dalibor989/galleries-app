import { useParams } from "react-router";
import { useState, useEffect } from "react";
import authorService from "../services/AuthorService";

function Author() {
  const [author, setAuthor] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchAuthor = async () => {
      const data = await authorService.getAuthor(id);
      
      setAuthor(data);
    }

    fetchAuthor();
  }, [id])

  return (
    <div>
      <p>{author.firstName}</p>
    </div>
  )
}

export default Author;s