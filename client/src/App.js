import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Saved from './pages/Saved';
import Search from  './pages/Search';
import Page404 from './pages/404';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/saved" component={Saved} />
          <Route component={Page404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
