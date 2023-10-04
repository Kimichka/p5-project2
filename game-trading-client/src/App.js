import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import GameList from './components/GameList';
import UserProfile from './components/UserProfile';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/games" component={GameList} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/register" component={Register} />
        
      </Switch>
    </Router>
  );
}

export default App;
