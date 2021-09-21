import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectActiveUser, selectIsAuthenticated } from "../store/activeUser";

function NavBar() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{display: 'flex', justifyContent: 'space-evenly'}}>
      {isAuthenticated ? <h5>Welcome {activeUser && activeUser.firstName}</h5> : <h5>Welcome Guest</h5>}
      <h5><Link to="/">All Galleries</Link></h5>
      {!isAuthenticated && (
      <h5 className="nav-link"><Link to="/register">Register</Link></h5>
      )}
      {!isAuthenticated && (
      <h5 className="nav-link"><Link to="/login">Login</Link></h5>
      )}
      {isAuthenticated && (
        <h5><Link to="/my-galleries">My Galleries</Link></h5>
      )}
      {isAuthenticated && (
        <h5><Link to="/create">Create Galleries</Link></h5>
      )}
      {isAuthenticated && (
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
      )}
    </nav>
  )
}

export default NavBar;