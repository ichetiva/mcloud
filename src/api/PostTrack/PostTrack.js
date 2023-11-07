import axios from 'axios';

const TrackCreatePost = ( title, poster, track) => {
  return (
    axios.post('https://ichetiva.ru/api/tracks/', {
        data: {
            "title" : title , 
            "publish_after_creation" : true
        },
        poster_file: poster ,
        track_file : track ,
      }, {
        headers: 
        {"Authorization": `Bearer ${localStorage.getItem('Token')}`}
    })
      .then(function (response) {
        console.log(response)
        
      })
      .catch(function (error) {
        console.log(error)
        
      }));
  ;
};

export default TrackCreatePost