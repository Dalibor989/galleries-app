import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <h3><Link to="/">All Galleries</Link></h3>
      <h3><Link to="/register">Register</Link></h3>
    </nav>
  )
}

export default NavBar;