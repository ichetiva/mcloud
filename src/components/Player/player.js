import './plyr.css'
import Plyr from 'plyr'
import React, { useEffect, useRef, useState } from 'react';
import './player.module.css'

export const Player = () => {
    const [music, setMusic] = useState("https://storage.yandexcloud.net/mcloud-tracks/8d2db8776d69cbd0b7d3117404c0288c.mp3")
    useEffect(() => {
        const player = new Plyr('#audio', {
          controls: ['play', 'current-time', 'progress','duration', 'mute', 'volume']
          
        });
        return () => {
          player.destroy();
        };
      }, []);



    return(
    <div className='container'>
            <audio id='audio' src={music}/>
            <div id='prev' onClick={() => {setMusic('https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3')}}></div>
            <div id='next' onClick={() => {}}></div>
      </div>
    )
}

