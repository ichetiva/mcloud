import axios from 'axios';
import UpdatePoster from '../settings/UpdatePoster';

const PostPlaylist = (image, label, description) => {
  console.log(image)

 
  return (
    axios.post('http://94.198.219.99:8000/api/playlists/',  {title: label, description: description, tracks: [], is_private: true}

    , 
     {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
    })
      .then(function (response) {
      
        UpdatePoster(response, image)
      })
      .catch(function (error) {
     
      }));
  
};

export default PostPlaylist