import axios from 'axios';

const PostPlaylist = (image, label, description) => {
  
  let formData = new FormData();
 // formData.append("data", JSON.stringify({"title": label, "description": description}))
 // formData.append("poster_file", image)
  
  return (
    axios.post('http://94.198.219.99:8000/api/playlists/', 
        {
            title: JSON.stringify(label),
            description: JSON.stringify(description),
            tracks: [0],
            is_private: true
          }
  
    , 
     {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
    })
      .then(function (response) {
          console.log(response)
          alert('successful upload')

      })
      .catch(function (error) {
          console.log(error)
          alert('error occured ' + error)
      }));
  
};

export default PostPlaylist