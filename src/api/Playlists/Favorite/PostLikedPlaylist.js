import axios from 'axios';

import picture from '../../../assets/Icons/favoriteIcon.jpg'
const PostLikedPlaylist = (image) => {
    
    let formData = new FormData();
    formData.append("data", JSON.stringify({title: 'Favorite songs', description: 'Your liked songs are placed here', tracks: [0], is_private: true}));

    formData.append('poster_file', image)
    
   

  return (
    axios.post('http://94.198.219.99:8000/api/playlists/', 
        formData, 
        {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`,
        }
    })
      .then(function (response) {
          console.log(response)

      })
      .catch(function (error) {
          console.log(error + " FavoritePlaylistPost failed")
      
      }));
  
};

export default PostLikedPlaylist