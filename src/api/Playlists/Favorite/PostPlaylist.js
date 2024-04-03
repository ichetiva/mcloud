import axios from 'axios';

const PostPlaylist = (image, label, description) => {
  let formData = new FormData();
  formData.append("data", JSON.stringify({
    "title": label,
    "description": description,
    "tracks": [0]
  }))
  formData.append("poster_file", image)
  
  return (
    axios.post('http://94.198.219.99:8000/api/playlists/', 
    formData
    , 
     {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
    })
      .then(function (response) {
          console.log(response)

      })
      .catch(function (error) {
        console.log(formData)
          console.log(error)
      
      }));
  
};

export default PostPlaylist