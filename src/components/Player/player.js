import './plyr.css'
import Plyr from 'plyr'
import React, { useEffect, useRef, useState } from 'react';
import './player.module.css'

export const Player = ({music}) => {
    const playerRef = useRef(null);
    const [firstLoad, setFirstLoad] = useState(true);
    useEffect(() => {
      playerRef.current = new Plyr('#audio', {
        controls: ['play', 'current-time', 'progress','duration', 'mute', 'volume']
      });
      return () => {
        playerRef.current.destroy();
      };
  }, []);
  useEffect(() => {
    if (playerRef.current) {
        playerRef.current.source = {
            type: 'audio',
            sources: [
                {
                    src: music,
                    type: 'audio/mp3',
                },
            ],
        };
        
    }
    if(firstLoad === false){
      playerRef.current.play()
    }
    setFirstLoad(false)
}, [music]);


    return(
    <div className='container'>
            <div id='prev' className='prev' onClick={() => {}}>
              <div id='prev-button'></div>
            </div>
            <div id='next' className='next' onClick={() => {}}>
              <div id='next-button'></div>
            </div>
            <audio id='audio' src={music}></audio>
            
      </div>
    )
}

