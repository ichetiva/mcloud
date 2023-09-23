import './App.css'


function App() {
  return (
    <>
    <div className='CoreBody'>
      <div className='Split'>
          <sidebar id='sidebar'>
              <div className='LeftNav '>

              </div>

              <div className='Playlist'>
                  <div></div>
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

              </div>
              
          </div>
       </div>
       <div className='BottomNav'>
        
       </div>
    </div>
    
    </>
  );
}

export default App;
