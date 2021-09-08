import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import Post from "./pages/Post";
import About from "./pages/About";
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import SEOMetaTags from "./components/SEOMetaTags";

function App() {
  return (
    <div>
      <Router>
        <SEOMetaTags />
        <Switch>
          <Route path="/admin" exact>
            <Admin />
          </Route>

          <Route path="/">
            <Nav />
            <Route path="/" exact component={Home} />
            <Route path="/dist" exact component={Home} />  {/* Legacy code from template version of the website */}
            <Route path="/post" exact component={Post} />
            <Route path="/about" exact component={About} />
            <Route path="/events" exact component={Events} />
            <Route path="/gallery" exact component={Gallery} />
            <Route path="/contact" exact component={Contact} />
            <Footer />
          </Route>

        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
