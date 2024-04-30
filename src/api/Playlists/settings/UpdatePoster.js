import axios from 'axios';

const UpdatePoster = (playlist, image) => {
 const id = parseInt(playlist.data.id)
 console.log(image)
 
 let formData = new FormData();
  formData.append("poster_file", image)
 
  
  return (
    axios.post(`http://94.198.219.99:8000/api/playlists/${id}/poster`, 
        formData
    , 
     {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('Token')}`
        }
    })
      .then(function (response) {
         

      })
      .catch(function (error) {
        
      }));
  
};

export default UpdatePoster