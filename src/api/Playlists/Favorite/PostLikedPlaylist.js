import axios from 'axios';
import fs from 'fs';
// breaks the code
import path from 'path';
const PostLikedPlaylist = () => {

    let formData = new FormData();
    formData.append("data", JSON.stringify({title: 'Favorite songs', description: 'Your liked songs are placed here', tracks: [0], is_private: true}));
    // breaks the code
    const imagePath = path.resolve(__dirname, '../../../assets/Icons/favoriteIcon.jpg');
    const imageFile = fs.readFileSync(imagePath); // read file synchronously
    
    formData.append("poster_file", new Blob([imageFile]), 'favoriteIcon.jpg');

  return (
    axios.post('https://ichetiva.ru/api/playlists/', 
        formData, 
        {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`,
            'Content-Type': 'multipart/form-data'
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