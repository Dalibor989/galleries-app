import { selectActiveUser } from "../store/activeUser";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import galleriesService from "../services/GalleriesService";

function MyGalleries() {
  const activeUser = useSelector(selectActiveUser);

  const [myGalleries, setMyGalleries] = useState([]);

  useEffect(() => {
    if(!activeUser) {
      return
    }
    const fetchMyGalleries = async () => {
      const data = await galleriesService.getMyGalleries(activeUser.id);

      setMyGalleries(data);
      console.log(data);
    }
    fetchMyGalleries();
  }, [activeUser]);

  return (
    <div>
      {myGalleries.map((gallery) => (
        <h3>{gallery.title}</h3>
      ))}
    </div>
  )
}

export default MyGalleries;