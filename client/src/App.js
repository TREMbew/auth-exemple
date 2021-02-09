import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Navbar from './pages/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route  exact path="/" component={Home}/>
        <Route  exact path="/register" component={Register}/>
        <Route  exact path="/login" component={Login}/>
        <Route  exact path="/feed" component={Feed}/>
      </Switch>
    </Router>
  );
}

export default App;
