import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import NavBar from './comps/NavBar.js';
import Page1 from './pages/page1.js';
import Page2 from './pages/page2.js';
import Page3 from './pages/page3.js';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App container">
        <Router>
          <div className="row">
            <div className="col-xl-1 col-lg-1">&nbsp;</div>
            <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-xs-12">
              <NavBar></NavBar>
              <Switch>
                  <Route path="/" exact>
                    <Redirect to={{pathname: "/Page1", query: undefined}} />
                  </Route>
                  <Route path="/Page1" component={Page1} />              
                  <Route path="/Page2" component={Page2} />            
                  <Route path="/Page3" component={Page3} /> 
              </Switch>
            </div>   
            <div className="col-xl-2 col-lg-2 col-md-1">&nbsp;</div>    
          </div>
        </Router>   
    </div>
  );
}

export default App;
