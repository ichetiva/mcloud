import axios from 'axios';

const TrackCreatePost = ( label, image, track) => {
  let formData = new FormData();
  formData.append("data", JSON.stringify({title: label, "publish_after_creation": true}))
  formData.append("poster_file", image)
  formData.append("track_file", track)
  return (
   
    axios.post('https://ichetiva.ru/api/tracks/', 
     formData , 
    {
        headers: 
        {"Authorization": `Bearer ${localStorage.getItem('Token')}`}
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      }));
  
/*
  axios.post({
    method: "post",
    url: 'https://ichetiva.ru/api/tracks/',
    data: formData,
    headers: {"Authorization": `Bearer ${localStorage.getItem('Token')}`}
  })
  
  )*/
};

export default TrackCreatePost