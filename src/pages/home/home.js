import './home.css'
import React from 'react';
import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { HomeSearch } from '../routes/routes';
import PrRoutes from '../routes/routes';

class Home extends Component{
  render() {
    return (
    <>
    
    <div className='CoreBody'>
      <div className='Split'>
          <sidebar id='sidebar'>
              <div className='LeftNav'>
                <HomeSearch />
              </div>

              <div className='Playlist'>
                  <div>

                  </div>
              </div>
          </sidebar>

          <div id='container'>
              <div className='Split2'>
                  <div className='MainNav'>
                    
                  </div>
                  <div className='AvatarSpace'>
                      <div className='Avatar'></div>
                  </div>
              </div>

              <div className='HomeBar'>
                  <PrRoutes />
              </div>
              
          </div>
       </div>
       <div className='BottomNav'>
        
       </div>
    </div>
    
    </>
    
  )};
}

export default Home