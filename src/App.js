import './styles/App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AppGalleries from './containers/AppGalleries';
import NavBar from './components/NavBar';
import Register from './containers/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <AppGalleries />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
