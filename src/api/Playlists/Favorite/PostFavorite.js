import axios from 'axios';

const PostFavorite = (image) => {
    
    let formData = new FormData();
  formData.append("data", JSON.stringify({title: "Favorite songs", description: "Your liked songs are placed here", tracks: [0]}))
  formData.append("poster_file", image)
  
  return (
    axios.post('https://ichetiva.ru/api/playlists/', {
        
    }, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
    })
      .then(function (response) {
          console.log(response)

      })
      .catch(function (error) {
          console.log(error + "postPlaylist failed")
      
      }));
  
};

export default PostFavorite