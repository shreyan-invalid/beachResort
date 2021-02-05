
import './App.css';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import ErrorPage from './pages/ErrorPage';
import SingleRoom from './pages/SingleRoom';
import {Switch, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Switch>
        
        <Route exact path="/" component={Home}/>
        <Route exact path="/rooms" component={Rooms}/>
        <Route exact path="/rooms/:slug" component={SingleRoom}/>
        <Route component={ErrorPage}/>
      </Switch>
      
    </div>
  );
}

export default App;
