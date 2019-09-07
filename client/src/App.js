import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Saved from './pages/Saved';
import Search from  './pages/Search';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/saved" component={Saved} />
          <Route render={() => (<h1>404 Error</h1>)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
