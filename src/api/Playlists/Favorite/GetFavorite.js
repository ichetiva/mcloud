import axios from 'axios';

const GetFavoritePlaylist = ({createFavoritePlaylist}) => {
    
  
  return (
    axios.get('https://ichetiva.ru/api/playlists/{0}', {
        
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