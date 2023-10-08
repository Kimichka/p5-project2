import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import GameList from './components/GameList';
import UserProfile from './components/UserProfile';
import Register from './components/Register';
import Login from './components/Login';
import GameDetail from './components/GameDetail';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/games" exact component={GameList} />
        <Route path="/games/:id" component={GameDetail} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
