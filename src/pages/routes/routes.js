
import React, {Component} from "react"
import Button from 'react-bootstrap/Button';
import { Link, Routes, Route } from "react-router-dom";
import Home from "../home/home";
import Playlist from '../playlist/playlistExample'
import NotFound from '../NotFound/NotFound'

class HomeSearch extends Component{
    render() {
      return(
      <div className="SearchHome">
        <div className="Home">
          <Link to="/">
            <button className="NavButton" variant="outlined">
            Home
            </button>
          </Link>
          <Link to="/NotFound">
            <button className="NavButton" variant="outlined">
            Search
            </button>
          </Link>
          <Link to="/Playlist">
            <button className="NavButton" variant="outlined">
            Playlist
            </button>
          </Link>
        </div>
      </div>
      )
    }
  }    


const PrRoutes = () => {
    return (
        <>
        <div>
            <Routes>
                <Route exact path="/NotFound" element={<NotFound />}/>
                <Route exact path="/Playlist" element={<Playlist />}/>
            </Routes>
            
        </div>
        </>
    )
}

  export default PrRoutes
  export {HomeSearch}


/* <Route exact element={<NotFound />} /> */ 


/*class MainNav extends Component{
    render() {
      return(
      
      )
    }
  }    

  */