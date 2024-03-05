import axios from 'axios';

const PostPlaylist = (image) => {
    
    let formData = new FormData();
  formData.append("data", JSON.stringify({title: "Favorite songs", description: "Your liked songs are placed here", tracks: [0]}))
  formData.append("poster_file", image)
  
  return (
    axios.post('http://94.198.219.99:8000/api/playlists/', {
        
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

export default PostPlaylist