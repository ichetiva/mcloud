import axios from 'axios';

const GetFavoritePlaylist = ({createFavoritePlaylist}) => {
    
  
  return (
    axios.get('http://94.198.219.99:8000/api/playlists/{0}', {
        
    }, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
    })
      .then(function (response) {
          
      })
      .catch(function (error) {
        createFavoritePlaylist()
      }));
  
};

export default GetFavoritePlaylist