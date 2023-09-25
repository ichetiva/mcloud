import React, {Component} from "react"
import Button from 'react-bootstrap/Button';
import { Link, Routes, Route } from "react-router-dom";
import Home from "../home/home";
import Playlist from '../playlist/playlistExample'
import NotFound from '../NotFound/NotFound'
import FloatingHome from "../NavBarPages/forHome/FloatingHome";
import './routes.css'

class HomeSearch extends Component{
    render() {
      return(
      <div className="SearchHome">
        <div className="Home">
          <div className="IconHome Icon">

          </div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            
            <button className="NavButton NavHome" variant="outlined">
              <h1>Home</h1>
            </button>
          </Link>
        </div>
        <div className="Search">
            <div className="IconHome Icon">
              
            </div>
            <button className="NavButton NavSearch" variant="outlined">
              <h1>Search</h1>
            </button>
        </div>
      </div>
      )
    }
  }    


const MainRoutes = () => {
    return (
        <>
        <div>
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/Playlist" element={<Playlist />}/>
            </Routes>
            
        </div>
        </>
    )
}

const NavRoutes = () => {
  return (
      <>
      <div>
          <Routes>
              <Route exact path="/" element={<FloatingHome />}/>
              {/* Make here Floating Playlist (Floating thing which appears on header)*/}
          </Routes>
          
      </div>
      </>
  )
}


  export default MainRoutes
  export {HomeSearch , NavRoutes}


/* <Route exact element={<NotFound />} /> */ 


/*class MainNav extends Component{
    render() {
      return(
      
      )
    }
  }    

  */