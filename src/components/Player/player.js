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
            <audio id='audio' src={music}/>
            <div id='prev' onClick={() => {}}></div>
            <div id='next' onClick={() => {}}></div>
      </div>
    )
}

