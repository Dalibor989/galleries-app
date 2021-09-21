import './styles/App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AppGalleries from './containers/AppGalleries';
import NavBar from './components/NavBar';
import Register from './containers/Register';
import Login from './containers/Login';
import GuestRoute from './components/shared/GuestRoute';
import PrivateRoute from './components/shared/PrivateRoute';
import { useEffect } from 'react';
import { getActiveUser } from "./store/activeUser";
import store from './store';
import MyGalleries from './containers/MyGalleries';

function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setTimeout(() => {
        store.dispatch(getActiveUser());
      }, 2000);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <AppGalleries />
          </Route>
          <GuestRoute exact path="/register">
            <Register />
          </GuestRoute>
          <GuestRoute exact path="/login">
            <Login />
          </GuestRoute>
          <PrivateRoute exact path="/my-galleries">
            <MyGalleries />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
