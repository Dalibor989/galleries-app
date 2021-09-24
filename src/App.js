import './styles/App.css';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import AppGalleries from './containers/AppGalleries';
import NavBar from './components/NavBar';
import Register from './containers/Register';
import Login from './containers/Login';
import GuestRoute from './components/shared/GuestRoute';
import PrivateRoute from './components/shared/PrivateRoute';
import { useEffect } from 'react';
import { getActiveUser } from "./store/activeUser";
import store from './store';
import ViewGallery from './containers/ViewGallery';
import CreateGallery from './containers/CreateGallery';
import MyGalleries from './containers/MyGalleries';

function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setTimeout(() => {
        store.dispatch(getActiveUser());
      }, 500);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/galleries">
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
          <Route exact path="/galleries/:id">
            <ViewGallery />
          </Route>
          <PrivateRoute exact path="/create">
            <CreateGallery />
          </PrivateRoute>
          <PrivateRoute exact path="/edit/:id">
            <CreateGallery />
          </PrivateRoute>
          <Route exact path="/">
            <Redirect to="/galleries" />
          </Route>
          <Route path="/">
            <div>Page not found</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
